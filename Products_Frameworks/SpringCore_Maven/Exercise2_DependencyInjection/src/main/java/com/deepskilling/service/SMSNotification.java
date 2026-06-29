package com.deepskilling.service;

public class SMSNotification implements NotificationService {

    private String phoneNumber;

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public void sendNotification(String message) {
        System.out.println("SMS sent to " + phoneNumber + ": " + message);
    }
}
