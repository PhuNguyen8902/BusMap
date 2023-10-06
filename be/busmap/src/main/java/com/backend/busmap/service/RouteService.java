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
import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
     public Page<?> getAllRouteDeleted(Map<String, String> params) {
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
            routes = routeRepo.findRouteByIsActive(0, pageable);
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

        boolean checkNotActive = false;

        if (!existingRoute.isEmpty()) {
            if (existingRoute.get(0).getIsActive() == 1) {
                return false;
            } else {
                checkNotActive = true;
            }
        }

        Route routeA = new Route();
        Route routeB = new Route();

        LocalTime startLocalTimeA = LocalTime.parse(addRoute.getStartTimeA());
        LocalTime startLocalTimeB = LocalTime.parse(addRoute.getStartTimeB());

        LocalTime endLocalTimeA = LocalTime.parse(addRoute.getEndTimeA());
        LocalTime endLocalTimeB = LocalTime.parse(addRoute.getEndTimeB());

        routeA.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
        routeA.setDistance(Double.parseDouble(addRoute.getDistance()));
        routeA.setDuration(Integer.valueOf(addRoute.getDuration()));
        routeA.setStartTime(startLocalTimeA);
        routeA.setEndTime(endLocalTimeA);
        routeA.setIsActive(1);
        routeA.setRouteNum(addRoute.getRouteNum());
        routeA.setDirection("Đi đến " + addRoute.getLocationA());
        routeA.setTripSpacing(Integer.valueOf(addRoute.getTripSpacing()));

        routeB.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
        routeB.setDistance(Double.parseDouble(addRoute.getDistance()));
        routeB.setDuration(Integer.valueOf(addRoute.getDuration()));
        routeB.setStartTime(startLocalTimeB);
        routeB.setEndTime(endLocalTimeB);
        routeB.setIsActive(1);
        routeB.setRouteNum(addRoute.getRouteNum());
        routeB.setDirection("Đi đến " + addRoute.getLocationB());
        routeB.setTripSpacing(Integer.valueOf(addRoute.getTripSpacing()));

        if (checkNotActive) {
            routeA.setId(existingRoute.get(0).getId());
            routeB.setId(existingRoute.get(1).getId());
            Route newRouteA = routeRepo.save(routeA);
            Route newRouteB = routeRepo.save(routeB);
            if (newRouteA != null && newRouteB != null) {
                return updateRouteAboutTime(routeA, routeB);
            }
            return true;
        } else {
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
//        return false;
    }

    public boolean updateRoute(EditRoute route) {

        Integer id1 = Integer.valueOf(route.getId());
        Double distance = Double.valueOf(route.getDistance());
        Integer duration = Integer.valueOf(route.getDuration());
        Integer tripSpace = Integer.valueOf(route.getTripSpacing());
        LocalTime startTime = LocalTime.parse(route.getStartTime());
        LocalTime endTime = LocalTime.parse(route.getEndTime());
        Instant startinstant = startTime.atDate(java.time.LocalDate.now()).atZone(java.time.ZoneId.systemDefault()).toInstant();
        Instant endinstant = endTime.atDate(java.time.LocalDate.now()).atZone(java.time.ZoneId.systemDefault()).toInstant();
        long startTimeLong = startinstant.getEpochSecond();
        long endTimeLong = endinstant.getEpochSecond();

        Route route1 = routeRepo.findById(id1).orElse(null);

        Instant startRoute1instant = route1.getStartTime().atDate(java.time.LocalDate.now()).atZone(java.time.ZoneId.systemDefault()).toInstant();
        Instant endRoute1instant = route1.getEndTime().atDate(java.time.LocalDate.now()).atZone(java.time.ZoneId.systemDefault()).toInstant();

        long startTimeRoute1Long = startRoute1instant.getEpochSecond();
        long endTimeRoute1Long = endRoute1instant.getEpochSecond();

        if (route1.getDistance() != distance || !Objects.equals(route1.getDuration(), duration) || !Objects.equals(route1.getTripSpacing(), tripSpace)) {
            Route route2 = routeRepo.getRemainingRoute(route1.getRouteNum(), route1.getId());

            route1.setDistance(distance);
            route1.setDuration(duration);
            route1.setTripSpacing(tripSpace);
            route1.setStartTime(startTime);
            route1.setEndTime(endTime);

            route2.setDistance(distance);
            route2.setDuration(duration);
            route2.setTripSpacing(tripSpace);

            Route newRouteA = routeRepo.save(route1);
            Route newRouteB = routeRepo.save(route2);
            if (newRouteA != null && newRouteB != null) {
                return updateRouteAboutTime(route1, route2);
            } else {
                return false;
            }
        } else if (startTimeLong != startTimeRoute1Long || endTimeLong != endTimeRoute1Long) {
            route1.setDistance(distance);
            route1.setDuration(duration);
            route1.setTripSpacing(tripSpace);
            route1.setStartTime(startTime);
            route1.setEndTime(endTime);

            Route newRouteA = routeRepo.save(route1);
            if (newRouteA != null) {
                return updateRouteAboutTime(route1, null);
            } else {
                return false;
            }
        }
        return true;
    }

    public Route getRemainingRoute(String routeNum, Integer id) {
        return routeRepo.getRemainingRoute(routeNum, id);
    }

    private boolean updateRouteAboutTime(Route routeA, Route routeB) {
        if (routeB == null) {
            List<Trip> tripsA = tripSer.getTripByRoute(routeA);
            if (!tripsA.isEmpty()) {
                tripSer.deleteAllTripByRoute(routeA);
            }
            boolean rsA = tripSer.addTripsForRoute(routeA);
            return rsA;
        }
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
     public boolean activeRoute(Integer id) {
        Route route = routeRepo.findById(id).orElseThrow(null);
        String routeNum = route.getRouteNum();
        List<Route> routes = routeRepo.findRouteByRouteNum(routeNum);

        if (!routes.isEmpty()) {
            for (Route r : routes) {
                r.setIsActive(1);
                routeRepo.save(r);
            }
            return true;
        }
        return false;
    }
}
