/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.Login;
import com.backend.busmap.dto.response.AuthenticationResponse;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/admin/auth")
//@CrossOrigin
public class AdminAuthController {

//    @Autowired
//    private AuthenticationService authenticationService;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginAdmin(@RequestBody Login request) {
//        AuthenticationResponse response = authenticationService.signIn(request);
//        Message errorResponse = checkError(response);
//        if (errorResponse != null) {
//            return ResponseEntity.ok(Message.builder().mess(errorResponse.toString()).build());
//
//        }
//
//        return ResponseEntity.ok(response);
//    }
//
//    private Message checkError(AuthenticationResponse authenticationResponse) {
//        var errorResponse = Message.builder();
//
//        if (authenticationResponse == null) {
//            return errorResponse.mess("Email or password is not correct").build();
//        }
//
//        return null;
//    }
}
