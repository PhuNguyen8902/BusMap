/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/station")
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping("/")
    public ResponseEntity<?> getAllStation() {
        return ResponseEntity.ok(this.stationService.getAllStation());
    }
    
    @GetMapping("/count")
    public ResponseEntity<?> getNearestStations(@RequestParam Double latitude, @RequestParam Double longitude) {
//        int limit = 10;
        return ResponseEntity.ok(this.stationService.findNearestStations(latitude, longitude));
    }
    
     @GetMapping("/route2")
    public ResponseEntity<?> getNearestStations2(@RequestParam Double latitude1, @RequestParam Double longitude1,
            @RequestParam Double latitude2, @RequestParam Double longitude2) {
        return ResponseEntity.ok(this.stationService.getNearestStations2(latitude1, longitude1,latitude2,longitude2));
    }
    
      @GetMapping("/route1")
    public ResponseEntity<?> getNearestStationsFor1Route(@RequestParam Double latitude1, @RequestParam Double longitude1,
            @RequestParam Double latitude2, @RequestParam Double longitude2) {
        return ResponseEntity.ok(this.stationService.getNearestStationsFor1Route(latitude1, longitude1,latitude2,longitude2));
    }
    
      @GetMapping("/find")
    public ResponseEntity<?> findStationsOnRoutes(@RequestParam Integer route1, @RequestParam Integer route2) {
 
        return ResponseEntity.ok(this.stationService.findStationsOnRoutes(route1, route2));
    }
    
      @GetMapping("/cal")
    public ResponseEntity<?> calculateDistance(@RequestParam Double latitude1, @RequestParam Double longitude1,
            @RequestParam Double latitude2, @RequestParam Double longitude2) {
        return ResponseEntity.ok(this.stationService.calculateDistance(latitude1, longitude1,latitude2,longitude2));
    }
}
