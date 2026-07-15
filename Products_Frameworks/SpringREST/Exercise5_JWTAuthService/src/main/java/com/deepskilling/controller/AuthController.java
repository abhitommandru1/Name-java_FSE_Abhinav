package com.deepskilling.controller;

import com.deepskilling.dto.AuthRequest;
import com.deepskilling.dto.AuthResponse;
import com.deepskilling.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    // Demo-only in-memory user store — a real service checks a hashed password against a database.
    private static final Map<String, String> USERS = Map.of(
            "admin", "admin123",
            "abhinav", "password123"
    );

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // Create authentication service that returns JWT
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        String expectedPassword = USERS.get(request.getUsername());

        if (expectedPassword == null || !expectedPassword.equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    // Protected endpoint demonstrating the token being validated on a subsequent request
    @GetMapping("/welcome")
    public ResponseEntity<String> welcome(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or malformed Authorization header");
        }

        String token = authHeader.substring("Bearer ".length());
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String username = jwtUtil.extractUsername(token);
        return ResponseEntity.ok("Welcome, " + username + "! Your token is valid.");
    }
}
