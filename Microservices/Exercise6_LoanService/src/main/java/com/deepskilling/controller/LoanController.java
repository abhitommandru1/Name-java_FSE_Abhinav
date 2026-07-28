package com.deepskilling.controller;

import com.deepskilling.client.AccountClient;
import com.deepskilling.model.Loan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final AccountClient accountClient;
    private final List<Loan> loans = new ArrayList<>();
    private int nextId = 1;

    public LoanController(AccountClient accountClient) {
        this.accountClient = accountClient;
        loans.add(new Loan(nextId++, 1, 200000.00, "APPROVED"));
    }

    @GetMapping
    public List<Loan> getAllLoans() {
        return loans;
    }

    // Demonstrates inter-service communication via Feign: checks the account exists
    // (through account-service) before approving the loan.
    @PostMapping
    public ResponseEntity<?> createLoan(@RequestBody Loan loan) {
        Map<String, Object> account;
        try {
            account = accountClient.getAccountById(loan.getAccountId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Account service unavailable or account not found"));
        }

        if (account == null || account.get("id") == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Account " + loan.getAccountId() + " not found"));
        }

        loan.setId(nextId++);
        loan.setStatus("APPROVED");
        loans.add(loan);
        return ResponseEntity.status(HttpStatus.CREATED).body(loan);
    }

    // Combines loan + account data — demonstrates aggregating a response from two services
    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getLoanWithAccount(@PathVariable int id) {
        Loan loan = loans.stream().filter(l -> l.getId() == id).findFirst().orElse(null);
        if (loan == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Loan not found"));
        }

        Map<String, Object> details = new LinkedHashMap<>();
        details.put("loan", loan);
        details.put("account", accountClient.getAccountById(loan.getAccountId()));
        return ResponseEntity.ok(details);
    }
}
