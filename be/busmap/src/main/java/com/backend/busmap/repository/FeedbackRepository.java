/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Feedback;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author vegar
 */
public interface FeedbackRepository extends JpaRepository<Feedback, String>{
    
     Page<Feedback> findFeedbackByRouteId(Route r, Pageable a);

    
    List<Feedback> findByRouteId(Route routeId);
    
    Optional<Feedback> findByUserIdAndRouteId(User userId, Route routeId);

}
