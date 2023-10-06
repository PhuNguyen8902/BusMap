/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ADMIN
 */
@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {

    Page<Route> findRouteByIsActive(int active, Pageable a);

    List<Route> findRouteByRouteNum(String routeNum);

    @Query(value = "SELECT r FROM Route r WHERE (:name IS NULL OR r.name LIKE %:name%) group by r.routeNum")
    List<Route> findAllOneWayRoute(@Param("name") String name);

    @Query("select r from Route r where r.routeNum = ?1 and r.id != ?2")
    Route getRemainingRoute(String routeNum, Integer id);

}
