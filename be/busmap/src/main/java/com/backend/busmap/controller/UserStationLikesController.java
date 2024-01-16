/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.dto.request.AddOrDeleteUserStationLikes;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.service.UserStationLikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api/userStationLikes")
public class UserStationLikesController {

    @Autowired
    private UserStationLikesService userStationLikesService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllStationByUser(@PathVariable("id") String id) {
        return ResponseEntity.ok(this.userStationLikesService.getAllStationByUser(id));
    }

    @GetMapping("/oneWay")
    public ResponseEntity<?> findSearchStation(@RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "id", required = false) String id) {
        return ResponseEntity.ok(this.userStationLikesService.findSearchStation(name, id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewUserStationLikes(@RequestBody AddOrDeleteUserStationLikes route) {
        String rs = userStationLikesService.addNewUserStationLikes(route);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteNewUserRouteLikes(@RequestBody AddOrDeleteUserStationLikes route) {
        String rs = userStationLikesService.deleteUserStationLikes(route);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }
}
