package com.deepskilling.repository;

import com.deepskilling.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByCourse(String course);
    Student findByEmail(String email);
}
