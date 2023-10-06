/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.EditStation;
import com.backend.busmap.models.Station;
import com.backend.busmap.service.StationService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/api/admin/station")
public class AdminStationController {

    @Autowired
    private StationService stationService;

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoute(@RequestBody Station s) {
        return ResponseEntity.ok(this.stationService.addNewStation(s));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editRoute(@RequestBody EditStation s) {
        return ResponseEntity.ok(this.stationService.editStation(s));
    }
    
  @GetMapping("")
    public ResponseEntity<?> getAllStationAdmin(@RequestParam Map<String, String> params) {
        Page<Station> pages = (Page<Station>) stationService.getAllStationAdmin(params);
//        if (pages == null) {
//            return ResponseEntity.badRequest().body("Error");
//        }
        return ResponseEntity.ok(pages);
    }
}
