public class FactoryMethodPatternTest {
    public static void main(String[] args) {
        DocumentFactory[] factories = {
            new WordDocumentFactory(),
            new PdfDocumentFactory(),
            new ExcelDocumentFactory()
        };

        for (DocumentFactory factory : factories) {
            // Each concrete factory decides which concrete Document subclass to instantiate —
            // the client only ever depends on the DocumentFactory/Document abstractions.
            Document document = factory.createDocument();
            document.open();
        }
    }
}
