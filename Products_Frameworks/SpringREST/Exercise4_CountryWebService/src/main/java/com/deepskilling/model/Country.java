package com.deepskilling.model;

public class Country {

    private int id;
    private String name;
    private String code;
    private String capital;

    public Country() {}

    public Country(int id, String name, String code, String capital) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.capital = capital;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getCapital() { return capital; }
    public void setCapital(String capital) { this.capital = capital; }
}
