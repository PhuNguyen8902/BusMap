/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.dto.request.Login;
import com.backend.busmap.dto.request.RefreshTokenRequest;
import com.backend.busmap.dto.request.Register;
import com.backend.busmap.dto.response.AuthenticationResponse;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.models.User;
import com.backend.busmap.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/auth")
//@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User request) throws UnsupportedEncodingException {
        boolean isSuccess = authenticationService.register(request);
        if (!isSuccess) {
            return ResponseEntity.ok(Message.builder().mess("User existed").build());
        }
        return ResponseEntity.ok(new Message("Register success"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login request) {
        AuthenticationResponse response = authenticationService.signIn(request);
        Message errorResponse = checkError(response);
        if (errorResponse != null) {

            return ResponseEntity.status(401).body(errorResponse);

        }

        return ResponseEntity.ok(response);
    }
     @PostMapping("/loginAPP")
    public ResponseEntity<?> loginAPP(@RequestBody Login request) {
        User user = authenticationService.signInAPP(request);
        if(user != null){
                return ResponseEntity.ok(user);
        }
      return ResponseEntity.status(403).body("Sai tài khoản hoặc mật khẩu");
    }

    private Message checkError(AuthenticationResponse authenticationResponse) {
        var errorResponse = Message.builder();

        if (authenticationResponse == null) {
            return errorResponse.mess("Username or password is not correct").build();
        }

        return null;
    }

    @GetMapping("/access-token")
    public ResponseEntity<?> getUserByToken(HttpServletRequest request) {

        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser"){
            return ResponseEntity.status(401).body("UNAUTHORIZED");
        }
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        AuthenticationResponse response = authenticationService.refreshToken(request);
        if (response == null) {
            return ResponseEntity.ok(Message.builder().mess("Unauthorize").build());
        }

        return ResponseEntity.ok(response);
    }
}
