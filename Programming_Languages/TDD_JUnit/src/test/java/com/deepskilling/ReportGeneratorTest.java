package com.deepskilling;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReportGeneratorTest {

    @Mock
    private StudentService studentService;

    @InjectMocks
    private ReportGenerator reportGenerator;

    @Test
    void testGenerateReport() {
        when(studentService.getStudentName(1)).thenReturn("Ravi");
        when(studentService.getStudentGrade(1)).thenReturn(88.5);

        String report = reportGenerator.generateReport(1);

        assertEquals("Student: Ravi | Grade: 88.5", report);
        verify(studentService).getStudentName(1);
        verify(studentService).getStudentGrade(1);
    }

    @Test
    void testGenerateReportForAnotherStudent() {
        when(studentService.getStudentName(2)).thenReturn("Priya");
        when(studentService.getStudentGrade(2)).thenReturn(95.0);

        String report = reportGenerator.generateReport(2);

        assertTrue(report.contains("Priya"));
        assertTrue(report.contains("95.0"));
    }
}
