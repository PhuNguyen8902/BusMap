/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import com.backend.busmap.repository.RouteRepository;
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
    
    @Autowired
    private RouteRepository routeRepo;

    public List<StationRoute> getAllStationRoutes() {
        return this.stationRouteRepo.findAll();
    }
    
    
    public List<StationRoute> getStationRouteByRouteId(Integer routeId){
        Route route = this.routeRepo.findById(routeId).orElse(null);
        
        return this.stationRouteRepo.findByRouteId(route);
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> getAllStationBehind(Route sta, Integer order) {
        return this.stationRouteRepo.getAllStationBehind(sta, order);
    }
     @Cacheable("stationRoutes")
    public List<StationRoute> findByRouteIdAndGreaterThanOrder(Route sta, Integer order) {
        return this.stationRouteRepo.findByRouteIdAndOrderGreaterThan(sta, order);
    }
    
    @Cacheable("stationRoutes")
    public List<StationRoute> findByRouteIdAndLessThanOrder(Route sta, Integer order) {
        return this.stationRouteRepo.findByRouteIdAndOrderLessThan(sta, order);
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> getAllStationBefore(Route sta, Integer order) {
        return this.stationRouteRepo.getAllStationBefore(sta, order);
    }

    @Cacheable("stationRoutesOfStationId")
    public List<StationRoute> findStationRouteByStationId(Station sta) {
        return this.stationRouteRepo.findStationRouteByStationIdAndOrderIsNotNull(sta);
    }

    @Cacheable("station")
    public List<Station> getStationByRouteAndOrder (Route r,Integer o1,Integer o2){
        return this.stationRouteRepo.getStationByRouteAndOrder(r, o1, o2);
    }
    
    @Cacheable("stationRoute")
    public StationRoute findByStationIdAndRouteId(Station s , Route r){
        return this.stationRouteRepo.findByStationIdAndRouteId(s, r);
    }
}
