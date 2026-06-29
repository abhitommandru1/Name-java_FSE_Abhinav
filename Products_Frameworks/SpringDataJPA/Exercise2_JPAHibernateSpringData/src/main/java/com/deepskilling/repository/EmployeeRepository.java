package com.deepskilling.repository;

import com.deepskilling.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartment(String department);

    @Query("SELECT e FROM Employee e WHERE e.salary > :amount")
    List<Employee> findBySalaryGreaterThan(@Param("amount") double amount);
}
