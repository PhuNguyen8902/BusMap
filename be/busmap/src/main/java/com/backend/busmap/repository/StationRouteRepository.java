/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
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
public interface StationRouteRepository extends JpaRepository<StationRoute, Integer> {

    List<StationRoute> findStationRouteByStationIdAndPriorityIsNotNull(Station sta);

    StationRoute findByPriorityAndRouteId(Integer o, Route r);

    List<StationRoute> findByRouteIdOrderByPriorityAsc(Route routeId);
    
    Page<StationRoute> findStationRouteByRouteId(Route routeId, Pageable a);

    Page<StationRoute> findStationRouteByStationId(Station id, Pageable a);
    
    List<StationRoute> findByStationId(Station station);

    @Query("SELECT sr FROM StationRoute sr join Station s on sr.stationId = s WHERE sr.routeId = :routeId and s.code like %:kw%")
    Page<StationRoute> getStationRouteByRouteId(String kw, Route routeId, Pageable a);
    
     @Query("SELECT sr FROM StationRoute sr join Route r on sr.routeId = r WHERE sr.stationId = :id and r.routeNum like %:kw%")
    Page<StationRoute> getStationRouteByStationId(String kw, Station id, Pageable a);

    StationRoute findByStationIdAndRouteId(Station sta, Route route);

    @Query("SELECT distinct sr FROM StationRoute sr "
            + "WHERE sr.stationId IN (SELECT sr2.stationId FROM StationRoute sr2 WHERE sr2.routeId = ?1 and sr2.priority > ?2) "
            + "and sr.routeId != ?1 and sr.priority is not null group by sr.routeId")
    List<StationRoute> getAllStationBehind(Route route, Integer priority);

    List<StationRoute> findByRouteIdAndPriorityGreaterThan(Route route, Integer priority);

    List<StationRoute> findByRouteIdAndPriorityLessThan(Route route, Integer priority);

    @Query("SELECT distinct sr FROM StationRoute sr "
            + "WHERE sr.stationId IN (SELECT sr2.stationId FROM StationRoute sr2 WHERE sr2.routeId = ?1 and sr2.priority < ?2) "
            + "and sr.routeId != ?1 and sr.priority is not null group by sr.routeId ")
    List<StationRoute> getAllStationBefore(Route route, Integer priority);

    @Query("select sr.stationId from StationRoute sr where sr.routeId = ?1 and sr.priority >= ?2 and sr.priority <= ?3 order by sr.priority")
    List<Station> getStationByRouteAndPriority(Route route, Integer o1, Integer o2);
    
}
