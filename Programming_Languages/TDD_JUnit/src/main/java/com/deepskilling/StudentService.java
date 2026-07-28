package com.deepskilling;

public interface StudentService {
    String getStudentName(int id);
    double getStudentGrade(int id);
    boolean enrollStudent(int id, String course);
}
