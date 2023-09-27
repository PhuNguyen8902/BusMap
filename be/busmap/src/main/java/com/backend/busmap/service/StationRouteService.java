/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import com.backend.busmap.repository.StationRouteRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class StationRouteService {

    @Autowired
    private StationRouteRepository stationRouteRepo;

    public List<StationRoute> getAllStationRoutes() {
        return this.stationRouteRepo.findAll();
    }

    public List<Route> getRouteByStationId(Station sta) {
        return this.stationRouteRepo.findByStationId(sta);
    }

    @Cacheable("routeHave2Station")
    public List<Route> getRouteHave2Station(Station sta1, Station sta2) {
        return this.stationRouteRepo.getRouteHave2Station(sta1, sta2);
    }

//      @Cacheable("routeOf2Station")
//    public List<StationRoute> getRouteOf2Station(List<StationRoute> sta1, List<StationRoute> sta2) {
//        return this.stationRouteRepo.getRouteOf2Station(sta1, sta2);
//    }
    public List<Station> getStationByRouteId(Route sta) {

        return this.stationRouteRepo.getStationByRouteId(sta);
    }

    public StationRoute getStationRouteByStation(Station sta, Route route) {
        return this.stationRouteRepo.getStationRouteByStation(sta, route);
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> getAllStationBehind(Route sta, Integer order) {
        return this.stationRouteRepo.getAllStationBehind(sta, order);
    }

    @Cacheable("stationRoutess")
    public List<Route> getAllRouteBeforeOfStation(Station sta, Integer order) {
        return this.stationRouteRepo.getAllRouteBeforeOfStation(sta, order);
    }

    @Cacheable("stationRoutess")
    public List<Route> getAllRouteBehindOfStation(Station sta, Integer order) {
        return this.stationRouteRepo.getAllRouteBehindOfStation(sta, order);
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> getAllStationBefore(Route sta, Integer order) {
        return this.stationRouteRepo.getAllStationBefore(sta, order);
    }

    @Cacheable("stationRoutesOfStationId")
    public List<StationRoute> findStationRouteByStationId(Station sta) {
        return this.stationRouteRepo.findStationRouteByStationIdAndOrderIsNotNull(sta);
    }

    @Cacheable("stationOf2StationRoute")
    public List<Integer> getStationOf2StationRoute(Integer r1, Integer o1, Integer r2, Integer o2) {
        return this.stationRouteRepo.getStationOf2StationRoute(r1, o1, r2, o2);
    }

//     public Station getStationByOrder(Integer o , Route r){
//         return this.stationRouteRepo.getStationByOrder(o, r);
//     }
}
