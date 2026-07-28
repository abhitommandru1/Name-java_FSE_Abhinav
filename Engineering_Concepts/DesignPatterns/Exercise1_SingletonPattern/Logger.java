public class Logger {

    private static Logger instance;
    private int logCount = 0;

    private Logger() {}

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String message) {
        logCount++;
        System.out.println("[LOG #" + logCount + "] " + message);
    }

    public int getLogCount() {
        return logCount;
    }

    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("Application started");
        logger2.log("User logged in");
        logger1.log("Processing order");

        System.out.println("\nSame instance? " + (logger1 == logger2));
        System.out.println("Total logs: " + logger1.getLogCount());
    }
}
