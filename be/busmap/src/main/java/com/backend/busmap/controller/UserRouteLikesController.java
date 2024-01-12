/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.User;
import com.backend.busmap.service.UserRouteLikesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/userRouteLikes")
public class UserRouteLikesController {

    @Autowired
    private UserRouteLikesService userRouteLikesService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllRouteByUser(@PathVariable("id") String id) {
        return ResponseEntity.ok(this.userRouteLikesService.getAllRouteByUser(id));
    }

    @GetMapping("/oneWay")
    public ResponseEntity<?> getAllOneWayRoute(@RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "id", required = false) String id) {
        return ResponseEntity.ok(this.userRouteLikesService.getAllOneWayRoute(name,id));
    }
}
