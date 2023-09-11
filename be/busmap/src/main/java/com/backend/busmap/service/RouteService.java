/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.models.Route;
import com.backend.busmap.repository.RouteRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class RouteService {
    
    @Autowired
    private RouteRepository routeRepo;
    
    public List<Route> getAllRoute(){
        return this.routeRepo.findAll();
    }
}
