/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.dto.request.EditRoute;
import com.backend.busmap.dto.response.AllRoute;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Trip;
import com.backend.busmap.repository.RouteRepository;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page<?> getAllRoute(Map<String, String> params) {
        Pageable pageable = null;
        Page<Route> routes = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            routes = routeRepo.findRouteByIsActive(1, pageable);
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return routes;
    }

    public List<Route> getAllOneWayRoute(String name) {
        return this.routeRepo.findAllOneWayRoute(name);
    }

    public boolean addNewRoute(AddRoute addRoute) {

        List<Route> existingRoute = routeRepo.findRouteByRouteNum(addRoute.getRouteNum());

        if (!existingRoute.isEmpty()) {
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

//    public boolean updateRoute(EditRoute addRoute) {
//        Route routeA = routeRepo.findById(addRoute.getIdA()).orElseThrow(null);
//        Route routeB = routeRepo.findById(addRoute.getIdB()).orElseThrow(null);
//
//        LocalTime startLocalTimeA = LocalTime.parse(addRoute.getStartTimeA());
//        LocalTime startLocalTimeB = LocalTime.parse(addRoute.getStartTimeB());
//
//        LocalTime endLocalTimeA = LocalTime.parse(addRoute.getEndTimeA());
//        LocalTime endLocalTimeB = LocalTime.parse(addRoute.getEndTimeB());
//
//        boolean rsCheckChangeTime = false;
//        if (!Objects.equals(routeA.getTripSpacing(), addRoute.getTripSpacing()) || routeA.getStartTime() != startLocalTimeA
//                || routeA.getEndTime() != endLocalTimeA || routeB.getStartTime() != startLocalTimeB
//                || routeB.getEndTime() != endLocalTimeB) {
//            rsCheckChangeTime = true;
//        }
//        routeA.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
//        routeA.setDistance(addRoute.getDistance());
//        routeA.setDuration(addRoute.getDuration());
//        routeA.setStartTime(startLocalTimeA);
//        routeA.setEndTime(endLocalTimeA);
//        routeA.setRouteNum(addRoute.getRouteNum());
//        routeA.setDirection("Đi đến " + addRoute.getLocationA());
//        routeA.setTripSpacing(addRoute.getTripSpacing());
//
//        routeB.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
//        routeB.setDistance(addRoute.getDistance());
//        routeB.setDuration(addRoute.getDuration());
//        routeB.setStartTime(startLocalTimeB);
//        routeB.setEndTime(endLocalTimeB);
//        routeB.setRouteNum(addRoute.getRouteNum());
//        routeB.setDirection("Đi đến " + addRoute.getLocationB());
//        routeB.setTripSpacing(addRoute.getTripSpacing());
//
//        Route newRouteA = routeRepo.save(routeA);
//        Route newRouteB = routeRepo.save(routeB);
//
//        if (newRouteA != null && newRouteB != null) {
//            if (rsCheckChangeTime) {
//                return updateRouteAboutTime(routeA, routeB);
//            } else {
//                return true;
//            }
//        }
//        return false;
//    }

    private boolean updateRouteAboutTime(Route routeA, Route routeB) {
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
        return rsA && rsB;
    }

    public boolean deleteRoute(Integer id) {
        Route route = routeRepo.findById(id).orElseThrow(null);
        String routeNum = route.getRouteNum();
        List<Route> routes = routeRepo.findRouteByRouteNum(routeNum);

        if (!routes.isEmpty()) {
            for (Route r : routes) {
                r.setIsActive(0);
                routeRepo.save(r);
            }
            return true;
        }
        return false;
    }
}
