package com.deepskilling;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        // XML-based bean configuration — the IoC container reads applicationContext.xml,
        // instantiates each <bean>, and wires the <property> values via setter injection.
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        Country india = context.getBean("india", Country.class);
        Country usa = context.getBean("usa", Country.class);
        Country japan = context.getBean("japan", Country.class);

        System.out.println("Loaded countries from Spring XML configuration:");
        System.out.println(india);
        System.out.println(usa);
        System.out.println(japan);
    }
}
