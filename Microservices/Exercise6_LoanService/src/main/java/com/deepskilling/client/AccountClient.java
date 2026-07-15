package com.deepskilling.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

// Feign client that calls account-service registered in Eureka
@FeignClient(name = "account-service")
public interface AccountClient {

    @GetMapping("/api/accounts/{id}")
    Map<String, Object> getAccountById(@PathVariable int id);
}
