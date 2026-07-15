# Exercise 4 – REST Country Web Service (+ Get Country by Code)

**Module reference:** Mandatory hands-on (spreadsheet rows 28 & 29) — "Spring REST using
Spring Boot 3" skill, filename `2. spring-rest-handson`. Both mandatory items share the
same source filename in the spreadsheet, so they're implemented as one project here: a
full CRUD Country web service that also exposes a get-by-code lookup.

## Endpoints
| Method | Path | Description |
|---|---|---|
| GET | `/api/countries` | list all countries |
| GET | `/api/countries/{id}` | get one by numeric id |
| GET | `/api/countries/code/{code}` | **REST - Get country based on country code** |
| POST | `/api/countries` | add a country |
| PUT | `/api/countries/{id}` | update a country |
| DELETE | `/api/countries/{id}` | delete a country |

## Verified (built and run live, full CRUD + the code-lookup + negative case)
```
$ mvn clean package && java -jar target/country-web-service-1.0.jar

GET  /api/countries
[{"id":1,"name":"India","code":"IN","capital":"New Delhi"}, ...]

GET  /api/countries/code/JP
{"id":3,"name":"Japan","code":"JP","capital":"Tokyo"}

POST /api/countries  {"id":4,"name":"Germany","code":"DE","capital":"Berlin"}
-> 201 {"id":4,"name":"Germany","code":"DE","capital":"Berlin"}

GET  /api/countries/code/DE
{"id":4,"name":"Germany","code":"DE","capital":"Berlin"}

DELETE /api/countries/4  -> 204

GET  /api/countries/code/DE  -> 404 (confirms delete took effect)
```

## Key takeaways
- `ResponseEntity<T>` lets a controller method return the correct HTTP status
  (`200`, `201`, `204`, `404`) alongside the body, instead of always returning `200`.
- A lookup-by-code endpoint (`/code/{code}`) is just another `@GetMapping` on a different
  URI template within the same `@RequestMapping("/api/countries")` resource — REST doesn't
  require a fixed set of endpoints per resource, just consistent, predictable URIs.
