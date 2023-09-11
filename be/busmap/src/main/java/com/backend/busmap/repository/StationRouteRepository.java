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

    @Query("select s.routeId from StationRoute s where s.stationId =?1 ")
    List<Route> getRouteByStationId(Station sta);

    @Query("select s from StationRoute s where s.stationId =?1 and s.routeId =?2 ")
    StationRoute getStationRouteByStation(Station sta, Route route);

    @Query("select s.stationId from StationRoute s where s.order =?1 and s.routeId =?2 ")
    Station getStationByOrder(Integer order, Route route);
}
