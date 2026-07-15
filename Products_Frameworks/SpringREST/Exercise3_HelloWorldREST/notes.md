# Exercise 3 – Hello World RESTful Web Service

**Module reference:** Mandatory hands-on (spreadsheet row 27) — "Spring REST using Spring
Boot 3" skill, filename `2. spring-rest-handson`.

## Objective
Stand up the smallest possible Spring Boot REST service: a controller with a `GET`
endpoint returning plain text, to confirm the embedded server + dispatcher servlet chain
works before building anything more complex.

## Endpoints
| Method | Path | Response |
|---|---|---|
| GET | `/hello` | `Hello, World!` |
| GET | `/hello/{name}` | `Hello, {name}!` |

## Verified (built and run live)
```
$ mvn clean package
$ java -jar target/hello-world-rest-1.0.jar --server.port=8091

$ curl http://localhost:8091/hello
Hello, World!

$ curl http://localhost:8091/hello/Abhinav
Hello, Abhinav!
```

## Key takeaways
- `@RestController` = `@Controller` + `@ResponseBody` — every method's return value is
  written directly to the HTTP response body (here, as plain text) instead of being
  resolved to a view.
- `@PathVariable` binds a URI template segment (`{name}`) to a method parameter.
