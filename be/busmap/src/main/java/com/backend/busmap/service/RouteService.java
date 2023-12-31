/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddRoute;
import com.backend.busmap.dto.request.EditRoute;
//import com.backend.busmap.dto.response.AllRoute;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Trip;
import com.backend.busmap.repository.RouteRepository;
import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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

    @Autowired
    private StationRouteService stationRouteSer;

      public List<Route> getAllRoute() {
        return this.routeRepo.findRouteByIsActive();
    }
    
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

            if (params.get("kw") == "") {
                routes = routeRepo.findRouteByIsActive(pageable);

            } else {
                routes = routeRepo.findRouteByIsActive(params.get("kw"), pageable);
            }
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return routes;
    }

    public List<Route> getAllOneWayRoute(String name) {
        return this.routeRepo.findAllOneWayRoute(name);
    }
    public List<Route> getRouteByRouteNum(String routeNum) {
        return this.routeRepo.findRouteByRouteNum(routeNum);
    }

    public Route getRouteById(Integer routeId) {
        return this.routeRepo.findRouteById(routeId);
    }

    public String addNewRoute(AddRoute addRoute) {

        List<Route> existingRoute = routeRepo.findRouteByRouteNum(addRoute.getRouteNum());

        boolean checkNotActive = false;

        if (!existingRoute.isEmpty()) {
            if (existingRoute.get(0).getIsActive() == 1) {
                return "The route already exists and is operational";
            } else {
                checkNotActive = true;
            }
        }

        Route routeA = new Route();
        Route routeB = new Route();

        LocalTime startLocalTimeA = null;
        LocalTime startLocalTimeB = null;
        LocalTime endLocalTimeA = null;
        LocalTime endLocalTimeB = null;

        try {
            startLocalTimeA = LocalTime.parse(addRoute.getStartTimeA());
            startLocalTimeB = LocalTime.parse(addRoute.getStartTimeB());

            endLocalTimeA = LocalTime.parse(addRoute.getEndTimeA());
            endLocalTimeB = LocalTime.parse(addRoute.getEndTimeB());
        } catch (DateTimeParseException e) {
            return "Invalid time format";
        }

        Double distance = 0.0;
        Integer duration = 0;
        Integer tripSpacing = 0;
        try {
            distance = Double.valueOf(addRoute.getDistance());
            duration = Integer.valueOf(addRoute.getDuration());
            tripSpacing = Integer.valueOf(addRoute.getTripSpacing());
        } catch (NumberFormatException e) {
            return "Invalid number format";
        }

        routeA.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
        routeA.setDistance(distance);
        routeA.setDuration(duration);
        routeA.setStartTime(startLocalTimeA);
        routeA.setEndTime(endLocalTimeA);
        routeA.setIsActive(1);
        routeA.setRouteNum(addRoute.getRouteNum());
        routeA.setDirection("Đi đến " + addRoute.getLocationB());
        routeA.setTripSpacing(tripSpacing);

        routeB.setName(addRoute.getLocationA() + " - " + addRoute.getLocationB());
        routeB.setDistance(distance);
        routeB.setDuration(duration);
        routeB.setStartTime(startLocalTimeB);
        routeB.setEndTime(endLocalTimeB);
        routeB.setIsActive(1);
        routeB.setRouteNum(addRoute.getRouteNum());
        routeB.setDirection("Đi đến " + addRoute.getLocationA());
        routeB.setTripSpacing(tripSpacing);

        if (checkNotActive) {
            routeA.setId(existingRoute.get(0).getId());
            routeB.setId(existingRoute.get(1).getId());
            Route newRouteA = routeRepo.save(routeA);
            Route newRouteB = routeRepo.save(routeB);
            if (newRouteA != null && newRouteB != null) {
                boolean rs = updateRouteAboutTime(routeA, routeB);
                if (rs) {
                    return "Add Successfully";
                }
                return "Add UnSuccessfully";
            } else {
                routeRepo.delete(routeA);
                routeRepo.delete(routeB);
                return "Add UnSuccessfully";
            }
        } else {
            Route newRouteA = routeRepo.save(routeA);
            Route newRouteB = routeRepo.save(routeB);

            if (newRouteA != null && newRouteB != null) {
                boolean rsA = tripSer.addTripsForRoute(routeA);
                boolean rsB = tripSer.addTripsForRoute(routeB);

                if (rsA == false || rsB == false) {
                    routeRepo.delete(routeA);
                    routeRepo.delete(routeB);
                    return "Add UnSuccessfully";

                }
                return "Add Successfully";

            }
            return "Add UnSuccessfully";

        }
//        return false;
    }

    public String updateRoute(EditRoute route) {

        LocalTime startTime = null;
        LocalTime endTime = null;

        try {
            startTime = LocalTime.parse(route.getStartTime());
            endTime = LocalTime.parse(route.getEndTime());

        } catch (DateTimeParseException e) {
            return "Invalid time format";
        }
        
         Double distance = 0.0;
        Integer duration = 0;
        Integer tripSpace = 0;
        try {
            distance = Double.valueOf(route.getDistance());
            duration = Integer.valueOf(route.getDuration());
            tripSpace = Integer.valueOf(route.getTripSpacing());
        } catch (NumberFormatException e) {
            return "Invalid number format";
        }

        Integer id1 = Integer.valueOf(route.getId());
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
                boolean rs = updateRouteAboutTime(route1, route2);
                if (rs) {
                    return "Update Successfully";
                }
                return "Update UnSuccessfully";
            } else {
                return "Update UnSuccessfully";

            }
        } else if (startTimeLong != startTimeRoute1Long || endTimeLong != endTimeRoute1Long) {
            route1.setDistance(distance);
            route1.setDuration(duration);
            route1.setTripSpacing(tripSpace);
            route1.setStartTime(startTime);
            route1.setEndTime(endTime);

            Route newRouteA = routeRepo.save(route1);
            if (newRouteA != null) {
                boolean rs = updateRouteAboutTime(route1, null);
                if (rs) {
                    return "Update Successfully";
                }
                return "Update UnSuccessfully";
            } else {
                return "Update UnSuccessfully";

            }
        }
        return "Update Successfully";
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

    public String deleteRoute(Integer id) {
        Route route = routeRepo.findById(id).orElseThrow(null);
        String routeNum = route.getRouteNum();
        List<Route> routes = routeRepo.findRouteByRouteNum(routeNum);

        if (!routes.isEmpty()) {
            for (Route r : routes) {
                r.setIsActive(0);
                routeRepo.save(r);
                tripSer.deleteAllTripByRoute(r);
                stationRouteSer.deleteAllStationRouteByRoute(r);
            }
            return "Delete Successfully";
        }
        return "Delete UnSuccessfully";
    }

}
