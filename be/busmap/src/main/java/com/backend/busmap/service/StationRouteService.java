/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.EditStationRoute;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import com.backend.busmap.repository.RouteRepository;
import com.backend.busmap.repository.StationRouteRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class StationRouteService {

    @Autowired
    private StationRouteRepository stationRouteRepo;

    @Autowired
    private StationService stationSer;

    @Autowired
    private RouteRepository routeRepo;

    public List<StationRoute> getAllStationRoutes() {
        return this.stationRouteRepo.findAll();
    }

    public List<StationRoute> getStationRouteByRouteId(Integer routeId) {
        Route route = this.routeRepo.findById(routeId).orElse(null);

        return this.stationRouteRepo.findByRouteId(route);
    }

    public void deleteAllStationRouteByRoute(Route r) {
        List<StationRoute> list = stationRouteRepo.findByRouteId(r);
        for (StationRoute t : list) {
            stationRouteRepo.deleteById(t.getId());
        }
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> getAllStationBehind(Route sta, Integer priority) {
        return this.stationRouteRepo.getAllStationBehind(sta, priority);
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> findByRouteIdAndPriorityGreaterThan(Route sta, Integer priority) {
        return this.stationRouteRepo.findByRouteIdAndPriorityGreaterThan(sta, priority);

    }

    @Cacheable("stationRoutes")
    public List<StationRoute> findByRouteIdAndPriorityLessThan(Route sta, Integer priority) {
        return this.stationRouteRepo.findByRouteIdAndPriorityLessThan(sta, priority);
    }

    @Cacheable("stationRoutes")
    public List<StationRoute> getAllStationBefore(Route sta, Integer priority) {
        return this.stationRouteRepo.getAllStationBefore(sta, priority);
    }

    @Cacheable("stationRoutesOfStationId")
    public List<StationRoute> findStationRouteByStationId(Station sta) {
        return this.stationRouteRepo.findStationRouteByStationIdAndPriorityIsNotNull(sta);
    }

    @Cacheable("station")
    public List<Station> getStationByRouteAndPriority(Route r, Integer o1, Integer o2) {
        return this.stationRouteRepo.getStationByRouteAndPriority(r, o1, o2);
    }

    @Cacheable("stationRoute")
    public StationRoute findByStationIdAndRouteId(Station s, Route r) {
        return this.stationRouteRepo.findByStationIdAndRouteId(s, r);
    }

    public Page<?> getAllStationAdminByRouteId(Integer id, Map<String, String> params) {
        Pageable pageable = null;
        Page<StationRoute> stationRoutes = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {

            Sort.Order o = new Sort.Order(Sort.Direction.ASC, "priority"); 
            Sort sort = Sort.by(o);

            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")),sort);
            Route route = routeRepo.findById(id).orElse(null);

//            stationRoutes = stationRouteRepo.findStationRouteByRouteId(route, pageable);
            
             if (params.get("kw") == "" ) {
                stationRoutes = stationRouteRepo.findStationRouteByRouteId(route, pageable);

            } else {
               stationRoutes = stationRouteRepo.getStationRouteByRouteId(params.get("kw"),route, pageable);
            }
            
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return stationRoutes;
    }
    
       public Page<?> getAllStationAdminByStationId(Integer id, Map<String, String> params) {
        Pageable pageable = null;
        Page<StationRoute> stationRoutes = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {

            Sort.Order o = new Sort.Order(Sort.Direction.ASC, "priority"); 
            Sort sort = Sort.by(o);

            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")),sort);
            Station station = stationSer.findById(id);

//            stationRoutes = stationRouteRepo.findStationRouteByRouteId(route, pageable);
            
             if (params.get("kw") == "" ) {
                stationRoutes = stationRouteRepo.findStationRouteByStationId(station, pageable);

            } else {
               stationRoutes = stationRouteRepo.getStationRouteByStationId(params.get("kw"),station, pageable);
            }
            
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return stationRoutes;
    }

    public boolean deleteStationRoute(Integer id) {
        stationRouteRepo.deleteById(id);
        return true;
    }

    public String findByPriorityAndRouteId(Map<String, String> params) {

        String rId = params.get("routeId");
        String sId = params.get("stationId");
        String o = params.get("priority");
        Integer priority;
        try {
            priority = Integer.valueOf(o);

        } catch (NumberFormatException e) {
            return "Number needs to be entered";
        }

        Route route = routeRepo.findById(Integer.valueOf(rId)).orElse(null);
        Station station = stationSer.findById(Integer.valueOf(sId));

        StationRoute s = stationRouteRepo.findByPriorityAndRouteId(priority, route);
        if (s == null) {
            if (priority == 1) {
                return "Valid Priority";
            }
            StationRoute s2 = stationRouteRepo.findByPriorityAndRouteId(priority - 1, route);
            if (s2 != null) {
                double distance = stationSer.calculateDistance(station.getLatitude(), station.getLongitude(), s2.getStationId().getLatitude(), s2.getStationId().getLongitude());
                if (distance <= 5) {
                    return "Valid Priority";
                }
                return "The location you change is located more than 5km ahead of the station";
            }
            return "Invalid Priority you need to have 1 Station in front";

        }
        return "Invalid Priority";

    }

    public String editStationRoute(EditStationRoute s) {
        StationRoute staRou = stationRouteRepo.findById(Integer.valueOf(s.getId())).orElse(null);

        staRou.setPriority(Integer.valueOf(s.getPriority()));

        try {
            stationRouteRepo.save(staRou);
            return "Update Successfully";
        } catch (Exception e) {
            return "Update UnSuccessfully";
        }
    }

    public boolean checkStationUnique(List<StationRoute> list, Station sta) {
        for (StationRoute s : list) {
            if (Objects.equals(s.getStationId().getId(), sta.getId())) {
                return false;
            }
        }
        return true;

    }

    public String addStationRoute(EditStationRoute s) {
        Station sta = stationSer.findStationByCode(s.getCode());
        if (sta == null) {
            return "Invalid station";
        }
        Route route = routeRepo.findById(Integer.valueOf(s.getRouteId())).orElse(null);

        List<StationRoute> list = stationRouteRepo.findByRouteId(route);
        boolean kq = checkStationUnique(list, sta);
        if (!kq) {
            return "Station Duplicate";
        }
        Map<String, String> params = new HashMap<>();
        params.put("routeId", s.getRouteId());
        params.put("stationId", sta.getId().toString());
        params.put("priority", s.getPriority());
        String rs = findByPriorityAndRouteId(params);
        if (!"Valid Priority".equals(rs)) {
            return rs;
        }
        try {
            StationRoute newStaRou = new StationRoute();
            newStaRou.setPriority(Integer.valueOf(s.getPriority()));
            newStaRou.setRouteId(route);
            newStaRou.setStationId(sta);
            stationRouteRepo.save(newStaRou);
            return "Add Successfully";
        } catch (Exception e) {
            return "Add UnSuccessfully";
        }
    }
}
