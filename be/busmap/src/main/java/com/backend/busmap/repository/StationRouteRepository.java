/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ADMIN
 */
@Repository
public interface StationRouteRepository extends JpaRepository<StationRoute, Integer> {

    @Query("SELECT r FROM StationRoute s JOIN s.routeId r WHERE s.stationId = ?1 AND r.isActive = 1")
    List<Route> getRouteByStationId(Station sta);

    @Query("select s from StationRoute s where s.stationId =?1 and s.routeId =?2 ")
    StationRoute getStationRouteByStation(Station sta, Route route);

//    @Query("select sta from StationRoute s join s.stationId sta where s.order =?1 and s.routeId =?2 and sta.isActive = 1")
//    Station getStationByOrder(Integer order, Route route);
}
