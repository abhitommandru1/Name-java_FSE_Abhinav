package com.deepskilling.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    @GetMapping("/greet")
    public String greet() {
        return "Hello from a Spring Boot application — zero XML, zero manual server setup.";
    }
}
