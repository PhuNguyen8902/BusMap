/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Trip;
import com.backend.busmap.repository.RouteRepository;
import java.time.LocalTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepo;

    @Autowired
    private TripService tripSer;

    public List<Route> getAllRoute() {
        return this.routeRepo.findAll();
    }

    public boolean addNewRoute(AddRoute addRoute) {

        List<Route> existingRoute = routeRepo.findRouteByRouteNum(addRoute.getRouteNum());

        if (existingRoute.isEmpty()) {
            return false;
        }

        Route routeA = new Route();
        Route routeB = new Route();

        LocalTime startLocalTimeA = LocalTime.parse(addRoute.getStartTimeA());
        LocalTime startLocalTimeB = LocalTime.parse(addRoute.getStartTimeB());

        LocalTime endLocalTimeA = LocalTime.parse(addRoute.getEndTimeA());
        LocalTime endLocalTimeB = LocalTime.parse(addRoute.getEndTimeB());

        routeA.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
        routeA.setDistance(addRoute.getDistance());
        routeA.setDuration(addRoute.getDuration());
        routeA.setStartTime(startLocalTimeA);
        routeA.setEndTime(endLocalTimeA);
        routeA.setIsActive(1);
        routeA.setRouteNum(addRoute.getRouteNum());
        routeA.setDirection("Đi đến " + addRoute.getLocationA());

        routeB.setName(addRoute.getLocationA() + "-" + addRoute.getLocationB());
        routeB.setDistance(addRoute.getDistance());
        routeB.setDuration(addRoute.getDuration());
        routeB.setStartTime(startLocalTimeB);
        routeB.setEndTime(endLocalTimeB);
        routeB.setIsActive(1);
        routeB.setRouteNum(addRoute.getRouteNum());
        routeB.setDirection("Đi đến " + addRoute.getLocationB());

        Route newRouteA = routeRepo.save(routeA);
        Route newRouteB = routeRepo.save(routeB);

        if (newRouteA != null && newRouteB != null) {
            boolean rsA = tripSer.addTripsForRoute(routeA);
            boolean rsB = tripSer.addTripsForRoute(routeB);

            if (rsA == false || rsB == false) {
                routeRepo.delete(routeA);
                routeRepo.delete(routeB);
                return false;
            }
            return true;
        }
        return false;
    }

    public boolean updateRoute(AddRoute addRoute) {
        Route routeA = routeRepo.findById(addRoute.getIdA()).orElseThrow(null);
        Route routeB = routeRepo.findById(addRoute.getIdB()).orElseThrow(null);

        LocalTime startLocalTimeA = LocalTime.parse(addRoute.getStartTimeA());
        LocalTime startLocalTimeB = LocalTime.parse(addRoute.getStartTimeB());

        LocalTime endLocalTimeA = LocalTime.parse(addRoute.getEndTimeA());
        LocalTime endLocalTimeB = LocalTime.parse(addRoute.getEndTimeB());

        routeA.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
        routeA.setDistance(addRoute.getDistance());
        routeA.setDuration(addRoute.getDuration());
        routeA.setStartTime(startLocalTimeA);
        routeA.setEndTime(endLocalTimeA);
        routeA.setRouteNum(addRoute.getRouteNum());
        routeA.setDirection("Đi đến " + addRoute.getLocationA());

        routeB.setName(addRoute.getLocationA() + "-" + addRoute.getLocationB());
        routeB.setDistance(addRoute.getDistance());
        routeB.setDuration(addRoute.getDuration());
        routeB.setStartTime(startLocalTimeB);
        routeB.setEndTime(endLocalTimeB);
        routeB.setRouteNum(addRoute.getRouteNum());
        routeB.setDirection("Đi đến " + addRoute.getLocationB());

        Route newRouteA = routeRepo.save(routeA);
        Route newRouteB = routeRepo.save(routeB);

        if (newRouteA != null && newRouteB != null) {
            List<Trip> tripsA = tripSer.getTripByRoute(routeA);
            List<Trip> tripsB = tripSer.getTripByRoute(routeB);
            if (!tripsA.isEmpty()) {
                tripSer.deleteAllTripByRoute(routeA);
            }
            if (!tripsB.isEmpty()) {
                tripSer.deleteAllTripByRoute(routeB);
            }

            boolean rsA = tripSer.addTripsForRoute(routeA);

            boolean rsB = tripSer.addTripsForRoute(routeB);
            return true;
        }
        return false;
    }
    
    public boolean deleteRoute(Integer id){
        Route route = routeRepo.findById(id).orElseThrow(null);
        String routeNum = route.getRouteNum();
        List<Route> routes = routeRepo.findRouteByRouteNum(routeNum);
        
        if(!routes.isEmpty()){
            for(Route r : routes){
                r.setIsActive(0);
                routeRepo.save(r);
            }
            return true;
        }
        return false;
    }
}
