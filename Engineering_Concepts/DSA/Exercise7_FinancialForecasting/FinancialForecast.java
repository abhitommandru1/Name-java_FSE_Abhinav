import java.util.HashMap;
import java.util.Map;

public class FinancialForecast {

    private static Map<Integer, Double> memo = new HashMap<>();

    public static double futureValueRecursive(double presentValue, double annualRate, int years) {
        if (years == 0) return presentValue;
        return futureValueRecursive(presentValue, annualRate, years - 1) * (1 + annualRate);
    }

    public static double futureValueMemo(double presentValue, double annualRate, int years) {
        if (years == 0) return presentValue;
        if (memo.containsKey(years)) return memo.get(years);

        double result = futureValueMemo(presentValue, annualRate, years - 1) * (1 + annualRate);
        memo.put(years, result);
        return result;
    }

    public static double futureValueIterative(double presentValue, double annualRate, int years) {
        double fv = presentValue;
        for (int i = 0; i < years; i++) fv *= (1 + annualRate);
        return fv;
    }

    public static void main(String[] args) {
        double presentValue = 100000.0;
        double annualRate   = 0.08;      // 8% annual growth rate
        int    years        = 10;

        System.out.printf("Present Value : Rs. %.2f%n", presentValue);
        System.out.printf("Annual Rate   : %.0f%%%n", annualRate * 100);
        System.out.printf("Years         : %d%n%n", years);

        double recursive  = futureValueRecursive(presentValue, annualRate, years);
        double memoized   = futureValueMemo(presentValue, annualRate, years);
        double iterative  = futureValueIterative(presentValue, annualRate, years);

        System.out.printf("Recursive  Future Value : Rs. %.2f%n", recursive);
        System.out.printf("Memoized   Future Value : Rs. %.2f%n", memoized);
        System.out.printf("Iterative  Future Value : Rs. %.2f%n", iterative);

        System.out.println("\nYear-by-year breakdown (recursive):");
        for (int y = 1; y <= years; y++) {
            System.out.printf("  Year %2d -> Rs. %.2f%n", y,
                    futureValueRecursive(presentValue, annualRate, y));
        }
    }
}
