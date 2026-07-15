# Exercise 2 – Spring Core: Load Country from Spring Configuration XML

**Module reference:** Mandatory hands-on (spreadsheet row 26) — "Spring REST using Spring
Boot 3" skill, filename `1. spring-rest-handson`.

## Objective
Define beans purely through XML configuration (no annotations, no Spring Boot) and load
them via a plain `ApplicationContext`, to reinforce the XML-based bean wiring covered in
Spring Core before moving on to REST-specific exercises.

## What it does
`applicationContext.xml` declares three `Country` beans (`india`, `usa`, `japan`) using
setter injection via `<property>` tags. `App.java` loads them with
`ClassPathXmlApplicationContext` and prints each one.

```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
Country india = context.getBean("india", Country.class);
```

## Verified
```
$ mvn clean package
$ java -cp target/classes;src/main/resources;<deps> com.deepskilling.App
Loaded countries from Spring XML configuration:
Country{name='India', code='IN', capital='New Delhi'}
Country{name='United States', code='US', capital='Washington, D.C.'}
Country{name='Japan', code='JP', capital='Tokyo'}
```

## Key takeaways
- This is plain `spring-context` (Spring Core), not Spring Boot — no auto-configuration,
  no embedded server, just the IoC container reading bean definitions from XML.
- `context.getBean(id, type)` retrieves a fully-constructed, dependency-injected bean by
  the `id` attribute declared in the XML.
