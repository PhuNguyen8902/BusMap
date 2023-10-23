/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller.admin;

import com.backend.busmap.models.Feedback;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.service.FeedbackService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vegar
 */
@RestController
@RequestMapping("/api/admin/feedback")
public class AdminFeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/route/{id}")
    public ResponseEntity<?> getAllTripOfRoute(@PathVariable Integer id,@RequestParam Map<String, String> params) {
        Page<Route> pages = (Page<Route>) this.feedbackService.getAllFeedbackAdminByRouteId(id,params);
        return ResponseEntity.ok(pages);
    }
     @GetMapping("/user/{id}")
    public ResponseEntity<?> getAllTripOfUser(@PathVariable String id,@RequestParam Map<String, String> params) {
        Page<Route> pages = (Page<Route>) this.feedbackService.getAllFeedbackAdminByUserId(id,params);
        return ResponseEntity.ok(pages);
    }
}
