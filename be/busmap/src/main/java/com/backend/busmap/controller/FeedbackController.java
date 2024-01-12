/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.dto.request.AddFeedback;
import com.backend.busmap.dto.request.EditFeedback;
import com.backend.busmap.dto.response.Message;
import com.backend.busmap.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
 * @author vegar
 */
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("")
    public ResponseEntity<?> getAllFeedbackByRouteId(@RequestParam(value = "routeId") Integer routeId) {
        return ResponseEntity.ok(this.feedbackService.getAllFeedbackByRouteId(routeId));
    }

    @GetMapping("/routeAndUser")
    public ResponseEntity<?> getFeedBackByRouteIdAndUserId(@RequestParam(value = "routeId") Integer routeId,
            @RequestParam(value = "userId") String userId) {
        return ResponseEntity.ok(this.feedbackService.getFeedbackByUserIdAndRouteId(routeId, userId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFeedback(@Valid @RequestBody AddFeedback feedback) {
        String rs = this.feedbackService.addFeedback(feedback);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }
    
      @PostMapping("/addAPP")
    public ResponseEntity<?> addFeedbackAPP(@Valid @RequestBody AddFeedback feedback) {
        String rs = this.feedbackService.addFeedbackAPP(feedback);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }

    @PutMapping("/edit")
    public ResponseEntity<?> addFeedback(@Valid @RequestBody EditFeedback feedback) {
        String rs = this.feedbackService.updateFeedback(feedback);
        return ResponseEntity.ok(Message.builder().mess(rs).build());
    }
}
