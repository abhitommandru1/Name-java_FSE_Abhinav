package com.deepskilling.model;

public class Account {
    private int id;
    private String holderName;
    private double balance;

    public Account() {}

    public Account(int id, String holderName, double balance) {
        this.id = id;
        this.holderName = holderName;
        this.balance = balance;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getHolderName() { return holderName; }
    public void setHolderName(String holderName) { this.holderName = holderName; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}
