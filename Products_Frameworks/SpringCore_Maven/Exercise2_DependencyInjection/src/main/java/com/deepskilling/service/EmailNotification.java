package com.deepskilling.service;

public class EmailNotification implements NotificationService {

    private String emailAddress;

    public EmailNotification(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Override
    public void sendNotification(String message) {
        System.out.println("Email sent to " + emailAddress + ": " + message);
    }
}
