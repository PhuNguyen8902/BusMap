/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddTrip;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Trip;
import com.backend.busmap.repository.RouteRepository;
import com.backend.busmap.repository.TripRepository;
import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
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
public class TripService {

    @Autowired
    private TripRepository tripRepo;

    @Autowired
    private RouteRepository routeRepo;

    public boolean addTripsForRoute(Route route) {

        Duration tripSpacing = Duration.ofMinutes(route.getTripSpacing());
        Duration timeGap = Duration.between(route.getStartTime(), route.getEndTime());
        long numberOfTrips = timeGap.toMinutes() / tripSpacing.toMinutes();

        try {
            LocalTime routeStartTime = route.getStartTime();

            for (int i = 0; i <= numberOfTrips; i++) {
                Trip trip = new Trip();
                trip.setStartTime(routeStartTime);
                trip.setRouteId(route);
                tripRepo.save(trip);

                routeStartTime = routeStartTime.plus(tripSpacing);
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Trip> getTripByRoute(Route r) {
        return tripRepo.findAllByRouteId(r);
    }

    public Page<?> getTripByRouteId(Integer id, Map<String, String> params) {

        Pageable pageable = null;
        Page<Trip> trips = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            Route r = routeRepo.findById(id).orElse(null);

            trips = tripRepo.findAllByRouteId(r, pageable);
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return trips;
//     
//     Route r = routeRepo.findById(id).orElse(null);
//        return tripRepo.findAllByRouteId(r);
    }

    public void deleteAllTripByRoute(Route r) {
        List<Trip> trips = getTripByRoute(r);
        for (Trip t : trips) {
            tripRepo.deleteById(t.getId());
        }
    }

    public String addNewTrip(AddTrip addTrip) {
        LocalTime startTime = LocalTime.parse(addTrip.getStartTime());

        Integer routeId = Integer.valueOf(addTrip.getRouteId());

        Trip trip = new Trip();
        Route route = routeRepo.findById(routeId).orElseThrow(null);
        trip.setStartTime(startTime);
        trip.setRouteId(route);
        tripRepo.save(trip);
        return "Add Successfully";
    }

    public String editTrip(AddTrip addTrip) {
        LocalTime startTime = LocalTime.parse(addTrip.getStartTime());
        Integer routeId = Integer.valueOf(addTrip.getRouteId());

        Trip trip = new Trip();
        Route route = routeRepo.findById(routeId).orElseThrow(null);
        trip.setId(Integer.valueOf(addTrip.getId()));
        trip.setStartTime(startTime);
        trip.setRouteId(route);
        tripRepo.save(trip);
        return "Update Successfully";

    }

    public String deleteTrip(Integer id) {
        tripRepo.deleteById(id);
        return "Delete Successfully";

    }
}
