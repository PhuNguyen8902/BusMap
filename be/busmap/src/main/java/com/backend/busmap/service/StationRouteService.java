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
    
    public List<StationRoute> getAllStationRoutes(){
        return this.stationRouteRepo.findAll();
    }
    
     public List<Route> getRouteByStationId(Station sta){
//         Optional<Station> sta = this.stationService.getStationById(id);
     
        return this.stationRouteRepo.getRouteByStationId(sta);
    }
     
     public StationRoute getStationRouteByStation(Station sta,Route route)
     {
         return this.stationRouteRepo.getStationRouteByStation(sta,route);
     }
     
//     public Station getStationByOrder(Integer o , Route r){
//         return this.stationRouteRepo.getStationByOrder(o, r);
//     }
}
