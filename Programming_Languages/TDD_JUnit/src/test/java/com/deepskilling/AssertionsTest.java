package com.deepskilling;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AssertionsTest {

    @Test
    void testAssertEquals() {
        assertEquals(10, 5 + 5);
    }

    @Test
    void testAssertNotEquals() {
        assertNotEquals(10, 5 + 4);
    }

    @Test
    void testAssertTrue() {
        assertTrue(10 > 5);
    }

    @Test
    void testAssertFalse() {
        assertFalse(10 < 5);
    }

    @Test
    void testAssertNull() {
        String value = null;
        assertNull(value);
    }

    @Test
    void testAssertNotNull() {
        String value = "Hello";
        assertNotNull(value);
    }

    @Test
    void testAssertThrows() {
        assertThrows(ArithmeticException.class, () -> {
            int result = 10 / 0;
        });
    }

    @Test
    void testAssertAll() {
        int a = 5, b = 10;
        assertAll(
            () -> assertEquals(15, a + b),
            () -> assertTrue(b > a),
            () -> assertNotNull(a)
        );
    }
}
