/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/route")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRoute() {
        return ResponseEntity.ok(this.routeService.getAllRoute());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoute(@RequestBody AddRoute route) {
        return ResponseEntity.ok(this.routeService.addNewRoute(route));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editRoute(@RequestBody AddRoute route) {
        return ResponseEntity.ok(this.routeService.updateRoute(route));
    }

    @PutMapping("/delete")
    public ResponseEntity<?> deleteRoute(@RequestParam Integer id) {
        return ResponseEntity.ok(this.routeService.deleteRoute(id));
    }
}
