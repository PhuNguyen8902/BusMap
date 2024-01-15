/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddStation;
import com.backend.busmap.dto.request.EditStation;
import com.backend.busmap.dto.response.RouteMiddle;
import com.backend.busmap.dto.response.Station3Route;
import com.backend.busmap.dto.response.StationDistance;
import com.backend.busmap.dto.response.StationRouteMiddle;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import com.backend.busmap.repository.StationRepository;
import com.backend.busmap.repository.StationRouteRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    private StationRouteRepository stationRouteRepo;

    public List<Station> getAllStation() {
        return this.stationRepository.findAll();
    }

    public Station findById(Integer id) {
        return stationRepository.findStationById(id);
    }

    public Station findStationByCode(String code) {
        return stationRepository.findStationByCode(code);
    }

    public Page<?> getAllStationAdmin(Map<String, String> params) {
        Pageable pageable = null;
        Page<Station> stations = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            stations = stationRepository.findStationByIsActive(1, pageable);
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return stations;
    }

    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {

        double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double dLat1 = Math.toRadians(lat1);
        double dLat2 = Math.toRadians(lat2);

        //https://en.wikipedia.org/wiki/Haversine_formula
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(dLat1) * Math.cos(dLat2)
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.asin(Math.sqrt(a));

        return R * c;
    }

    public List<Station> findStationsOnRoutes(Integer route1, Integer route2) {
        return this.stationRepository.findStationsOnRoutes(route1, route2);
    }

    @Cacheable("stationDistance")
    public List<StationDistance> findNearestStations(Double latitude, Double longitude) {
        List<Station> allStations = this.stationRepository.getStationNearAdd(latitude, longitude);

        List<StationDistance> stationDistances = new ArrayList<>();
        for (Station station : allStations) {
            double distance = calculateDistance(latitude, longitude, station.getLatitude(), station.getLongitude());
            if (distance <= 3) {
                List<StationRoute> staList = stationRouteService.findStationRouteByStationId(station);
                for (StationRoute s : staList) {
                    StationDistance stationDistance = new StationDistance();
                    stationDistance.setStationRoute(s);
                    stationDistance.setDistance(distance);
                    stationDistances.add(stationDistance);
                }
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

    @Cacheable("resultFor1Route")
    public List<StationRouteMiddle> resultFor1Route(List<StationDistance> list1, List<StationDistance> list2) {
        List<StationRouteMiddle> list = new ArrayList<>();

        for (StationDistance station1 : list1) {
            for (StationDistance station2 : list2) {
                Integer route1Id = station1.getStationRoute().getRouteId().getId();
                Integer route2Id = station2.getStationRoute().getRouteId().getId();
                Integer priority1 = station1.getStationRoute().getPriority();
                Integer priority2 = station2.getStationRoute().getPriority();

                if (route1Id.intValue() == route2Id.intValue() && priority1 < priority2) {
                    List<Station> l = stationRouteService.getStationByRouteAndPriority(station1.getStationRoute().getRouteId(), priority1, priority2);

                    StationRouteMiddle s = new StationRouteMiddle();
                    Double dis = station1.getDistance() + station2.getDistance();
                    Double d = distanceOfRoute(station1.getStationRoute().getRouteId(), station1.getStationRoute().getPriority(),
                            station2.getStationRoute().getPriority());
                    s.setDistance(dis + d);
                    s.setStartStation(station1);
                    s.setEndStation(station2);
                    s.setListStation(l);
                    list.add(s);
                }

            }
        }

//        return list;
        Collections.sort(list, (StationRouteMiddle s1, StationRouteMiddle s2)
                -> Double.compare(s1.getDistance(), s2.getDistance())
        );

        int topN = Math.min(5, list.size());
        return list.subList(0, topN);
    }

    @Cacheable("stationMid2Route")
    public List<StationRouteMiddle> stationMid(List<StationDistance> list1, List<StationDistance> list2) {
        List<StationRouteMiddle> list = new ArrayList<>();

        for (StationDistance station1 : list1) {
            List<StationRoute> stationRoute1 = stationRouteService.findByRouteIdAndPriorityGreaterThan(station1.getStationRoute().getRouteId(),
                    station1.getStationRoute().getPriority());

            for (StationDistance station2 : list2) {
                if (station1.getStationRoute().getRouteId().getId().intValue() != station2.getStationRoute().getRouteId().getId().intValue()) {

                    List<StationRoute> stationRoute2 = stationRouteService.findByRouteIdAndPriorityLessThan(station2.getStationRoute().getRouteId(),
                            station2.getStationRoute().getPriority());
                    boolean shouldBreak = false;

                    for (StationRoute s1 : stationRoute1) {
                        for (StationRoute s2 : stationRoute2) {

                            if (s1.getStationId().getId().intValue() == s2.getStationId().getId().intValue()) {
//                                StationRoute sRoute1 = stationRouteService.findByStationIdAndRouteId(s1.getStationId(), station1.getStationRoute().getRouteId());
//                                StationRoute sRoute2 = stationRouteService.findByStationIdAndRouteId(s1.getStationId(), station2.getStationRoute().getRouteId());

                                StationRouteMiddle stationRouteMiddle = new StationRouteMiddle();
                                stationRouteMiddle.setStartStation(station1);
                                stationRouteMiddle.setMidStation(s1.getStationId());
                                stationRouteMiddle.setEndStation(station2);

                                Double dis = station1.getDistance() + station2.getDistance();
                                Double d1 = distanceOfRoute(station1.getStationRoute().getRouteId(), station1.getStationRoute().getPriority(), s1.getPriority());
                                Double d2 = distanceOfRoute(station2.getStationRoute().getRouteId(), s2.getPriority(), station2.getStationRoute().getPriority());

                                List<Station> l1 = stationRouteService.getStationByRouteAndPriority(station1.getStationRoute().getRouteId(), station1.getStationRoute().getPriority(), s1.getPriority());
                                List<Station> l2 = stationRouteService.getStationByRouteAndPriority(station2.getStationRoute().getRouteId(), s2.getPriority(), station2.getStationRoute().getPriority());
                                l1.addAll(l2);

                                stationRouteMiddle.setDistance(dis + d1 + d2);
                                stationRouteMiddle.setListStation(l1);
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
//        return list;
        Collections.sort(list, (StationRouteMiddle s1, StationRouteMiddle s2)
                -> Double.compare(s1.getDistance(), s2.getDistance())
        );

        int topN = Math.min(5, list.size());
        return list.subList(0, topN);

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

// Helper function to check if a string is numeric
    private boolean isNumeric(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public String addNewStation(AddStation station) {

        Station checkSta = stationRepository.findStationByCode(station.getCode());
        if (checkSta != null) {
            return "Station exist";
        }

        // Check if latitude and longitude are numeric
        if (!isNumeric(station.getLatitude()) || !isNumeric(station.getLongitude())) {
            return "Latitude and longitude must be numeric values";
        }

        Station newStation = new Station();
        newStation.setLatitude(Double.parseDouble(station.getLatitude()));
        newStation.setLongitude(Double.parseDouble(station.getLongitude()));
        newStation.setAddress(station.getAddress());
        newStation.setName(station.getName());
        newStation.setCode(station.getCode());
        newStation.setIsActive(1);

        stationRepository.save(newStation);
        return "Add Successfully";

    }

    public boolean editStation(EditStation s) {
        Station station = new Station();
        station.setId(Integer.valueOf(s.getId()));
        station.setLatitude(Double.parseDouble(s.getLatitude()));
        station.setLongitude(Double.parseDouble(s.getLongitude()));
        station.setAddress(s.getAddress());
        station.setName(s.getName());
        station.setCode(s.getCode());
        station.setIsActive(1);

        stationRepository.save(station);
        return true;

    }

    public String deleteStation(Integer id) {
        Station station = this.stationRepository.findById(id).orElseThrow(null);

        station.setIsActive(0);

        List<StationRoute> stationRoute = this.stationRouteRepo.findByStationId(station);

        this.stationRouteRepo.deleteAll(stationRoute);

        this.stationRepository.save(station);

        return "Delete Successfully";
    }

    public List<Station3Route> getNearestStationsFor3Route(double la1, double lo1, double la2, double lo2) {
        List<StationDistance> list1 = findNearestStations(la1, lo1);
        List<StationDistance> list2 = findNearestStations(la2, lo2);
        List<Station3Route> list = resultFor3Route(list1, list2);
        return list;
    }

    @Cacheable("routeMidFor3Route")
    public List<Station3Route> resultFor3Route(List<StationDistance> list1, List<StationDistance> list2) {
        List<Station3Route> list = new ArrayList<>();

        for (StationDistance station1 : list1) {
            Route routeStart = station1.getStationRoute().getRouteId();
            List<StationRoute> stationRoute1 = stationRouteService.getAllStationBehind(
                    station1.getStationRoute().getRouteId(),
                    station1.getStationRoute().getPriority()
            );

            for (StationDistance station2 : list2) {
                Route routeEnd = station2.getStationRoute().getRouteId();
                List<StationRoute> stationRoute2 = stationRouteService.getAllStationBefore(
                        station2.getStationRoute().getRouteId(),
                        station2.getStationRoute().getPriority()
                );

                if (routeStart.getId().intValue() != routeEnd.getId().intValue()) {
                    for (StationRoute s1 : stationRoute1) {
                        for (StationRoute s2 : stationRoute2) {
                            if ((s1.getRouteId().getId().intValue() == s2.getRouteId().getId().intValue()) && (s1.getPriority() < s2.getPriority())) {
                                StationRoute sRouteStart = stationRouteService.findByStationIdAndRouteId(s1.getStationId(), station1.getStationRoute().getRouteId());
                                StationRoute sRouteEnd = stationRouteService.findByStationIdAndRouteId(s2.getStationId(), station2.getStationRoute().getRouteId());
//                                StationRoute sRoute1 = stationRouteService.findByStationIdAndRouteId(s1.getStationId(), s1.getRouteId());
//                                StationRoute sRoute2 = stationRouteService.findByStationIdAndRouteId(s2.getStationId(), s2.getRouteId());

                                Station3Route r = new Station3Route();
                                RouteMiddle routeMid = new RouteMiddle();
                                routeMid.setStartStation(s1.getStationId());
                                routeMid.setEndStation(s2.getStationId());
                                routeMid.setRoute(s1.getRouteId());

                                Double dis = station1.getDistance() + station2.getDistance();
                                Double dStart = distanceOfRoute(station1.getStationRoute().getRouteId(), station1.getStationRoute().getPriority(), sRouteStart.getPriority());
                                Double dEnd = distanceOfRoute(station2.getStationRoute().getRouteId(), sRouteEnd.getPriority(), station2.getStationRoute().getPriority());
                                Double dMid = distanceOfRoute(s1.getRouteId(), s1.getPriority(), s2.getPriority());

                                StationRoute sl1 = stationRouteService.findByStationIdAndRouteId(s1.getStationId(), station1.getStationRoute().getRouteId());
                                List<Station> l1 = stationRouteService.getStationByRouteAndPriority(station1.getStationRoute().getRouteId(), station1.getStationRoute().getPriority(), sl1.getPriority());
                                List<Station> l2 = stationRouteService.getStationByRouteAndPriority(s1.getRouteId(), s1.getPriority(), s2.getPriority());
                                StationRoute sl3 = stationRouteService.findByStationIdAndRouteId(s2.getStationId(), station2.getStationRoute().getRouteId());
                                List<Station> l3 = stationRouteService.getStationByRouteAndPriority(station2.getStationRoute().getRouteId(), sl3.getPriority(), station2.getStationRoute().getPriority());
                                l1.addAll(l2);
                                l1.addAll(l3);
                                
                                r.setDistance(dis + dStart + dMid + dEnd);
                                r.setStartStation(station1);
                                r.setEndStation(station2);
                                r.setMidRoute(routeMid);
                                r.setListStation(l1);
                                list.add(r);
                            }
                        }
                    }
                }
            }
        }
//        return list;
        Collections.sort(list, (Station3Route s1, Station3Route s2)
                -> Double.compare(s1.getDistance(), s2.getDistance())
        );

        int topN = Math.min(5, list.size());
        return list.subList(0, topN);

    }

    public Double distanceOfRoute(Route r, Integer o1, Integer o2) {
        List<Station> staList = stationRouteService.getStationByRouteAndPriority(r, o1, o2);
        Double sum = 0.0;
        for (int i = 0; i < staList.size() - 1; i++) {
            Station currentStation = staList.get(i);
            Station nextStation = staList.get(i + 1);

            double distance = calculateDistance(
                    currentStation.getLatitude(), currentStation.getLongitude(),
                    nextStation.getLatitude(), nextStation.getLongitude()
            );

            sum += distance;
        }
        return sum;
    }

    public List<?> findWithManyRoute(Map<String, String> params) {
        Integer type = Integer.valueOf(params.get("withManyTrip"));
        Double la1 = Double.parseDouble(params.get("la1"));
        Double la2 = Double.parseDouble(params.get("la2"));
        Double lo1 = Double.parseDouble(params.get("lo1"));
        Double lo2 = Double.parseDouble(params.get("lo2"));

        List<StationDistance> list1 = findNearestStations(la1, lo1);
        List<StationDistance> list2 = findNearestStations(la2, lo2);
        switch (type) {
            case 1:
                List<StationRouteMiddle> l = resultFor1Route(list1, list2);
                return l;
            case 2:
                List<StationRouteMiddle> l2 = stationMid(list1, list2);
                return l2;
            case 3:
                List<Station3Route> l3 = resultFor3Route(list1, list2);
                return l3;

        }
        return null;
    }
}
