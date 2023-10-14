/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.models.RefreshToken;
import com.backend.busmap.models.User;
import com.backend.busmap.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.time.Instant;
import java.time.ZoneId;
import java.time.LocalDateTime;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserService userService;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

//    @Value("${com.server.backend.jwtRefreshExpiration}")
//    private Integer jwtRefreshExpirationMs;
    public RefreshToken createRefreshToken(String userId) {

        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId).orElse(null);

        if (refreshToken != null) {
            RefreshToken rf = verifyExpiration(refreshToken);
            if (rf != null) {
                return rf;
            }
        }

        User u = userService.getUserById(userId).orElse(null);
        Instant instant = Instant.now().plusSeconds(100 * 60);
        ZoneId zoneId = ZoneId.systemDefault();

        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, zoneId);
        refreshToken = RefreshToken.builder()
                .user(u)
                .expiryDate(dateTime)
                .token(UUID.randomUUID().toString())
                .build();

        refreshTokenRepository.save(refreshToken);

        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(LocalDateTime.now()) < 0) {
            refreshTokenRepository.delete(token);
            return null;
        } else {
            return token;
        }
    }
}
