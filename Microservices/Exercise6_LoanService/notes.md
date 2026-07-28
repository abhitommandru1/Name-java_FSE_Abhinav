# Exercise 6 – Loan Service (calls Account Service via Feign)

**Module reference:** Mandatory hands-on (spreadsheet rows 31-32) — "Microservices with
Spring Boot 3 and Spring Cloud" skill, "Creating Microservices for account and loan".
Additional-hands-on row 31 ("Create Eureka Discovery Server and register microservices")
is also satisfied here, since both this service and Account Service register with the
existing [Exercise1_EurekaServer](../Exercise1_EurekaServer).

## What it does
| Method | Path | Description |
|---|---|---|
| GET | `/api/loans` | list all loans |
| POST | `/api/loans` | create a loan — **checks the account exists via `account-service` (Feign) before approving** |
| GET | `/api/loans/{id}/details` | aggregates loan + account data from two services into one response |

`AccountClient` is a `@FeignClient(name = "account-service")` — the same declarative
inter-service-call pattern as `OrderService`'s `ProductClient`, just pointed at a different
downstream service, resolved through Eureka by name (not a hardcoded URL).

## Verified (built and run live: Eureka + Account Service + Loan Service together)
```
$ curl -X POST localhost:8084/api/loans -d '{"accountId":2,"amount":75000}'
{"id":2,"accountId":2,"amount":75000.0,"status":"APPROVED"}

$ curl -X POST localhost:8084/api/loans -d '{"accountId":999,"amount":75000}'
{"error":"Account 999 not found"}          # 404 — Feign call succeeded, account genuinely doesn't exist

$ curl localhost:8084/api/loans/1/details
{"loan":{...},"account":{"id":1,"holderName":"Abhinav","balance":50000.0}}
```

## Real gotcha hit during verification: Eureka registry propagation delay
The first attempt (immediately after both services started) returned
`{"error":"Account service unavailable or account not found"}` for a *valid* account —
not because the account didn't exist, but because `loan-service`'s local Eureka client
hadn't yet pulled `account-service` into its registry cache (Eureka clients fetch the
registry on a ~30s interval, not instantly on peer startup). Waiting ~35s and retrying
resolved it, and the negative-account-id case then correctly returned "not found" instead
of the generic "unavailable" message. **This is expected Eureka behavior, not a bug** —
worth knowing when demoing this: a `POST` fired right after both services boot can fail
with a misleading "unavailable" error purely due to registry lag.

## Bug fixed during verification
The first version of `createLoan` returned a bespoke `record ResponseEntityWrapper(int
status, Object body)` from a plain `@RestController` method — Spring has no idea that
`status` field means anything; it just serializes the whole record as JSON and returns
`200 OK` regardless. Replaced with `ResponseEntity<?>`, the actual mechanism Spring uses to
set the real HTTP status code (confirmed via the live 404 test above).

## API Gateway routes added
[`Exercise4_APIGateway/application.yml`](../Exercise4_APIGateway/src/main/resources/application.yml)
now routes `/api/accounts/**` → `account-service` and `/api/loans/**` → `loan-service`,
using the identical pattern as the existing product/order routes. This was **not**
live-verified running alongside Eureka/Account/Loan — the dev machine ran out of native
memory running 3+ JVMs simultaneously (`Native memory allocation (malloc) failed`, not
just a JVM heap limit). The route config itself builds cleanly and is copy-identical in
structure to the already-working product/order routes, but should be spot-checked live
when more memory is available, rather than assumed correct on config-review alone.

## Key takeaways
- Aggregating two services' data into one response (`/loans/{id}/details`) is a common
  BFF-style (Backend-For-Frontend) pattern — the caller doesn't need to know two services
  were involved.
- Eureka's registry is *eventually* consistent across clients, not instant — a fresh
  service isn't reliably discoverable by its peers the moment it registers.
