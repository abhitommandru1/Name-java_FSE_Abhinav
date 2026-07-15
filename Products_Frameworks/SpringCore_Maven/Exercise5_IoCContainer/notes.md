# Exercise 5 – Configuring the Spring IoC Container (BeanFactory vs ApplicationContext)

**Module reference:** Additional important hands-on (spreadsheet row 16) — "Spring Core
and Maven" skill.

Basic XML bean configuration and `ApplicationContext` usage is already demonstrated in
[Exercise1_ConfiguringSpringApp](../Exercise1_ConfiguringSpringApp). This exercise adds
the one distinguishing angle from the handbook's key topics that wasn't shown yet:
**"ApplicationContext and BeanFactory"** — specifically, the difference in *when* each one
instantiates singleton beans.

## What it demonstrates
`ReportService`'s constructor prints a line the moment it runs, so the console output
directly shows *when* the container constructs the bean relative to `getBean()`.

## Verified (built and run live)
```
=== BeanFactory: lazy initialization ===
Step 1: creating the BeanFactory (loading bean *definitions* only)...
Step 2: BeanFactory created. Notice ReportService has NOT been constructed yet.
Step 3: calling getBean("reportService") now...
  >> ReportService bean CONSTRUCTED        <-- only happens here, on first getBean()
  >> ReportService.generate() called

=== ApplicationContext: eager initialization ===
Step 1: creating the ApplicationContext...
  >> ReportService bean CONSTRUCTED        <-- happens immediately, before any getBean()
Step 2: ApplicationContext created. ReportService was ALREADY constructed above...
Step 3: calling getBean("reportService") now (just retrieves the existing instance)...
  >> ReportService.generate() called
```
This output is direct proof of the behavior, not just an assertion of it — the
`ReportService bean CONSTRUCTED` line's position relative to each `Step` line shows
exactly when each container type instantiates the singleton.

## Key takeaways
- `BeanFactory` is the root IoC container interface — lazy by default, only builds a
  singleton the first time it's requested.
- `ApplicationContext` extends `BeanFactory` and adds enterprise features (event
  publishing, internationalization, AOP integration) — and as part of that, it
  pre-instantiates all singleton beans eagerly at startup, catching configuration errors
  immediately rather than deferring them to first use.
- In practice, almost all real Spring applications use `ApplicationContext` (or Spring
  Boot's auto-configured context, which is one) — plain `BeanFactory` is mostly of
  historical/educational interest today.
