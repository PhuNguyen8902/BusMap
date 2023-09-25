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
        return this.stationRouteRepo.getRouteByStationId(sta);
    }

    public List<Route> getRouteHave2Station(Station sta1, Station sta2) {
        return this.stationRouteRepo.getRouteHave2Station(sta1, sta2);
    }

    public List<Station> getStationByRouteId(Route sta) {

        return this.stationRouteRepo.getStationByRouteId(sta);
    }

    public StationRoute getStationRouteByStation(Station sta, Route route) {
        return this.stationRouteRepo.getStationRouteByStation(sta, route);
    }
    
    public List<StationRoute> getAllStationLeft(Station sta,Integer order){
        return this.stationRouteRepo.getAllStationLeft(sta, order);
    }

//     public Station getStationByOrder(Integer o , Route r){
//         return this.stationRouteRepo.getStationByOrder(o, r);
//     }
}
