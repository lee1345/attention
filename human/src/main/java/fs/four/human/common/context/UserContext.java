package fs.four.human.common.context;

public class UserContext {
    private static final ThreadLocal<String> userThreadLocal = new ThreadLocal<>();

    public static void setCurrentUser(String userId) {
        userThreadLocal.set(userId);
    }

    public static String getCurrentUser() {
        return userThreadLocal.get();
    }

    public static void clear() {
        userThreadLocal.remove();
    }
}
