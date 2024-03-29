/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Station;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ADMIN
 */
@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {

    Page<Station> findStationByIsActive(int active, Pageable a);

    @Query(value = "SELECT * FROM station s WHERE s.is_active =1 AND EXISTS (SELECT 1 FROM station_route sr1 "
            + "WHERE sr1.station_id = s.id AND sr1.route_id = ?1) AND EXISTS "
            + "(SELECT 1 FROM station_route sr2 WHERE sr2.station_id = s.id AND sr2.route_id = ?2)", nativeQuery = true)
    List<Station> findStationsOnRoutes(Integer routeId1, Integer routeId2);

    @Query(value = "SELECT * from station where is_active =1 AND latitude BETWEEN ?1 - 0.063555 AND ?1 + 0.063555 and "
            + "longitude BETWEEN ?2 - 0.023073 AND ?2 + 0.023073", nativeQuery = true)
    List<Station> getStationNearAdd(double la, double lo);

    Station findStationByCode(String code);

    Station findStationById(Integer id);

    @Query(value = "SELECT r FROM Station r WHERE (r.isActive = 1 AND (:name IS NULL OR r.name LIKE %:name% OR r.code like %:name%)) group by r.code")
    List<Station> getAllStationSearch(@Param("name") String name);

    @Query("select r from Station r where r.isActive = 1 group by r.code")
    List<Station> getStationByIsActive();
}
