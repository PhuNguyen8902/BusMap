/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.web.PageableDefault;

/**
 *
 * @author ADMIN
 */
@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {

    List<Route> findRouteByRouteNum (String routeNum);
    
    @Query(value = "select r from Route r group by r.routeNum")
    List<Route> findAllOneWayRoute();
    
}
