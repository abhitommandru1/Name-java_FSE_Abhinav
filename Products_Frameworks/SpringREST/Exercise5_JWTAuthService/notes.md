# Exercise 5 – Authentication Service that Returns JWT

**Module reference:** Mandatory hands-on (spreadsheet row 30) — "Spring REST using Spring
Boot 3" skill, filename `5. JWT-handson`.

## Endpoints
| Method | Path | Description |
|---|---|---|
| POST | `/authenticate` | validates `{username, password}` against an in-memory user store, returns a signed JWT |
| GET | `/welcome` | protected — requires `Authorization: Bearer <token>`, returns a personalized greeting if the token is valid |

## Verified (built and run live)
```
$ mvn clean package && java -jar target/jwt-auth-service-1.0.jar

POST /authenticate {"username":"admin","password":"wrong"}      -> 401
POST /authenticate {"username":"admin","password":"admin123"}   -> 200 {"token":"eyJhbGci..."}

GET /welcome (no Authorization header)                          -> 401
GET /welcome (Authorization: Bearer <valid token>)               -> "Welcome, admin! Your token is valid."
GET /welcome (Authorization: Bearer not.a.valid.token)            -> "Invalid or expired token"
```

## Bug found and fixed during verification
The first version declared `@RequestHeader("Authorization")` as required (Spring's
default). When the header was missing, Spring's own argument-resolution rejected the
request with `400 Bad Request` *before* the controller method ever ran — so the intended
`401 Unauthorized` branch in the code was unreachable for that case. Fixed by making the
header optional (`required = false`) so the missing-header case is handled explicitly by
the controller logic and returns the correct `401`.

## Key takeaways
- A JWT is a signed, self-contained token (header.payload.signature) — `signWith(key)`
  signs it with `HS256`; `parseClaimsJws()` verifies the signature and throws if the token
  was tampered with or is malformed, which is what the "garbage token" test exercises.
- Required-vs-optional binding (`@RequestHeader(required = false)`) matters for control
  flow: a required parameter fails fast with a generic framework error, bypassing any
  custom handling written for the "missing" case.
- This demo signs with a key generated fresh per process start
  (`Keys.secretKeyFor(...)`) — a real service persists the signing key so tokens remain
  valid across restarts.
