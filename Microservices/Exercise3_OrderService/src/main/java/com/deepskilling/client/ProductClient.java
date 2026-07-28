package com.deepskilling.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

// Feign client that calls product-service registered in Eureka
@FeignClient(name = "product-service")
public interface ProductClient {

    @GetMapping("/api/products")
    List<Map<String, Object>> getAllProducts();

    @GetMapping("/api/products/{id}")
    Map<String, Object> getProductById(@PathVariable int id);
}
