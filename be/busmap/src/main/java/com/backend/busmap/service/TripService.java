/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.Trip;
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

    public boolean addTripsForRoute(Route route) {

        Duration tripDuration = Duration.ofMinutes(route.getDuration());
        Duration timeGap = Duration.between(route.getStartTime(), route.getEndTime());
        long numberOfTrips = timeGap.toMinutes() / tripDuration.toMinutes();

        try {
            LocalTime routeStartTime = route.getStartTime();

            for (int i = 0; i <= numberOfTrips; i++) {
                Trip trip = new Trip();
                trip.setStartTime(routeStartTime);
                trip.setRouteId(route);
                tripRepo.save(trip);

                routeStartTime = routeStartTime.plus(tripDuration);
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
}
