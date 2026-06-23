-- Exercise 5: Stored Procedures

SET SERVEROUTPUT ON;

-- Procedure: Add new employee
CREATE OR REPLACE PROCEDURE add_employee (
    p_id        IN employees.employee_id%TYPE,
    p_name      IN employees.first_name%TYPE,
    p_salary    IN employees.salary%TYPE,
    p_dept_id   IN employees.department_id%TYPE
) AS
BEGIN
    INSERT INTO employees (employee_id, first_name, salary, department_id)
    VALUES (p_id, p_name, p_salary, p_dept_id);
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Employee ' || p_name || ' added successfully.');
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Error: Employee ID ' || p_id || ' already exists.');
END;
/

-- Procedure: Get employee salary (OUT parameter)
CREATE OR REPLACE PROCEDURE get_salary (
    p_id     IN  employees.employee_id%TYPE,
    p_salary OUT employees.salary%TYPE
) AS
BEGIN
    SELECT salary INTO p_salary
    FROM employees
    WHERE employee_id = p_id;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee ID ' || p_id || ' not found.');
        p_salary := 0;
END;
/

-- Calling the procedures
DECLARE
    v_salary NUMBER;
BEGIN
    add_employee(300, 'Alice', 75000, 10);

    get_salary(300, v_salary);
    DBMS_OUTPUT.PUT_LINE('Salary of employee 300: ' || v_salary);
END;
/
