/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.dto.request.EditRoute;
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
        if (pages == null) {
            return ResponseEntity.badRequest().body("Error");
        }
        return ResponseEntity.ok(pages);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoute(@RequestBody AddRoute route) {
        return ResponseEntity.ok(this.routeService.addNewRoute(route));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editRoute(@Valid @RequestBody EditRoute route, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errors);
        }
                return ResponseEntity.ok("dung dinh dang");

//        return ResponseEntity.ok(this.routeService.updateRoute(route));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteRoute(@PathVariable Integer id) {
        return ResponseEntity.ok(this.routeService.deleteRoute(id));
    }
}
