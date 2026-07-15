package com.deepskilling.service;

import com.deepskilling.entity.Country;
import com.deepskilling.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// "Implement services for managing Country" — a thin service layer over the
// repository, the standard place to put business logic that doesn't belong in the
// repository (pure data access) or the controller (HTTP concerns).
@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public Country addCountry(String name, String code, String capital, long population) {
        return countryRepository.save(new Country(name, code, capital, population));
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // "Find a country based on country code"
    public Optional<Country> findByCode(String code) {
        return countryRepository.findByCode(code);
    }
}
