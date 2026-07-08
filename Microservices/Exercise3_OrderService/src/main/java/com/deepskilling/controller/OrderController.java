package com.deepskilling.controller;

import com.deepskilling.client.ProductClient;
import com.deepskilling.model.Order;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final ProductClient productClient;
    private final List<Order> orders = new ArrayList<>();
    private int nextId = 1;

    public OrderController(ProductClient productClient) {
        this.productClient = productClient;
        orders.add(new Order(nextId++, 1, 2, "CONFIRMED"));
        orders.add(new Order(nextId++, 2, 1, "PENDING"));
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orders;
    }

    // Demonstrates inter-service communication via Feign
    @GetMapping("/{id}/details")
    public Map<String, Object> getOrderWithProduct(@PathVariable int id) {
        Order order = orders.stream()
                .filter(o -> o.getId() == id)
                .findFirst()
                .orElse(null);

        if (order == null) return Map.of("error", "Order not found");

        Map<String, Object> details = new LinkedHashMap<>();
        details.put("order", order);
        details.put("product", productClient.getProductById(order.getProductId()));
        return details;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setId(nextId++);
        order.setStatus("PENDING");
        orders.add(order);
        return order;
    }
}
