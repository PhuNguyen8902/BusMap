/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.AddTrip;
import com.backend.busmap.dto.request.EditStationRoute;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.StationRoute;
import com.backend.busmap.service.StationRouteService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/admin/station-route")
public class AdminStationRouteController {

    @Autowired
    private StationRouteService stationRouteSer;

    @GetMapping("/route/{id}")
    public ResponseEntity<?> getAllStationAdmin(@PathVariable Integer id, @RequestParam Map<String, String> params) {
        Page<StationRoute> pages = (Page<StationRoute>) stationRouteSer.getAllStationRouteAdmin(id, params);
        return ResponseEntity.ok(pages);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStationRoute(@PathVariable Integer id) {
        boolean rs = stationRouteSer.deleteStationRoute(id);
        if (rs) {
            return ResponseEntity.ok(Message.builder().mess("Delete Successfully").build());
        }
        return ResponseEntity.ok(Message.builder().mess("Delete UnSuccessfully").build());

    }

    @GetMapping("/")
    public ResponseEntity<?> findByPriorityAndRouteId(@RequestParam Map<String, String> params) {
        String rs = stationRouteSer.findByPriorityAndRouteId(params);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editStationRoute(@RequestBody EditStationRoute s) {
        String rs = stationRouteSer.editStationRoute(s);
        return ResponseEntity.ok(Message.builder().mess(rs).build());

    }

    @PostMapping("/add")
    public ResponseEntity<?> addStationRoute(@RequestBody EditStationRoute s) {
        String rs = stationRouteSer.addStationRoute(s);
        return ResponseEntity.ok(Message.builder().mess(rs).build());

    }
}
