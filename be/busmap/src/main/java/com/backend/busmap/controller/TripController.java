/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;


import com.backend.busmap.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/trip")
public class TripController {
    
   @Autowired
   private TripService tripService;
   
    @GetMapping("/count/{routeId}")
    public ResponseEntity<?> countTripByRouteId(@PathVariable("routeId") Integer routeId){
            return ResponseEntity.ok(this.tripService.countTripByRouteId(routeId));
    }

  
}
