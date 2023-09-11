/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ADMIN
 */
@Repository
public interface RouteRepository extends JpaRepository<Route, Integer>{
    
}
