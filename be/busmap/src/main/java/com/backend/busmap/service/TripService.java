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
import org.springframework.beans.factory.annotation.Autowired;
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

    public void deleteAllTripByRoute(Route r) {
        List<Trip> trips = getTripByRoute(r);
        for (Trip t : trips) {
            tripRepo.deleteById(t.getId());
        }
    }

    public boolean addNewTrip(AddTrip addTrip) {
        LocalTime startTime = LocalTime.parse(addTrip.getStartTime());

        Trip trip = new Trip();
        Route route = routeRepo.findById(addTrip.getRouteId()).orElseThrow(null);
        trip.setStartTime(startTime);
        trip.setRouteId(route);
        tripRepo.save(trip);
        return true;
    }

    public boolean editTrip(AddTrip addTrip) {
        LocalTime startTime = LocalTime.parse(addTrip.getStartTime());

        Trip trip = new Trip();
        Route route = routeRepo.findById(addTrip.getRouteId()).orElseThrow(null);
        trip.setId(addTrip.getId());
        trip.setStartTime(startTime);
        trip.setRouteId(route);
        tripRepo.save(trip);
        return true;
    }

    public boolean deleteTrip(Integer id) {
        tripRepo.deleteById(id);
        return true;
    }
}
