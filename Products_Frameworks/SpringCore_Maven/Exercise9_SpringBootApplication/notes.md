# Exercise 9 – Creating a Spring Boot Application

**Module reference:** Additional important hands-on (spreadsheet row 18) — "Spring Core
and Maven" skill.

[Exercise4_MavenProject](../Exercise4_MavenProject) already shows plain Spring with
Java-based `@Configuration`/`@ComponentScan` — no embedded server, no auto-configuration,
you'd have to wire a servlet container yourself to serve HTTP. This exercise shows what
`@SpringBootApplication` adds on top of that: auto-configuration and an embedded server,
with zero extra setup.

## What it demonstrates
A `CommandLineRunner` bean inspects the `ApplicationContext` at startup and checks for
beans that **nothing in this project ever declared** — they exist purely because
`spring-boot-starter-web` is on the classpath and Spring Boot's auto-configuration reacted
to it.

## Verified (built and run live)
```
$ mvn clean package && java -jar target/spring-boot-basics-1.0.jar

=== Auto-configured beans present, without any manual @Bean/XML for them ===
  tomcatServletWebServerFactory -> present: true
  requestMappingHandlerMapping -> present: true
  characterEncodingFilter -> present: true
  dispatcherServlet -> present: true

$ curl http://localhost:8094/greet
Hello from a Spring Boot application — zero XML, zero manual server setup.
```

## Key takeaways
- "Auto-configuration" means Spring Boot inspects the classpath and pre-registers beans
  (embedded Tomcat, `DispatcherServlet`, request mapping infrastructure, etc.) that a
  plain Spring app would require you to configure by hand.
- `@SpringBootApplication` is itself a composite of three annotations:
  `@Configuration` + `@ComponentScan` + `@EnableAutoConfiguration` — the last one is what
  triggers this auto-detection behavior, and is the one thing Exercise 4's plain
  `@Configuration` class doesn't have.
- "Convention over configuration" here means: put `spring-boot-starter-web` on the
  classpath, and you get a working embedded web server on `server.port` — no manual
  Tomcat setup required, unlike traditional Spring MVC deployed as a WAR.
