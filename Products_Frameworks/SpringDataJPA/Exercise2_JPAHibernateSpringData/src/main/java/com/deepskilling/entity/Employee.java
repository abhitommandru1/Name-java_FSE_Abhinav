package com.deepskilling.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    private double salary;

    public Employee() {}

    public Employee(String name, String department, double salary) {
        this.name       = name;
        this.department = department;
        this.salary     = salary;
    }

    public Long getId()          { return id; }
    public String getName()      { return name; }
    public String getDepartment(){ return department; }
    public double getSalary()    { return salary; }

    public void setName(String name)            { this.name = name; }
    public void setDepartment(String department){ this.department = department; }
    public void setSalary(double salary)        { this.salary = salary; }

    @Override
    public String toString() {
        return "Employee[ID=" + id + ", Name=" + name + ", Dept=" + department + ", Salary=" + salary + "]";
    }
}
