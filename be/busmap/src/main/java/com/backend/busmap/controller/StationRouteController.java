/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.service.StationRouteService;
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
@RequestMapping("/api/station-route")
public class StationRouteController {
    @Autowired
    private StationRouteService stationRouteService;

    @GetMapping("/")
    public ResponseEntity<?> getAllStationRoute() {
        return ResponseEntity.ok(this.stationRouteService.getAllStationRoutes());
    }
    
    @GetMapping("/route/{id}")
    public ResponseEntity<?> getStationRouteByRouteId(@PathVariable Integer id){
        return ResponseEntity.ok(this.stationRouteService.getStationRouteByRouteId(id));
    }
    
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getStationRouteById(@PathVariable Integer id) {
//        return ResponseEntity.ok(this.stationRouteService.getStationRouteByStationId(id));
//    }
}
