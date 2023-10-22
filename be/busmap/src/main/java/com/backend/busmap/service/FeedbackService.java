/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddFeedback;
import com.backend.busmap.dto.request.EditFeedback;
import com.backend.busmap.models.Feedback;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.Trip;
import com.backend.busmap.models.User;
import com.backend.busmap.repository.FeedbackRepository;
import com.backend.busmap.repository.RouteRepository;
import com.backend.busmap.repository.UserRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 *
 * @author vegar
 */
@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepo;

    @Autowired
    private RouteRepository routeRepo;

    @Autowired
    private UserRepository userRepo;

    public List<Feedback> getAllFeedbackByRouteId(Integer routeId) {

        Route route = this.routeRepo.findRouteById(routeId);

        return this.feedbackRepo.findByRouteId(route);
    }

    public Optional<Feedback> getFeedbackByUserIdAndRouteId(Integer routeId, String userId) {

        Route route = this.routeRepo.findRouteById(routeId);

        User user = this.userRepo.findUserById(userId);

        return this.feedbackRepo.findByUserIdAndRouteId(user, route);

    }

    public String addFeedback(AddFeedback addFeedback) {

        Route route = this.routeRepo.findRouteById(addFeedback.getRouteId());
        User user = this.userRepo.findUserById(addFeedback.getUserId());

        Feedback feedback = new Feedback();

        feedback.setRate(addFeedback.getRate());
        feedback.setContent(addFeedback.getContent());
        feedback.setRouteId(route);
        feedback.setUserId(user);

        this.feedbackRepo.save(feedback);

        return "Add Successfully";
    }

    public String updateFeedback(EditFeedback editFeedback) {

        Route route = this.routeRepo.findRouteById(editFeedback.getRouteId());
        User user = this.userRepo.findUserById(editFeedback.getUserId());

        Feedback feedback = new Feedback();

        feedback.setId(editFeedback.getId());
        feedback.setRate(editFeedback.getRate());
        feedback.setContent(editFeedback.getContent());
        feedback.setRouteId(route);
        feedback.setUserId(user);

        this.feedbackRepo.save(feedback);

        return "Edit Successfully";
    }

    public Page<?> getAllFeedbackAdminByRouteId(Integer id, Map<String, String> params) {
        Pageable pageable = null;
        Page<Feedback> feedbacks = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {

            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));
            Route r = routeRepo.findById(id).orElse(null);

            feedbacks = this.feedbackRepo.findFeedbackByRouteId(r, pageable);
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return feedbacks;
    }
}
