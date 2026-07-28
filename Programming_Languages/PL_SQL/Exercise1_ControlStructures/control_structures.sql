-- Exercise 1: Control Structures
-- Requires schema.sql (../schema.sql) to be run first.

SET SERVEROUTPUT ON;

-- Scenario 1: Apply a 1% discount to loan interest rates for customers above 60 years old.
DECLARE
    CURSOR cust_cur IS SELECT CustomerID, DOB FROM Customers;
    v_age NUMBER;
BEGIN
    FOR cust_rec IN cust_cur LOOP
        v_age := TRUNC(MONTHS_BETWEEN(SYSDATE, cust_rec.DOB) / 12);
        IF v_age > 60 THEN
            UPDATE Loans
               SET InterestRate = InterestRate - (InterestRate * 0.01)
             WHERE CustomerID = cust_rec.CustomerID;
            DBMS_OUTPUT.PUT_LINE('Customer ' || cust_rec.CustomerID ||
                ' (age ' || v_age || ') -> 1% loan interest discount applied.');
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 2: Promote a customer to VIP status if their balance is over $10,000.
DECLARE
    CURSOR cust_cur IS SELECT CustomerID, Balance FROM Customers;
BEGIN
    FOR cust_rec IN cust_cur LOOP
        IF cust_rec.Balance > 10000 THEN
            UPDATE Customers SET IsVIP = 'Y' WHERE CustomerID = cust_rec.CustomerID;
            DBMS_OUTPUT.PUT_LINE('Customer ' || cust_rec.CustomerID ||
                ' (balance ' || cust_rec.Balance || ') -> promoted to VIP.');
        ELSE
            UPDATE Customers SET IsVIP = 'N' WHERE CustomerID = cust_rec.CustomerID;
        END IF;
    END LOOP;
    COMMIT;
END;
/

-- Scenario 3: Send reminders to customers whose loans are due within the next 30 days.
DECLARE
    CURSOR due_loans_cur IS
        SELECT l.LoanID, l.CustomerID, c.Name, l.EndDate
          FROM Loans l
          JOIN Customers c ON c.CustomerID = l.CustomerID
         WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30;
BEGIN
    FOR loan_rec IN due_loans_cur LOOP
        DBMS_OUTPUT.PUT_LINE('Reminder: Loan ' || loan_rec.LoanID || ' for ' || loan_rec.Name ||
            ' (Customer ' || loan_rec.CustomerID || ') is due on ' ||
            TO_CHAR(loan_rec.EndDate, 'DD-MON-YYYY') || '.');
    END LOOP;
END;
/
