package com.deepskilling;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // Demonstrates auto-configuration: none of these beans were declared anywhere in
    // this project's code — @SpringBootApplication's component scan + auto-configuration
    // created them automatically because spring-boot-starter-web is on the classpath.
    @Bean
    CommandLineRunner showAutoConfiguredBeans(ApplicationContext context) {
        return args -> {
            System.out.println("\n=== Auto-configured beans present, without any manual @Bean/XML for them ===");
            String[] namesToCheck = {
                    "tomcatServletWebServerFactory",
                    "requestMappingHandlerMapping",
                    "characterEncodingFilter",
                    "dispatcherServlet"
            };
            for (String name : namesToCheck) {
                boolean present = context.containsBean(name);
                System.out.println("  " + name + " -> present: " + present);
            }
        };
    }
}
