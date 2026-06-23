package com.deepskilling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Calculator {

    private static final Logger logger = LoggerFactory.getLogger(Calculator.class);

    public int add(int a, int b) {
        logger.info("Adding {} + {}", a, b);
        return a + b;
    }

    public int subtract(int a, int b) {
        logger.info("Subtracting {} - {}", a, b);
        return a - b;
    }

    public int multiply(int a, int b) {
        logger.info("Multiplying {} * {}", a, b);
        return a * b;
    }

    public double divide(int a, int b) {
        if (b == 0) {
            logger.error("Division by zero attempted");
            throw new ArithmeticException("Cannot divide by zero");
        }
        logger.info("Dividing {} / {}", a, b);
        return (double) a / b;
    }
}
