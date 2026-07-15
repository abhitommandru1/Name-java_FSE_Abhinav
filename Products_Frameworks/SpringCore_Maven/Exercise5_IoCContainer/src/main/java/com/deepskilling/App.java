package com.deepskilling;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;

public class App {

    public static void main(String[] args) {
        System.out.println("=== BeanFactory: lazy initialization ===");
        System.out.println("Step 1: creating the BeanFactory (loading bean *definitions* only)...");

        // BeanFactory is the root interface for the IoC container — it reads bean
        // definitions but does NOT instantiate singleton beans until they're first
        // requested with getBean(). This is "lazy" container behavior.
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
        reader.loadBeanDefinitions(new ClassPathResource("beans.xml"));

        System.out.println("Step 2: BeanFactory created. Notice ReportService has NOT been constructed yet.");
        System.out.println("Step 3: calling getBean(\"reportService\") now...");

        BeanFactory factory = beanFactory;
        ReportService lazyService = factory.getBean("reportService", ReportService.class);
        lazyService.generate();

        System.out.println();
        System.out.println("=== ApplicationContext: eager initialization ===");
        System.out.println("Step 1: creating the ApplicationContext...");

        // ApplicationContext is a superset of BeanFactory — among its extra behavior,
        // it eagerly pre-instantiates all singleton beans as soon as the context is
        // created, not on first getBean() call.
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");

        System.out.println("Step 2: ApplicationContext created. ReportService was ALREADY constructed above,");
        System.out.println("        before we ever called getBean() — that's eager initialization.");
        System.out.println("Step 3: calling getBean(\"reportService\") now (just retrieves the existing instance)...");

        ReportService eagerService = context.getBean("reportService", ReportService.class);
        eagerService.generate();

        context.close();
    }
}
