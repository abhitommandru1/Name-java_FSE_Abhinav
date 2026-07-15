package com.deepskilling.controller;

import com.deepskilling.model.Account;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final List<Account> accounts = new ArrayList<>(List.of(
            new Account(1, "Abhinav", 50000.00),
            new Account(2, "Priya", 12000.00),
            new Account(3, "Ravi", 300.00)
    ));

    @GetMapping
    public List<Account> getAllAccounts() {
        return accounts;
    }

    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable int id) {
        return accounts.stream()
                .filter(a -> a.getId() == id)
                .findFirst()
                .orElse(null);
    }
}
