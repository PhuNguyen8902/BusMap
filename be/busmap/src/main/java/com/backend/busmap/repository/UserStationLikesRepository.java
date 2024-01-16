/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Station;
import com.backend.busmap.models.User;
import com.backend.busmap.models.UserStationLikes;
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
public interface UserStationLikesRepository extends JpaRepository<UserStationLikes, Integer> {

    @Query(value = "SELECT r.station FROM UserStationLikes r WHERE r.station.isActive =1 AND r.user = :id")
    List<Station> getAllStationByUser(@Param("id") User id);

    @Query(value = "SELECT r.station FROM UserStationLikes r WHERE (r.station.isActive = 1 AND (:name IS NULL OR r.station.name LIKE %:name% OR r.station.code like %:name%)AND r.user = :id) ")
    List<Station> findSearchStation (@Param("name") String name,@Param("id") User id);

    UserStationLikes findByUserIdAndStationId(String u,Integer r);
    
}
