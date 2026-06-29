package com.deepskilling;

import com.deepskilling.entity.Employee;
import com.deepskilling.repository.EmployeeRepository;
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
    CommandLineRunner run(EmployeeRepository repo) {
        return args -> {
            repo.save(new Employee("Alice", "IT", 85000));
            repo.save(new Employee("Bob", "HR", 60000));
            repo.save(new Employee("Charlie", "IT", 95000));
            repo.save(new Employee("Diana", "Finance", 75000));

            System.out.println("\n--- All Employees (Spring Data JPA) ---");
            repo.findAll().forEach(System.out::println);

            System.out.println("\n--- IT Department ---");
            repo.findByDepartment("IT").forEach(System.out::println);

            System.out.println("\n--- Salary > 70000 (JPQL Query) ---");
            repo.findBySalaryGreaterThan(70000).forEach(System.out::println);

            System.out.println("\n--- Update Employee ID 2 ---");
            Employee emp = repo.findById(2L).orElse(null);
            if (emp != null) {
                emp.setSalary(65000);
                repo.save(emp);
                System.out.println("Updated: " + emp);
            }

            System.out.println("\n--- Delete Employee ID 1 ---");
            repo.deleteById(1L);
            System.out.println("Total employees: " + repo.count());
        };
    }
}
