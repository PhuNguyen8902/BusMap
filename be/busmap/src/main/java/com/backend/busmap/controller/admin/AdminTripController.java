/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.AddTrip;
import com.backend.busmap.models.Route;
import com.backend.busmap.service.TripService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/admin/trip")
@Validated
public class AdminTripController {

    @Autowired
    private TripService tripSer;

     @GetMapping("/route/{id}")
    public ResponseEntity<?> getAllTripOfRoute(@PathVariable Integer id,@RequestParam Map<String, String> params) {
        Page<Route> pages = (Page<Route>) tripSer.getTripByRouteId(id,params);
        return ResponseEntity.ok(pages);
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> addNewTrip(@RequestBody AddTrip trip) {
        return ResponseEntity.ok(this.tripSer.addNewTrip(trip));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editTrip(@Valid @RequestBody AddTrip trip) {
        return ResponseEntity.ok(this.tripSer.editTrip(trip));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Integer id) {
        return ResponseEntity.ok(this.tripSer.deleteTrip(id));
    }
}
