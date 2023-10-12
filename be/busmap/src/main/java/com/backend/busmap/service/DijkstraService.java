///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.backend.busmap.service;
//
//import com.backend.busmap.dto.response.StationDistance;
//import com.backend.busmap.dto.response.StationRouteMiddle;
//import com.backend.busmap.models.Route;
//import com.backend.busmap.models.Station;
//import com.backend.busmap.models.StationRoute;
//import com.backend.busmap.repository.StationRepository;
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cache.annotation.Cacheable;
//import org.springframework.data.util.Pair;
//import org.springframework.stereotype.Service;
//
///**
// *
// * @author ADMIN
// */
//@Service
//public class DijkstraService {
//    
//    @Autowired
//    private StationRepository stationRepository;
//    
//   @Autowired
//    private StationRouteService stationRouteService;
//    
//    
//     @Cacheable("stationDistance")
//    public List<StationDistance> findNearestStations(Double latitude, Double longitude) {
//        List<Station> allStations = this.stationRepository.getStationNearAdd(latitude, longitude);
//                
//
//        List<StationDistance> stationDistances = new ArrayList<>();
//        
//        for (Station station : allStations) {
//            double distance = calculateDistance(latitude, longitude, station.getLatitude(), station.getLongitude());
//            if (distance <= 3) {
//                List<StationRoute> staList = stationRouteService.findStationRouteByStationId(station);
//                for (StationRoute s : staList) {
//                    StationDistance stationDistance = new StationDistance();
//                    stationDistance.setStationRoute(s);
//                    stationDistance.setDistance(distance);
//                    stationDistances.add(stationDistance);
//                }
//            }
//        }
//
//        stationDistances.sort(Comparator.comparingDouble(StationDistance::getDistance));
//
//        List<StationDistance> stationNotDuplicates = new ArrayList<>();
//        Set<Route> routeIdsSeen = new HashSet<>();
//
//        for (StationDistance stationDistance : stationDistances) {
//            Route routeId = stationDistance.getStationRoute().getRouteId();
//
//            if (!routeIdsSeen.contains(routeId)) {
//                routeIdsSeen.add(routeId);
//                stationNotDuplicates.add(stationDistance);
//            }
//        }
//        return stationNotDuplicates;
//    }
//    
//
//    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
//
//        double R = 6371;
//        double dLat = Math.toRadians(lat2 - lat1);
//        double dLon = Math.toRadians(lon2 - lon1);
//        double dLat1 = Math.toRadians(lat1);
//        double dLat2 = Math.toRadians(lat2);
//
//        //https://en.wikipedia.org/wiki/Haversine_formula
//        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
//                + Math.cos(dLat1) * Math.cos(dLat2)
//                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//
//        double c = 2 * Math.asin(Math.sqrt(a));
//
//        return R * c;
//    }
//    
//      public List<StationRouteMiddle> getNearestStationsFor1Route(double la1, double lo1, double la2, double lo2) {
//        List<StationDistance> list1 = findNearestStations(la1, lo1);
//        List<StationDistance> list2 = findNearestStations(la2, lo2);
//        List<StationRouteMiddle> list = resultFor1Route(list1, list2);
//        return list;
//    }
//      
//        @Cacheable("resultFor1Route")
//    public List<StationRouteMiddle> resultFor1Route(List<StationDistance> list1, List<StationDistance> list2) {
//        List<StationRouteMiddle> list = new ArrayList<>();
//
//        for (StationDistance station1 : list1) {
//            for (StationDistance station2 : list2) {
//                Integer route1Id = station1.getStationRoute().getRouteId().getId();
//                Integer route2Id = station2.getStationRoute().getRouteId().getId();
//                Integer priority1 = station1.getStationRoute().getPriority();
//                Integer priority2 = station2.getStationRoute().getPriority();
//
//                if (route1Id.intValue() == route2Id.intValue() && priority1 < priority2) {
//                    StationRouteMiddle s = new StationRouteMiddle();
//                    Double dis = station1.getDistance() + station2.getDistance();
//                    Double d = distanceOfRoute(station1.getStationRoute().getRouteId(), station1.getStationRoute().getPriority(),
//                            station2.getStationRoute().getPriority());
//                    s.setDistance(dis + d);
//                    s.setStartStation(station1);
//                    s.setEndStation(station2);
//                    list.add(s);
//                }
//
//            }
//        }
//    
//}
