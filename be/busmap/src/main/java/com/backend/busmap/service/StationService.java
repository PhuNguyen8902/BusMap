/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.response.Station3Route;
import com.backend.busmap.dto.response.StationDistance;
import com.backend.busmap.dto.response.StationRouteMiddle;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import com.backend.busmap.repository.StationRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private StationRouteService stationRouteService;

    public List<Station> getAllStation() {
        return this.stationRepository.findAll();
    }

    public Optional<Station> getStationById(Integer id) {
        return this.stationRepository.findById(id);
    }

//    public List<StationDistance> findNearestStations(Double latitude, Double longitude) {
//        List<Station> allStations = stationRepository.findAll();
//
//        // Tính khoảng cách và lưu vào một danh sách tạm thời
//        List<StationDistance> stationDistances = new ArrayList<>();
////        List<Route> routeDuplicate = new ArrayList<>();
//        for (Station station : allStations) {
//            List<Route> route = new ArrayList<>();
////            List<Route> routesToRemove = new ArrayList<>();
//            route = this.stationRouteService.getRouteByStationId(station);
//            double distance = calculateDistance(latitude, longitude, station.getLatitude(), station.getLongitude());
////            stationDistances.add(new StationDistance(station, distance));
//            if (distance <= 5) {
//                stationDistances.add(new StationDistance(station, route, distance));
//            }
////                boolean isDuplicate = false;
////                for (Route r : route) {
////                    if (routeDuplicate.contains(r)) {
////                        isDuplicate = true;
//////                        break;
////                          routesToRemove.add(r);
////                    } else {
////                        routeDuplicate.add(r);
////                    }
////                }
////                                      route.removeAll(routesToRemove);
////
////                if (!isDuplicate) {
////                    double distance = calculateDistance(latitude, longitude, station.getLatitude(), station.getLongitude());
////                    stationDistances.add(new StationDistance(station, route, distance));
////                }
//        }
//
//        // Sắp xếp danh sách khoảng cách tăng dần
//        stationDistances.sort(Comparator.comparingDouble(StationDistance::getDistance));
//
//        // Lấy ra các trạm gần nhất dựa trên giới hạn
////        List<StationDistance> nearestStations = new ArrayList<>();
////        for (int i = 0; i < Math.min(limit, stationDistances.size()); i++) {
////            nearestStations.add(stationDistances.get(i));
////        }
//        return stationDistances;
//    }
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {

        // Đây là một ví dụ sử dụng haversine:
        double R = 6371; // Bán kính trái đất (đơn vị kilômét)
        double dLat = Math.toRadians(lat2 - lat1);  // Randian sự khác biệt 2 lat
        double dLon = Math.toRadians(lon2 - lon1);  // Randian sự khác biệt 2 lon
        double dLat1 = Math.toRadians(lat1);    // Randian lat1
        double dLat2 = Math.toRadians(lat2);    // Randian lat2

        //https://en.wikipedia.org/wiki/Haversine_formula
        // sin^2(dLat/2) + cos(dLat1) + cos(dLat2) * sin^2(dLon)
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(dLat1) * Math.cos(dLat2)
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        // 2 * arcsin( căn(a))
        // 2 * arctan^-1( căn(a) , căn(1-a) )
//        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double c = 2 * Math.asin(Math.sqrt(a));

        return R * c;
    }

    public List<Station> findStationsOnRoutes(Integer route1, Integer route2) {
        return this.stationRepository.findStationsOnRoutes(route1, route2);
    }

    public List<StationDistance> findNearestStations(Double latitude, Double longitude) {
        List<Station> allStations = this.stationRepository.getStationNearAdd(latitude, longitude);

        List<StationDistance> stationDistances = new ArrayList<>();
//        List<Route> routeDuplicate = new ArrayList<>();
        for (Station station : allStations) {
//            List<Route> route = new ArrayList<>();
//            List<Route> routesToRemove = new ArrayList<>();
            double distance = calculateDistance(latitude, longitude, station.getLatitude(), station.getLongitude());
//            stationDistances.add(new StationDistance(station, distance));
            if (distance <= 2) {
                List<StationRoute> staList = stationRouteService.findStationRouteByStationId(station);
                for (StationRoute s : staList) {
                    StationDistance stationDistance = new StationDistance();
                    stationDistance.setStationRoute(s);
                    stationDistance.setDistance(distance);
                    stationDistances.add(stationDistance);
                }
//                route = this.stationRouteService.getRouteByStationId(station);
//                for (Route r : route) {
//                    StationRoute stationRoute = this.stationRouteService.getStationRouteByStation(station, r);
//                    stationDistances.add(new StationDistance(stationRoute, distance));
//                }
            }
        }

        stationDistances.sort(Comparator.comparingDouble(StationDistance::getDistance));

        List<StationDistance> stationNotDuplicates = new ArrayList<>();
        Set<Route> routeIdsSeen = new HashSet<>();

        for (StationDistance stationDistance : stationDistances) {
            Route routeId = stationDistance.getStationRoute().getRouteId();

            if (!routeIdsSeen.contains(routeId)) {
                routeIdsSeen.add(routeId);
                stationNotDuplicates.add(stationDistance);
            }
        }
        return stationNotDuplicates;
    }

//    public List<StationRouteMiddle> stationMid(List<StationDistance> list1, List<StationDistance> list2) {
//        List<StationRouteMiddle> list = new ArrayList<>();
//
//        for (StationDistance station1 : list1) {
//            for (StationDistance station2 : list2) {
//                Route route1 = station1.getStationRoute().getRouteId();
//                Route route2 = station2.getStationRoute().getRouteId();
//                if (route1 == route2) {
//                    break;
//                }
//                List<Station> listSta = this.stationRepository.findStationsOnRoutes(route1.getId(),
//                        route2.getId());
//                if (!listSta.isEmpty()) {
//                    Station s = listSta.get(0);
//                    StationRoute stStart = this.stationRouteService.getStationRouteByStation(s, route1);
//                    StationRoute stEnd = this.stationRouteService.getStationRouteByStation(s, route2);
//                    Integer orderStart = station1.getStationRoute().getOrder();
//                    Integer orderEnd = station2.getStationRoute().getOrder();
//                    Integer order1 = stStart.getOrder();
//                    Integer order2 = stEnd.getOrder();
//                    if (orderStart != null && orderEnd != null && order1 != null && order2 != null) {
//                        if (orderStart < order1 & orderEnd > order2) {
//                            list.add(new StationRouteMiddle(station1, s, station2));
//                        }
//                    }
//                }
//            }
//        }
//
//        return list;
//    }
//    public List<StationRouteMiddle> resultFor1Route(List<StationDistance> list1, List<StationDistance> list2) {
//        List<StationRouteMiddle> list = new ArrayList<>();
//
//        for (StationDistance station1 : list1) {
//            for (StationDistance station2 : list2) {
//                Route route1 = station1.getStationRoute().getRouteId();
//                Route route2 = station2.getStationRoute().getRouteId();
//                Integer order1 = station1.getStationRoute().getOrder();
//                Integer order2 = station2.getStationRoute().getOrder();
//
//                if (route1 == route2 && order1 < order2) {
//                    StationRouteMiddle s = new StationRouteMiddle();
//                    s.setStartStation(station1);
//                    s.setEndStation(station2);
//                    list.add(s);
//                }
//
//            }
//        }
//
//        return list;
//    }
    public List<StationRouteMiddle> resultFor1Route(List<StationDistance> list1, List<StationDistance> list2) {
        List<StationRouteMiddle> list = new ArrayList<>();

        for (StationDistance station1 : list1) {
            List<StationRoute> stationRoute1 = stationRouteService.getAllStationBehind(station1.getStationRoute().getStationId(),
                    station1.getStationRoute().getOrder());
            for (StationRoute s : stationRoute1) {
                for (StationDistance station2 : list2) {
                    if (s == station2.getStationRoute()) {
                        StationRouteMiddle stationRouteMiddle = new StationRouteMiddle();
                        stationRouteMiddle.setStartStation(station1);
                        stationRouteMiddle.setEndStation(station2);
                        list.add(stationRouteMiddle);
                    }
                }
            }
        }

        return list;
    }

    public List<StationRouteMiddle> stationMid(List<StationDistance> list1, List<StationDistance> list2) {
        List<StationRouteMiddle> list = new ArrayList<>();

        for (StationDistance station1 : list1) {
            List<StationRoute> stationRoute1 = stationRouteService.getAllStationBehind(station1.getStationRoute().getStationId(),
                    station1.getStationRoute().getOrder());

            for (StationDistance station2 : list2) {
                if (station1.getStationRoute().getRouteId() != station2.getStationRoute().getRouteId()) {

                    List<StationRoute> stationRoute2 = stationRouteService.getAllStationBefore(station2.getStationRoute().getStationId(),
                            station2.getStationRoute().getOrder());
                    boolean shouldBreak = false;

                    for (StationRoute s1 : stationRoute1) {
                        for (StationRoute s2 : stationRoute2) {

                            if (s1.getStationId().equals(s2.getStationId())) {
                                StationRouteMiddle stationRouteMiddle = new StationRouteMiddle();
                                stationRouteMiddle.setStartStation(station1);
                                stationRouteMiddle.setMidStation(s1.getStationId());
                                stationRouteMiddle.setEndStation(station2);
                                list.add(stationRouteMiddle);

                                shouldBreak = true;
                                break;
                            }
                        }
                        if (shouldBreak) {
                            break;
                        }
                    }
                }
            }
        }
        return list;
    }

    public List<StationRouteMiddle> getNearestStations2(double la1, double lo1, double la2, double lo2) {
        List<StationDistance> list1 = findNearestStations(la1, lo1);
        List<StationDistance> list2 = findNearestStations(la2, lo2);
        List<StationRouteMiddle> list = stationMid(list1, list2);
        return list;
    }

    public List<StationRouteMiddle> getNearestStationsFor1Route(double la1, double lo1, double la2, double lo2) {
        List<StationDistance> list1 = findNearestStations(la1, lo1);
        List<StationDistance> list2 = findNearestStations(la2, lo2);
        List<StationRouteMiddle> list = resultFor1Route(list1, list2);
        return list;
    }

    public boolean addNewStation(Station station) {

        Station checkSta = stationRepository.findStationByCode(station.getCode());
        if (checkSta != null) {
            return false;
        }

        Station newStation = new Station();
        newStation.setName(station.getName());
        newStation.setLatitude(station.getLatitude());
        newStation.setLongitude(station.getLongitude());
        newStation.setCode(station.getCode());
        newStation.setAddress(station.getAddress());
        newStation.setIsActive(1);

        stationRepository.save(newStation);
        return true;

    }

    public boolean editStation(Station station) {
        Station checkSta = stationRepository.findStationByCode(station.getCode());
        if (checkSta != null) {
            return false;
        }
        Station newStation = stationRepository.findById(station.getId()).orElseThrow(null);
        newStation.setName(station.getName());
        newStation.setCode(station.getCode());

        stationRepository.save(newStation);
        return true;

    }

    public List<Station3Route> getNearestStationsFor3Route(double la1, double lo1, double la2, double lo2) {
        List<StationDistance> list1 = findNearestStations(la1, lo1);
        List<StationDistance> list2 = findNearestStations(la2, lo2);
        List<Station3Route> list = resultFor3Route(list1, list2);
        return list;
    }

    public List<Station3Route> resultFor3Route(List<StationDistance> list1, List<StationDistance> list2) {
//        List<Station> startStationList = new ArrayList<>();
//        List<Station> endStationList = new ArrayList<>();
//
//        for (StationDistance l : list1) {
//            startStationList.add(l.getStationRoute().getStationId());
//        }
//        for (StationDistance l : list2) {
//            endStationList.add(l.getStationRoute().getStationId());
//        }
//        List<Route> startRouteList = new ArrayList<>();
//        List<Route> endRouteList = new ArrayList<>();
//
//        for (Station l : startStationList) {
//            List<Route> route = stationRouteService.getRouteByStationId(l);
//            startRouteList.addAll(route);
//        }
//        for (Station l : endStationList) {
//            List<Route> route = stationRouteService.getRouteByStationId(l);
//            endRouteList.addAll(route);
//        }

        List<StationRoute> startList = new ArrayList<>();
        List<StationRoute> endList = new ArrayList<>();

        for (StationDistance l1 : list1) {
            List<StationRoute> sta = stationRouteService.getAllStationBehind(l1.getStationRoute().getStationId(), l1.getStationRoute().getOrder());
            startList.addAll(sta);
        }
        for (StationDistance l1 : list2) {
            List<StationRoute> sta = stationRouteService.getAllStationBehind(l1.getStationRoute().getStationId(), l1.getStationRoute().getOrder());
            endList.addAll(sta);
        }

//        for (Route r : startRouteList) {
//            List<Station> station = stationRouteService.getStationByRouteId(r);
//            startMidStationList.addAll(station);
//        }
//        for (Route r : endRouteList) {
//            List<Station> station = stationRouteService.getStationByRouteId(r);
//            endMidStationList.addAll(station);
//        }
        List<Station3Route> resultRouteList = new ArrayList<>();

        for (StationRoute sta1 : startList) {

            for (StationRoute sta2 : endList) {

                List<Route> route = stationRouteService.getRouteHave2Station(sta1.getStationId(), sta2.getStationId());

                if (!route.isEmpty()) {
                    System.out.println("checkcheckcheck" + sta1.getStationId().getName());
                    System.out.println("checkcheckcheck2" + sta2.getStationId().getName());
                    Station3Route r = new Station3Route();
                    r.setStartStation(sta1);
                    r.setEndStation(sta2);
                    resultRouteList.add(r);
                }

            }
        }

        return resultRouteList;
    }

}
