package com.deepskilling;

import java.util.ArrayList;
import java.util.List;

public class LibraryService {

    private List<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        books.add(book);
        System.out.println("Added: " + book);
    }

    public void displayAll() {
        System.out.println("\n--- Library Catalog ---");
        if (books.isEmpty()) {
            System.out.println("No books available.");
            return;
        }
        for (Book b : books) {
            System.out.println(b);
        }
    }
}
