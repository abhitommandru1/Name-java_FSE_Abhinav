package com.deepskilling.controller;

import com.deepskilling.model.Country;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final List<Country> countries = new ArrayList<>(List.of(
            new Country(1, "India", "IN", "New Delhi"),
            new Country(2, "United States", "US", "Washington, D.C."),
            new Country(3, "Japan", "JP", "Tokyo")
    ));

    @GetMapping
    public List<Country> getAllCountries() {
        return countries;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable int id) {
        return countries.stream()
                .filter(c -> c.getId() == id)
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // REST - Get country based on country code
    @GetMapping("/code/{code}")
    public ResponseEntity<Country> getCountryByCode(@PathVariable String code) {
        return countries.stream()
                .filter(c -> c.getCode().equalsIgnoreCase(code))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Country> addCountry(@RequestBody Country country) {
        countries.add(country);
        return ResponseEntity.status(HttpStatus.CREATED).body(country);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable int id, @RequestBody Country updated) {
        for (Country c : countries) {
            if (c.getId() == id) {
                c.setName(updated.getName());
                c.setCode(updated.getCode());
                c.setCapital(updated.getCapital());
                return ResponseEntity.ok(c);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable int id) {
        boolean removed = countries.removeIf(c -> c.getId() == id);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
