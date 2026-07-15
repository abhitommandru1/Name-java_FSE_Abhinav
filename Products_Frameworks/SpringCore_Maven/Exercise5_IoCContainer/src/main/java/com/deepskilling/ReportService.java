package com.deepskilling;

public class ReportService {

    public ReportService() {
        // This print statement is the whole point of the exercise: it lets us observe
        // *when* the IoC container actually constructs the bean.
        System.out.println("  >> ReportService bean CONSTRUCTED");
    }

    public void generate() {
        System.out.println("  >> ReportService.generate() called");
    }
}
