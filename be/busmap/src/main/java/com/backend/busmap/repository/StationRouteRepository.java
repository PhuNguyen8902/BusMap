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

    @Query(value = "SELECT  sr1.station_id "
            + "FROM bus_station.station_route sr1 "
            + "join ( "
            + "    SELECT * FROM bus_station.station_route  "
            + "    WHERE route_id = ?3 AND `order` > ?4"
            + ") sr2 ON sr1.station_id = sr2.station_id "
            + "WHERE sr1.route_id = ?1 "
            + "AND sr1.order < ?2", nativeQuery = true)
    List<Integer> getStationOf2StationRoute(Integer r1, Integer o1, Integer r2, Integer o2);

    List<StationRoute> findStationRouteByStationIdAndOrderIsNotNull(Station sta);

    @Query("SELECT distinct sr.routeId FROM StationRoute sr "
            + "WHERE sr.routeId IN (SELECT sr2.routeId FROM StationRoute sr2 WHERE sr2.stationId = ?1) "
            + "AND sr.order >= ?2")
    List<Route> getAllRouteBehindOfStation(Station station, Integer order);
    
    @Query("SELECT distinct sr.routeId FROM StationRoute sr "
            + "WHERE sr.routeId IN (SELECT sr2.routeId FROM StationRoute sr2 WHERE sr2.stationId = ?1) "
            + "AND sr.order <= ?2")
    List<Route> getAllRouteBeforeOfStation(Station station, Integer order);
    
     @Query("SELECT sr FROM StationRoute sr "
            + "WHERE sr.routeId = ?1 AND sr.order > ?2")
    List<StationRoute> getAllStationBehind(Route route, Integer order);

    @Query("SELECT sr FROM StationRoute sr "
            + "WHERE sr.routeId = ?1 AND sr.order < ?2")
    List<StationRoute> getAllStationBefore(Route route, Integer order);

    @Query("SELECT r FROM StationRoute s1 JOIN Route r on s1.routeId =  r "
            + "JOIN StationRoute s2 ON s2.routeId = r "
            + "WHERE s1.stationId = ?1  AND s2.stationId = ?2 AND r.isActive = 1")
    List<Route> getRouteHave2Station(Station sta1, Station sta2);

//    @Query("SELECT r FROM StationRoute s JOIN s.routeId r WHERE s.stationId = ?1 AND r.isActive = 1")
//    List<Route> getRouteByStationId(Station sta);
    List<Route> findByStationId(Station sta);

    @Query("SELECT r FROM StationRoute s JOIN s.stationId r WHERE s.routeId = ?1 AND r.isActive = 1")
    List<Station> getStationByRouteId(Route r);

//    @Query("SELECT s1,s2 "
//            + "FROM StationRoute s1"
//            + "JOIN StationRoute s2 ON s1.routeId = s2.routeId"
//            + "WHERE s1.order < s2.order"
//            + "  AND s1.routeId = s2.routeId"
//            + "  AND s1.id IN (list1)"
//            + "  AND s2.id IN (list2);")
//    List<StationRoute> getRouteOf2Station(List<StationRoute> sta1, List<StationRoute> sta2);
    @Query("select s from StationRoute s where s.stationId =?1 and s.routeId =?2 ")
    StationRoute getStationRouteByStation(Station sta, Route route);

//    @Query("select sta from StationRoute s join s.stationId sta where s.order =?1 and s.routeId =?2 and sta.isActive = 1")
//    Station getStationByOrder(Integer order, Route route);
}
