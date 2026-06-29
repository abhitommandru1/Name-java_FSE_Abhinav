package com.deepskilling.controller;

import com.deepskilling.service.NotificationService;

public class UserController {

    private NotificationService notificationService;

    public UserController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void setNotificationService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void registerUser(String username) {
        System.out.println("User registered: " + username);
        notificationService.sendNotification("Welcome " + username + "! Your account is created.");
    }
}
