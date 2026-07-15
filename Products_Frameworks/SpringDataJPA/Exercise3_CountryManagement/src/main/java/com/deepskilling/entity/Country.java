package com.deepskilling.entity;

import jakarta.persistence.*;

// O/R Mapping: this class maps to the "countries" table — @Entity marks the class as
// persistable, @Table names the table, @Id/@GeneratedValue map the primary key, and each
// field maps to a column of the same name unless overridden with @Column.
@Entity
@Table(name = "countries")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 3)
    private String code;

    private String capital;

    private long population;

    // @Transient: part of the Java object model but deliberately NOT mapped to any
    // column — this is the O/R mapping boundary made visible. Demonstrates that not
    // every field on the entity class becomes a database column.
    @Transient
    private String displayLabel;

    public Country() {}

    public Country(String name, String code, String capital, long population) {
        this.name = name;
        this.code = code;
        this.capital = capital;
        this.population = population;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCode() { return code; }
    public String getCapital() { return capital; }
    public long getPopulation() { return population; }

    public void setName(String name) { this.name = name; }
    public void setCode(String code) { this.code = code; }
    public void setCapital(String capital) { this.capital = capital; }
    public void setPopulation(long population) { this.population = population; }

    public String getDisplayLabel() {
        // Computed on the fly, from already-loaded fields — never round-trips to the DB.
        return name + " (" + code + ")";
    }

    @Override
    public String toString() {
        return "Country[id=" + id + ", name=" + name + ", code=" + code
                + ", capital=" + capital + ", population=" + population + "]";
    }
}
