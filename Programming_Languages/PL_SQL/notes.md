# PL/SQL Exercises — corrected to match the real hands-on spec

**Module reference:** `PLSQL_Exercises.docx` from the source repo
(https://github.com/seshadrimr/Digital-Nurture-JavaFSE), Exercise 1 (Control Structures) and
Exercise 3 (Stored Procedures).

## What changed
The original scripts in this folder were generic (grade lookup, day-of-week, loop demos) and
did not match the actual bank-scenario schema and business rules the real exercise document
specifies. They've been replaced with implementations against the exact schema and scenarios
named in the source document:

- `schema.sql` — the `Customers` / `Accounts` / `Transactions` / `Loans` / `Employees` tables
  from the source doc, with sample data (including customers above/below 60, and above/below
  the $10,000 VIP threshold, so both branches of the control-structure logic are exercised).
- `Exercise1_ControlStructures/control_structures.sql` — the three required scenarios: 1%
  loan-interest discount for customers over 60, VIP flag for balances over $10,000, and loan
  due-date reminders within the next 30 days.
- `Exercise3_StoredProcedures/stored_procedures.sql` — `ProcessMonthlyInterest`,
  `UpdateEmployeeBonus`, and `TransferFunds` (with an insufficient-balance check), exactly as
  named in the spec.

Folders were also renamed from `Exercise2_ControlStructures`/`Exercise5_StoredProcedures` to
`Exercise1_ControlStructures`/`Exercise3_StoredProcedures` to match the real exercise numbers.

## Verification
No Oracle instance was available in this environment to execute the scripts live (`sqlplus`/
Oracle Docker image not present) — reviewed manually for correct PL/SQL syntax (cursor FOR
loops, `%ROWCOUNT`, `%TYPE` attributes, exception handling). Run `schema.sql` once, then either
exercise script, in a real Oracle instance to verify execution.
