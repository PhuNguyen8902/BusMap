/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.service.RouteService;
import jakarta.websocket.server.PathParam;
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
@RequestMapping("/api/route")
public class RouteController {

    @Autowired
    private RouteService routeService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getRouteByRouteId(@PathVariable("id") Integer id){
            return ResponseEntity.ok(this.routeService.getRouteById(id));
    }


    @GetMapping("/oneWay")
    public ResponseEntity<?> getAllOneWayRoute(@RequestParam(name = "name", required = false) String name) {
        return ResponseEntity.ok(this.routeService.getAllOneWayRoute(name));
    }
    
    @GetMapping("/routeBackward/{routeNum}")
    public ResponseEntity<?> getRouteByRouteNum(@PathVariable("routeNum") String routeNum){
            return ResponseEntity.ok(this.routeService.getRouteByRouteNum(routeNum));
    }

}
