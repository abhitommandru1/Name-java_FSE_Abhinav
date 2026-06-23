package com.deepskilling;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class AAAPatternTest {

    private BankAccount account;

    @BeforeAll
    static void initAll() {
        System.out.println("Starting BankAccount tests...");
    }

    @BeforeEach
    void setUp() {
        account = new BankAccount("Ravi", 5000.0);
    }

    @Test
    void testDeposit() {
        // Arrange
        double depositAmount = 2000.0;

        // Act
        account.deposit(depositAmount);

        // Assert
        assertEquals(7000.0, account.getBalance());
    }

    @Test
    void testWithdraw() {
        // Arrange
        double withdrawAmount = 1000.0;

        // Act
        account.withdraw(withdrawAmount);

        // Assert
        assertEquals(4000.0, account.getBalance());
    }

    @Test
    void testInsufficientFunds() {
        // Arrange
        double largeAmount = 10000.0;

        // Act & Assert
        assertThrows(IllegalStateException.class, () -> account.withdraw(largeAmount));
    }

    @AfterEach
    void tearDown() {
        account = null;
    }

    @AfterAll
    static void tearDownAll() {
        System.out.println("All BankAccount tests completed.");
    }
}
