# Exercise 2 – Dependency Injection

**Module reference:** Mandatory hands-on (spreadsheet row 17) — "Exercise 2: Implementing
Dependency Injection". This same project also satisfies the **additional** hands-on item
(row 17) — "Exercise 7: Implementing Constructor and Setter Injection" — no separate
project needed, since both forms are already demonstrated side by side here:

- **Constructor injection**: `emailNotification` bean wired into `userControllerEmail` via
  `<constructor-arg ref="emailNotification"/>` in `applicationContext.xml`.
- **Setter injection**: `smsNotification` bean's `phoneNumber` set via
  `<property name="phoneNumber" .../>`, and `userControllerSMS` also uses constructor
  injection for the notification service itself — see `App.java`, which runs both paths
  and prints the result of each.

## Verified
```
--- Constructor Injection (Email) ---
...
--- Setter Injection (SMS) ---
...
```
(see `App.java` for the exact wiring — both controllers are retrieved from the same
`ApplicationContext` and exercised in `main()`)

## Key takeaways
- Constructor injection is generally preferred for required dependencies — it makes the
  dependency mandatory and the object immutable once constructed.
- Setter injection suits optional dependencies or values that may need to change after
  construction.
