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

    List<StationRoute> findStationRouteByStationIdAndOrderIsNotNull(Station sta);
    
    StationRoute findByStationIdAndRouteId(Station sta,Route route);

    @Query("SELECT distinct sr FROM StationRoute sr "
            + "WHERE sr.stationId IN (SELECT sr2.stationId FROM StationRoute sr2 WHERE sr2.routeId = ?1 and sr2.order > ?2) "
            + "and sr.routeId != ?1 and sr.order is not null group by sr.routeId")
    List<StationRoute> getAllStationBehind(Route route, Integer order);

    @Query("SELECT distinct sr FROM StationRoute sr "
            + "WHERE sr.stationId IN (SELECT sr2.stationId FROM StationRoute sr2 WHERE sr2.routeId = ?1 and sr2.order < ?2) "
            + "and sr.routeId != ?1 and sr.order is not null group by sr.routeId ")
    List<StationRoute> getAllStationBefore(Route route, Integer order);

    @Query("select sr.stationId from StationRoute sr where sr.routeId = ?1 and sr.order >= ?2 and sr.order <= ?3 ")
    List<Station> getStationByRouteAndOrder(Route route,Integer o1, Integer o2);
}
