# Exercise 3 – Country Management (Query Methods, O/R Mapping, JPQL, Native Query)

**Module reference:** Additional important hands-on (spreadsheet rows 19-24) — "Spring
Data JPA with Spring Boot, Hibernate" skill. All six additional-hands-on rows for this
skill are entirely about a "Country" domain, so they're implemented together as one
cohesive project:
- "Implement services for managing Country" → `CountryService`
- "Find a country based on country code" → `CountryService.findByCode`
- "Add a new country" → `CountryService.addCountry`
- "Demonstrate implementation of Query Methods feature of Spring Data JPA" → derived query methods in `CountryRepository`
- "Demonstrate implementation of O/R Mapping" → `Country` entity's `@Entity`/`@Table`/`@Column`/`@Transient` mapping
- "Demonstrate writing Hibernate Query Language and Native Query" → `@Query` (JPQL) and `@Query(nativeQuery = true)`

## Verified — every query type, run live against a real H2 database, with correct results
```
--- All countries ---
Country[id=1, name=India, code=IN, capital=New Delhi, population=1428000000]
Country[id=2, name=United States, code=US, capital=Washington, D.C., population=341000000]
Country[id=3, name=Japan, code=JP, capital=Tokyo, population=123000000]
Country[id=4, name=Singapore, code=SG, capital=Singapore, population=5900000]

--- O/R Mapping: @Transient field computed from mapped fields, not a column ---
displayLabel (not persisted): India (IN)

--- Find a country based on country code (Query Method: findByCode) ---
Country[id=3, name=Japan, code=JP, capital=Tokyo, population=123000000]

--- Query Methods: findByNameContainingIgnoreCase("united") ---
Country[id=2, name=United States, ...]                      # case-insensitive match confirmed

--- Query Methods: findByPopulationGreaterThan(100_000_000) ---
India, United States, Japan                                  # Singapore (5.9M) correctly excluded

--- Hibernate Query Language (JPQL): population BETWEEN 5M and 130M, DESC ---
Japan (123M), Singapore (5.9M)                                # India/US correctly excluded, order correct

--- Native Query: countries WHERE capital = 'Tokyo' ---
Japan
```
The generated SQL for each was logged (`spring.jpa.show-sql=true`) — confirming the JPQL
query (`c1_0.population between ? and ?`) and the native query
(`SELECT * FROM countries WHERE capital = ?`) actually ran as distinct query paths, not
just returning the same thing coincidentally.

## Bug fixed during verification
The first build produced a jar with no main manifest attribute
(`java -jar target/country-management-1.0.jar` → `no main manifest attribute`) — the
`pom.xml` was missing the `spring-boot-maven-plugin` build plugin, which is what
repackages a plain jar into an executable Spring Boot jar. Added it and rebuilt.

## O/R Mapping, explicitly
`Country` has 5 real fields mapped to columns (`id`, `name`, `code`, `capital`,
`population`) via `@Entity`/`@Column`, plus a 6th field, `displayLabel`, marked
`@Transient` — deliberately excluded from the mapping. The generated `CREATE TABLE`
statement (logged above) has exactly 5 columns, proving `@Transient` genuinely excludes a
field from persistence rather than just being a comment/convention.

## Key takeaways
- **Query Methods** (`findByX`, `findByXGreaterThan`, `findByXContainingIgnoreCase`) let
  Spring Data JPA generate the query from the method signature — no query string at all.
- **JPQL** (`@Query("SELECT c FROM Country c WHERE ...")`) is written against entity
  names/fields, portable across databases; **native queries**
  (`@Query(value = "...", nativeQuery = true)`) are written against actual table/column
  names and can use database-specific SQL, at the cost of portability.
- `ddl-auto=create-drop` (visible in the `drop table` / `create table` log lines) means
  the schema is generated from the entity mapping itself — direct evidence that the
  Java class *is* the source of truth for the table structure in this setup.
