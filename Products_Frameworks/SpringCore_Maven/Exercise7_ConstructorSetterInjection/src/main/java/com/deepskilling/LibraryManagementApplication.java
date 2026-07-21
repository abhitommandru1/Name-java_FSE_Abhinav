package com.deepskilling;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {

    public static void main(String[] args) {
        try (ClassPathXmlApplicationContext context =
                     new ClassPathXmlApplicationContext("applicationContext.xml")) {

            System.out.println("=== Constructor injection ===");
            BookService bookServiceCtor = context.getBean("bookServiceCtor", BookService.class);
            bookServiceCtor.listBooks();

            System.out.println("=== Setter injection ===");
            BookService bookServiceSetter = context.getBean("bookServiceSetter", BookService.class);
            bookServiceSetter.listBooks();
        }
    }
}
