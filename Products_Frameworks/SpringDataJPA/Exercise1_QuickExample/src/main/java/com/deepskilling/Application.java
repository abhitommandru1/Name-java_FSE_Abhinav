package com.deepskilling;

import com.deepskilling.entity.Student;
import com.deepskilling.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner run(StudentRepository repo) {
        return args -> {
            repo.save(new Student("Alice", "alice@mail.com", "Java"));
            repo.save(new Student("Bob", "bob@mail.com", "Python"));
            repo.save(new Student("Charlie", "charlie@mail.com", "Java"));

            System.out.println("\n--- All Students ---");
            repo.findAll().forEach(System.out::println);

            System.out.println("\n--- Java Students ---");
            repo.findByCourse("Java").forEach(System.out::println);

            System.out.println("\n--- Find by Email ---");
            System.out.println(repo.findByEmail("bob@mail.com"));

            repo.deleteById(1L);
            System.out.println("\n--- After Delete (ID=1) ---");
            repo.findAll().forEach(System.out::println);
        };
    }
}
