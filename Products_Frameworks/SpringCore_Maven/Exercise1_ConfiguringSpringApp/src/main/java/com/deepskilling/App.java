package com.deepskilling;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        Book book1 = context.getBean("book1", Book.class);
        Book book2 = context.getBean("book2", Book.class);

        LibraryService service = context.getBean("libraryService", LibraryService.class);
        service.addBook(book1);
        service.addBook(book2);
        service.displayAll();

        ((ClassPathXmlApplicationContext) context).close();
    }
}
