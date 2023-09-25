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

    @Query("SELECT sr FROM StationRoute sr "
            + "WHERE sr.routeId IN (SELECT sr2.routeId FROM StationRoute sr2 WHERE sr2.stationId = ?1) "
            + "AND sr.order >= ?2")
    List<StationRoute> getAllStationBehind(Station station, Integer order);
    
     @Query("SELECT sr FROM StationRoute sr "
            + "WHERE sr.routeId IN (SELECT sr2.routeId FROM StationRoute sr2 WHERE sr2.stationId = ?1) "
            + "AND sr.order <= ?2")
    List<StationRoute> getAllStationBefore(Station station, Integer order);

    @Query("SELECT r FROM StationRoute s JOIN s.routeId r WHERE s.stationId = ?1 AND r.isActive = 1")
    List<Route> getRouteByStationId(Station sta);

    @Query("SELECT r FROM StationRoute s JOIN s.stationId r WHERE s.routeId = ?1 AND r.isActive = 1")
    List<Station> getStationByRouteId(Route r);

    @Query("SELECT r FROM StationRoute s1 JOIN s1.routeId r "
            + "JOIN StationRoute s2 ON s2.routeId = r "
            + "WHERE s1.stationId = ?1 AND s2.stationId = ?2 AND r.isActive = 1")
    List<Route> getRouteHave2Station(Station sta1, Station sta2);

    @Query("select s from StationRoute s where s.stationId =?1 and s.routeId =?2 ")
    StationRoute getStationRouteByStation(Station sta, Route route);
    
    List<StationRoute> findStationRouteByStationId(Station sta);

//    @Query("select sta from StationRoute s join s.stationId sta where s.order =?1 and s.routeId =?2 and sta.isActive = 1")
//    Station getStationByOrder(Integer order, Route route);
}
