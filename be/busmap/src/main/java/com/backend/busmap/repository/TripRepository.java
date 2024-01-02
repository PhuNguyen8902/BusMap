/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.Trip;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ADMIN
 */
@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
    Page<Trip> findAllByRouteId(Route r, Pageable a);

    List<Trip> findAllByRouteId(Route r);
    
//  @Query("SELECT COUNT(*) FROM trip t WHERE t.route_id = :routeId")
    @Query(value = "SELECT COUNT(*) FROM trip t WHERE t.route_id = ?1", nativeQuery = true)
    Integer countTripByRouteId(Integer routeId);
}
