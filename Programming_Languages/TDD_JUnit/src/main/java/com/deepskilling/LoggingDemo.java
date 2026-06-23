package com.deepskilling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingDemo {

    private static final Logger logger = LoggerFactory.getLogger(LoggingDemo.class);

    public void processOrder(int orderId, double amount) {
        logger.info("Processing order ID: {}", orderId);

        if (amount <= 0) {
            logger.error("Invalid order amount: {}. Amount must be positive.", amount);
            throw new IllegalArgumentException("Amount must be positive");
        }

        if (amount > 100000) {
            logger.warn("Large order detected. Order ID: {}, Amount: {}", orderId, amount);
        }

        logger.info("Order {} processed successfully. Amount: {}", orderId, amount);
    }

    public void connectToDatabase(String url) {
        logger.debug("Attempting to connect to database: {}", url);
        if (url == null || url.isEmpty()) {
            logger.error("Database URL is null or empty");
            throw new IllegalArgumentException("Invalid database URL");
        }
        logger.info("Connected to database: {}", url);
    }

    public static void main(String[] args) {
        LoggingDemo demo = new LoggingDemo();

        demo.processOrder(101, 5000.00);
        demo.processOrder(102, 150000.00);

        try {
            demo.processOrder(103, -100);
        } catch (IllegalArgumentException e) {
            logger.error("Order failed: {}", e.getMessage());
        }

        demo.connectToDatabase("jdbc:oracle:thin:@localhost:1521:xe");

        try {
            demo.connectToDatabase("");
        } catch (IllegalArgumentException e) {
            logger.error("Connection failed: {}", e.getMessage());
        }
    }
}
