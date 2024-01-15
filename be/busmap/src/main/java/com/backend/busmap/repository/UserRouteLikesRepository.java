/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.User;
import com.backend.busmap.models.UserRouteLikes;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ADMIN
 */
@Repository

public interface UserRouteLikesRepository extends JpaRepository<UserRouteLikes, Integer> {

    @Query(value = "SELECT r.route FROM UserRouteLikes r WHERE r.route.isActive =1 AND r.user = :id")
    List<Route> getAllRouteByUser(@Param("id") User id);

    @Query(value = "SELECT r.route FROM UserRouteLikes r WHERE (r.route.isActive = 1 AND (:name IS NULL OR r.route.name LIKE %:name% OR r.route.routeNum like %:name%)AND r.user = :id) group by r.route.routeNum")
    List<Route> findAllOneWayRoute(@Param("name") String name,@Param("id") User id);

    UserRouteLikes findByUserIdAndRouteId(String u,Integer r);
    
}
