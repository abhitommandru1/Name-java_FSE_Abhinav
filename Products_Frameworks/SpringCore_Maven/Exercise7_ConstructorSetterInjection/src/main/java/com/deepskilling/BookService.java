package com.deepskilling;

public class BookService {

    private BookRepository bookRepository;

    // No-arg constructor, used together with setter injection
    public BookService() {
    }

    // Constructor injection
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("  >> BookService constructed via CONSTRUCTOR injection");
    }

    // Setter injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("  >> BookRepository wired via SETTER injection");
    }

    public void listBooks() {
        System.out.println("  >> Books available: " + bookRepository.findAllTitles());
    }
}
