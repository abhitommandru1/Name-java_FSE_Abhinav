-- Exercise 2: Control Structures - IF-ELSE, CASE, Loops

SET SERVEROUTPUT ON;

-- IF-THEN-ELSE: Grade based on marks
DECLARE
    v_marks NUMBER := 75;
    v_grade VARCHAR2(10);
BEGIN
    IF v_marks >= 90 THEN
        v_grade := 'A';
    ELSIF v_marks >= 75 THEN
        v_grade := 'B';
    ELSIF v_marks >= 60 THEN
        v_grade := 'C';
    ELSE
        v_grade := 'F';
    END IF;
    DBMS_OUTPUT.PUT_LINE('Marks: ' || v_marks || ' -> Grade: ' || v_grade);
END;
/

-- CASE Statement: Day name
DECLARE
    v_day    NUMBER := 3;
    v_dayname VARCHAR2(20);
BEGIN
    v_dayname := CASE v_day
        WHEN 1 THEN 'Monday'
        WHEN 2 THEN 'Tuesday'
        WHEN 3 THEN 'Wednesday'
        WHEN 4 THEN 'Thursday'
        WHEN 5 THEN 'Friday'
        ELSE 'Weekend'
    END;
    DBMS_OUTPUT.PUT_LINE('Day ' || v_day || ' is ' || v_dayname);
END;
/

-- FOR Loop: Print 1 to 5
BEGIN
    FOR i IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Number: ' || i);
    END LOOP;
END;
/

-- WHILE Loop: Sum of first 10 numbers
DECLARE
    v_count NUMBER := 1;
    v_sum   NUMBER := 0;
BEGIN
    WHILE v_count <= 10 LOOP
        v_sum   := v_sum + v_count;
        v_count := v_count + 1;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('Sum of 1 to 10 = ' || v_sum);
END;
/
