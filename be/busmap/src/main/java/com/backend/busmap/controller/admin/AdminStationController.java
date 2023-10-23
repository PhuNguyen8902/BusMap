/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.dto.request.EditStation;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.models.Station;
import com.backend.busmap.service.StationService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/admin/station")
public class AdminStationController {

    @Autowired
    private StationService stationService;

    @PostMapping("/add")
    public ResponseEntity<?> addNewStation(@RequestBody Station s) {
        String rs = stationService.addNewStation(s);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editStation(@RequestBody EditStation s) {
        return ResponseEntity.ok(this.stationService.editStation(s));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteStation(@PathVariable Integer id) {
        String rs = this.stationService.deleteStation(id);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @GetMapping("")
    public ResponseEntity<?> getAllStationAdmin(@RequestParam Map<String, String> params) {
        Page<Station> pages = (Page<Station>) stationService.getAllStationAdmin(params);
        return ResponseEntity.ok(pages);
    }
}
