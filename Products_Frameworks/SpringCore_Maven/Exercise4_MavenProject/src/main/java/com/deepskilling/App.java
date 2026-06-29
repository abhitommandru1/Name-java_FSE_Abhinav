package com.deepskilling;

import com.deepskilling.service.GreetingService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        GreetingService service = context.getBean(GreetingService.class);

        System.out.println(service.greet("Alice"));
        System.out.println(service.greet("Bob"));

        context.close();
    }
}
