import java.util.Arrays;
import java.util.Comparator;

public class SearchEngine {

    public static Product linearSearch(Product[] products, String targetName) {
        for (Product p : products) {
            if (p.getProductName().equalsIgnoreCase(targetName)) {
                return p;
            }
        }
        return null;
    }

    public static Product binarySearch(Product[] sortedProducts, String targetName) {
        int low = 0, high = sortedProducts.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int cmp = sortedProducts[mid].getProductName().compareToIgnoreCase(targetName);

            if (cmp == 0)  return sortedProducts[mid];
            if (cmp < 0)   low  = mid + 1;
            else           high = mid - 1;
        }
        return null;
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product(1, "Smartphone",   "Electronics"),
            new Product(2, "Headphones",   "Electronics"),
            new Product(3, "Running Shoes","Footwear"),
            new Product(4, "Backpack",     "Accessories"),
            new Product(5, "Laptop",       "Electronics"),
            new Product(6, "Watch",        "Accessories"),
        };

        System.out.println("=== Linear Search ===");
        String target = "Laptop";
        Product result = linearSearch(products, target);
        System.out.println("Searching for: " + target);
        System.out.println(result != null ? "Found -> " + result : "Not found");

        Product[] sorted = products.clone();
        Arrays.sort(sorted, Comparator.comparing(p -> p.getProductName().toLowerCase()));

        System.out.println("\n=== Binary Search (sorted array) ===");
        result = binarySearch(sorted, target);
        System.out.println("Searching for: " + target);
        System.out.println(result != null ? "Found -> " + result : "Not found");

        System.out.println("\n=== Search for non-existent product ===");
        result = linearSearch(products, "Tablet");
        System.out.println("Linear Search 'Tablet': " + (result != null ? result : "Not found"));

        result = binarySearch(sorted, "Tablet");
        System.out.println("Binary Search 'Tablet': " + (result != null ? result : "Not found"));
    }
}
