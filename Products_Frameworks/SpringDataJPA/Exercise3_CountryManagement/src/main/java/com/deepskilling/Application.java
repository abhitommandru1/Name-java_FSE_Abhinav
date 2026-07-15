package com.deepskilling;

import com.deepskilling.entity.Country;
import com.deepskilling.repository.CountryRepository;
import com.deepskilling.service.CountryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner run(CountryService countryService, CountryRepository countryRepository) {
        return args -> {
            System.out.println("\n--- Add a new country (CountryService) ---");
            countryService.addCountry("India", "IN", "New Delhi", 1_428_000_000L);
            countryService.addCountry("United States", "US", "Washington, D.C.", 341_000_000L);
            countryService.addCountry("Japan", "JP", "Tokyo", 123_000_000L);
            countryService.addCountry("Singapore", "SG", "Singapore", 5_900_000L);

            System.out.println("\n--- All countries ---");
            countryService.getAllCountries().forEach(System.out::println);

            System.out.println("\n--- O/R Mapping: @Transient field computed from mapped fields, not a column ---");
            Country india = countryService.findByCode("IN").orElseThrow();
            System.out.println("displayLabel (not persisted): " + india.getDisplayLabel());

            System.out.println("\n--- Find a country based on country code (Query Method: findByCode) ---");
            countryService.findByCode("JP").ifPresent(System.out::println);

            System.out.println("\n--- Query Methods feature: findByNameContainingIgnoreCase(\"united\") ---");
            countryRepository.findByNameContainingIgnoreCase("united").forEach(System.out::println);

            System.out.println("\n--- Query Methods feature: findByPopulationGreaterThan(100_000_000) ---");
            countryRepository.findByPopulationGreaterThan(100_000_000L).forEach(System.out::println);

            System.out.println("\n--- Hibernate Query Language (JPQL): population BETWEEN 5M and 130M ---");
            countryRepository.findByPopulationRangeJPQL(5_000_000L, 130_000_000L).forEach(System.out::println);

            System.out.println("\n--- Native Query: countries WHERE capital = 'Tokyo' ---");
            countryRepository.findByCapitalNative("Tokyo").forEach(System.out::println);
        };
    }
}
