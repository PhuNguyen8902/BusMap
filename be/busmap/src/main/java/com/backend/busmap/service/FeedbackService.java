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
import java.sql.Date;
import java.util.Calendar;
import java.util.Collections;
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

        List<Feedback> feedbackList = this.feedbackRepo.findByRouteId(route);

        // Sort the feedbackList by date in ascending order
        Collections.sort(feedbackList, (feedback1, feedback2) -> feedback2.getDate().compareTo(feedback1.getDate()));

        return feedbackList;
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

        // Set the current date
        java.util.Date currentDate = Calendar.getInstance().getTime();
        feedback.setDate(new Date(currentDate.getTime()));

        this.feedbackRepo.save(feedback);

        return "Add Successfully";
    }

    public String addFeedbackAPP(AddFeedback addFeedback) {

        Route route = this.routeRepo.findRouteById(addFeedback.getRouteId());
        User user = this.userRepo.findUserById(addFeedback.getUserId());

        Feedback f = feedbackRepo.findByUserIdAndRouteId(user, route).orElseThrow(null);

        if (f == null) {

            Feedback feedback = new Feedback();

            feedback.setRate(addFeedback.getRate());
            feedback.setContent(addFeedback.getContent());
            feedback.setRouteId(route);
            feedback.setUserId(user);

            // Set the current date
            java.util.Date currentDate = Calendar.getInstance().getTime();
            feedback.setDate(new Date(currentDate.getTime()));

            this.feedbackRepo.save(feedback);

            return "Successfully";
        } else {
            Feedback feedback = new Feedback();

            feedback.setId(f.getId());
            feedback.setRate(addFeedback.getRate());
            feedback.setContent(addFeedback.getContent());
            feedback.setRouteId(route);
            feedback.setUserId(user);

            // Set the current date
            java.util.Date currentDate = Calendar.getInstance().getTime();
            feedback.setDate(new Date(currentDate.getTime()));

            this.feedbackRepo.save(feedback);

            return "Successfully";
        }
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

        // Set the current date
        java.util.Date currentDate = Calendar.getInstance().getTime();
        feedback.setDate(new Date(currentDate.getTime()));

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
            Sort.Order o = new Sort.Order(Sort.Direction.DESC, "date");
            Sort sort = Sort.by(o);

            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")), sort);
            Route r = routeRepo.findById(id).orElse(null);

            feedbacks = this.feedbackRepo.findFeedbackByRouteId(r, pageable);
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return feedbacks;
    }

    public Page<?> getAllFeedbackAdminByUserId(String id, Map<String, String> params) {
        Pageable pageable = null;
        Page<Feedback> feedbacks = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            Sort.Order o = new Sort.Order(Sort.Direction.DESC, "date");
            Sort sort = Sort.by(o);

            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")), sort);
            User r = userRepo.findById(id).orElse(null);

            feedbacks = this.feedbackRepo.findFeedbackByUserId(r, pageable);
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return feedbacks;
    }
}
