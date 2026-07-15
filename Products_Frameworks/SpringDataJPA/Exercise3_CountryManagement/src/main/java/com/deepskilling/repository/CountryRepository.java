package com.deepskilling.repository;

import com.deepskilling.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country, Long> {

    // Query Methods feature: Spring Data JPA derives the query from the method name
    // alone — no @Query annotation, no SQL/JPQL written by hand.
    Optional<Country> findByCode(String code);

    List<Country> findByNameContainingIgnoreCase(String namePart);

    List<Country> findByPopulationGreaterThan(long minPopulation);

    // Hibernate Query Language (JPQL) — object-oriented query written against entity
    // names/fields ("Country", "c.population"), not table/column names.
    @Query("SELECT c FROM Country c WHERE c.population BETWEEN :min AND :max ORDER BY c.population DESC")
    List<Country> findByPopulationRangeJPQL(@Param("min") long min, @Param("max") long max);

    // Native SQL query — written against the actual table/column names, runs verbatim
    // against the database.
    @Query(value = "SELECT * FROM countries WHERE capital = :capital", nativeQuery = true)
    List<Country> findByCapitalNative(@Param("capital") String capital);
}
