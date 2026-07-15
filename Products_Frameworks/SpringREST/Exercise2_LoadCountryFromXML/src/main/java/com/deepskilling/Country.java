package com.deepskilling;

public class Country {

    private String name;
    private String code;
    private String capital;

    public Country() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getCapital() { return capital; }
    public void setCapital(String capital) { this.capital = capital; }

    @Override
    public String toString() {
        return "Country{name='" + name + "', code='" + code + "', capital='" + capital + "'}";
    }
}
