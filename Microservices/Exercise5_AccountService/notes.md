# Exercise 5 – Account Service

**Module reference:** Mandatory hands-on (spreadsheet rows 31-32) — "Microservices with
Spring Boot 3 and Spring Cloud" skill, filename `2. Microservices with API gateway`, name
**"Creating Microservices for account and loan"**.

This replaces the earlier assumption that Week 3's Product/Order microservices satisfied
this requirement — the spreadsheet names the "account and loan" domain specifically, so
this exercise (together with [Exercise6_LoanService](../Exercise6_LoanService)) builds
that domain using the same architecture already proven in Product/Order (Eureka
registration + Feign inter-service calls + API Gateway routing).

## What it does
A Eureka-registered Spring Boot service exposing:
| Method | Path | Description |
|---|---|---|
| GET | `/api/accounts` | list all accounts |
| GET | `/api/accounts/{id}` | get one account by id |

## Verified (built and run live, registered with Eureka)
```
$ mvn clean package && java -jar target/account-service-1.0.jar
...
DiscoveryClient_ACCOUNT-SERVICE/...:account-service:8083 - registration status: 204
Started AccountServiceApplication in 7.988 seconds

$ curl http://localhost:8083/api/accounts/2
{"id":2,"holderName":"Priya","balance":12000.0}
```
Confirmed in Eureka's own registry (`GET http://localhost:8761/eureka/apps`) — `ACCOUNT-SERVICE`
appeared with `status: UP` once the registry synced (see the Loan Service notes for a real
gotcha this exposed).

## Key takeaways
- `spring-cloud-starter-netflix-eureka-client` is the only thing that turns a plain Spring
  Boot REST service into a discoverable microservice — no extra config beyond
  `eureka.client.service-url.defaultZone` in `application.properties`.
- Runs on port `8083`, alongside the existing `product-service` (8081) and `order-service`
  (8082) — each microservice owns its own port and is looked up by name
  (`account-service`), not by hardcoded host:port, in any client (see `AccountClient` in
  Loan Service).
