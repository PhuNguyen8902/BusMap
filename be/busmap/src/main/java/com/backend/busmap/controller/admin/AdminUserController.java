/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.dto.request.EditRoute;
import com.backend.busmap.dto.request.EditUser;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.models.User;
import com.backend.busmap.service.AuthenticationService;
import com.backend.busmap.service.UserService;
import jakarta.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/admin/user")
//@CrossOrigin
public class AdminUserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("")
    public ResponseEntity<?> getAllRoute(@RequestParam Map<String, String> params) {
        Page<User> pages = (Page<User>) userService.getAllUser(params);
        return ResponseEntity.ok(pages);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoute(@RequestBody User u) throws UnsupportedEncodingException {

        boolean rs = authenticationService.register(u);
        if (!rs) {
            return ResponseEntity.ok(Message.builder().mess("User existed").build());
        }
        return ResponseEntity.ok(new Message("Create success"));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editRoute(@Valid @RequestBody EditUser u) throws UnsupportedEncodingException {
         userService.editUser(u);
        return ResponseEntity.ok(new Message("Edit success"));
    }
}
