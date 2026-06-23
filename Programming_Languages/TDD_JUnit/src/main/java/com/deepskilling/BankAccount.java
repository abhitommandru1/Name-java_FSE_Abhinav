package com.deepskilling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BankAccount {

    private static final Logger logger = LoggerFactory.getLogger(BankAccount.class);

    private String accountHolder;
    private double balance;

    public BankAccount(String accountHolder, double initialBalance) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
        logger.info("Deposited {} to {}. New balance: {}", amount, accountHolder, balance);
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount > balance) {
            logger.warn("Insufficient funds for {}. Balance: {}, Requested: {}", accountHolder, balance, amount);
            throw new IllegalStateException("Insufficient funds");
        }
        balance -= amount;
        logger.info("Withdrew {} from {}. New balance: {}", amount, accountHolder, balance);
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }
}
