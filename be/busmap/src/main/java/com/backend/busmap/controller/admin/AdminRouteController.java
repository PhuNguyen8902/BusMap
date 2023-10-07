/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.dto.request.EditRoute;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.models.Route;
import com.backend.busmap.service.RouteService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/api/admin/route")
@Validated
public class AdminRouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("")
    public ResponseEntity<?> getAllRoute(@RequestParam Map<String, String> params) {
        Page<Route> pages = (Page<Route>) routeService.getAllRoute(params);
        return ResponseEntity.ok(pages);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoute(@Valid @RequestBody AddRoute route) {
        String rs = routeService.addNewRoute(route);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editRoute(@Valid @RequestBody EditRoute route) {
        String rs = routeService.updateRoute(route);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteRoute(@PathVariable Integer id) {
         String rs = routeService.deleteRoute(id);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

}
