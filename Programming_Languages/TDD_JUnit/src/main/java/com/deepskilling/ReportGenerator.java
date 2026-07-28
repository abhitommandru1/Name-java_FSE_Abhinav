package com.deepskilling;

public class ReportGenerator {

    private StudentService studentService;

    public ReportGenerator(StudentService studentService) {
        this.studentService = studentService;
    }

    public String generateReport(int studentId) {
        String name  = studentService.getStudentName(studentId);
        double grade = studentService.getStudentGrade(studentId);
        return "Student: " + name + " | Grade: " + grade;
    }
}
