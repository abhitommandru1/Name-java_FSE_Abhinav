package com.deepskilling;

import com.deepskilling.controller.UserController;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("--- Constructor Injection (Email) ---");
        UserController emailController = context.getBean("userControllerEmail", UserController.class);
        emailController.registerUser("Alice");

        System.out.println("\n--- Setter Injection (SMS) ---");
        UserController smsController = context.getBean("userControllerSMS", UserController.class);
        smsController.registerUser("Bob");

        ((ClassPathXmlApplicationContext) context).close();
    }
}
