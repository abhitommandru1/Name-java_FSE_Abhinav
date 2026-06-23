public class ShapeFactory {

    public static Shape getShape(String type) {
        switch (type.toLowerCase()) {
            case "circle":    return new Circle(5.0);
            case "rectangle": return new Rectangle(4.0, 6.0);
            case "triangle":  return new Triangle(3.0, 8.0);
            default: throw new IllegalArgumentException("Unknown shape: " + type);
        }
    }

    public static void main(String[] args) {
        String[] types = {"circle", "rectangle", "triangle"};

        for (String type : types) {
            Shape shape = ShapeFactory.getShape(type);
            shape.draw();
            System.out.printf("Area: %.2f%n%n", shape.area());
        }
    }
}
