-- Exercise 3: Stored Procedures
-- Requires schema.sql (../schema.sql) to be run first.

SET SERVEROUTPUT ON;

-- Scenario 1: Process monthly interest for all savings accounts (1% of current balance).
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
BEGIN
    UPDATE Accounts
       SET Balance = Balance + (Balance * 0.01),
           LastModified = SYSDATE
     WHERE AccountType = 'Savings';
    COMMIT;
    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' savings account(s) credited with monthly interest.');
END;
/

-- Scenario 2: Update employee bonus for a department, given a bonus percentage.
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_department IN Employees.Department%TYPE,
    p_bonus_pct  IN NUMBER
) AS
BEGIN
    UPDATE Employees
       SET Salary = Salary + (Salary * p_bonus_pct / 100)
     WHERE Department = p_department;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No employees found in department: ' || p_department);
    ELSE
        DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' employee(s) in ' || p_department ||
            ' given a ' || p_bonus_pct || '% bonus.');
    END IF;
    COMMIT;
END;
/

-- Scenario 3: Transfer funds between two accounts, checking sufficient balance first.
CREATE OR REPLACE PROCEDURE TransferFunds (
    p_from_account IN Accounts.AccountID%TYPE,
    p_to_account   IN Accounts.AccountID%TYPE,
    p_amount       IN NUMBER
) AS
    v_from_balance Accounts.Balance%TYPE;
BEGIN
    SELECT Balance INTO v_from_balance FROM Accounts WHERE AccountID = p_from_account;

    IF v_from_balance < p_amount THEN
        DBMS_OUTPUT.PUT_LINE('Transfer failed: insufficient balance in account ' || p_from_account);
        RETURN;
    END IF;

    UPDATE Accounts SET Balance = Balance - p_amount, LastModified = SYSDATE
     WHERE AccountID = p_from_account;
    UPDATE Accounts SET Balance = Balance + p_amount, LastModified = SYSDATE
     WHERE AccountID = p_to_account;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transferred ' || p_amount || ' from account ' || p_from_account ||
        ' to account ' || p_to_account || '.');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Transfer failed: source account ' || p_from_account || ' not found.');
        ROLLBACK;
END;
/

-- Calling the procedures
BEGIN
    ProcessMonthlyInterest;
    UpdateEmployeeBonus('IT', 10);
    TransferFunds(2, 1, 500);
    TransferFunds(3, 1, 50000); -- expected to fail: insufficient balance
END;
/
