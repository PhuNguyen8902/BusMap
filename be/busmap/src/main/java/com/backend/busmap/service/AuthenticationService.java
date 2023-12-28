/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import java.io.UnsupportedEncodingException;

import com.backend.busmap.dto.request.Login;
import com.backend.busmap.dto.request.RefreshTokenRequest;
import com.backend.busmap.dto.request.Register;
import com.backend.busmap.dto.response.AuthenticationResponse;
import com.backend.busmap.enums.UserRole;
import com.backend.busmap.models.RefreshToken;
import com.backend.busmap.models.User;
import com.backend.busmap.repository.AuthAppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthAppRepository authAppRepo;

    public boolean register(User request) throws UnsupportedEncodingException {
        User userExist = userService.getUserByUserName(request.getUsername()).orElse(null);
        User userExist2 = userService.getUserByEmail(request.getEmail()).orElse(null);

        if (userExist != null || userExist2 != null) {
            return false;
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .userName(request.getUsername())
                .phone(request.getPhone())
                .isActive(1)
                .password(passwordEncoder.encode(request.getPassword()))
                //                .password(request.getPassword())
                .role(UserRole.ROLE_CUSTOMER)
                .build();

        userService.saveOrUpdateUser(user);
        return true;
    }

    public AuthenticationResponse signIn(Login request) {
        User user = userService.getUserByUserName(request.getUserName()).orElse(null);

        if (user == null) {
            return null;
        }
        var authenticationResponse = AuthenticationResponse.builder();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
        } catch (BadCredentialsException e) {
            return null;
        }

        var jwtToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return authenticationResponse
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .build();

    }

    public User signInAPP(Login request) {
        User user = authAppRepo.findUserByUserName(request.getUserName());
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (matches) {
            return user;
        }
        return null;
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenService.findByToken(request.getToken()).orElse(null);
        if (refreshToken == null) {
            return null;
        }
        refreshToken = refreshTokenService.verifyExpiration(refreshToken);
        if (refreshToken == null) {
            return null;
        }

        String accessToken = jwtService.generateToken(refreshToken.getUser());
        return AuthenticationResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }

}
