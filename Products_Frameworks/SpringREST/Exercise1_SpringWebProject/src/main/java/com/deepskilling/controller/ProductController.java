package com.deepskilling.controller;

import com.deepskilling.model.Product;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private List<Product> products = new ArrayList<>(List.of(
        new Product(1, "Laptop",   75000.00),
        new Product(2, "Mouse",      500.00),
        new Product(3, "Keyboard",  1200.00)
    ));

    @GetMapping
    public List<Product> getAllProducts() {
        return products;
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return products.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        products.add(product);
        return product;
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product updated) {
        for (Product p : products) {
            if (p.getId() == id) {
                p.setName(updated.getName());
                p.setPrice(updated.getPrice());
                return p;
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable int id) {
        products.removeIf(p -> p.getId() == id);
        return "Product " + id + " deleted.";
    }
}
