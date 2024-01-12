/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.User;
import com.backend.busmap.repository.UserRepository;
import com.backend.busmap.repository.UserRouteLikesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service

public class UserRouteLikesService {
    @Autowired
    private UserRouteLikesRepository userRouteLikesRepository;
    
     @Autowired
    private UserRepository userRepository;
    
    public List<Route> getAllRouteByUser(String id) {
        User user = userRepository.findUserById(id);

        return userRouteLikesRepository.getAllRouteByUser(user);
    }
    
     public List<Route> getAllOneWayRoute(String name,String id) {
                 User u = userRepository.findUserById(id);

        return this.userRouteLikesRepository.findAllOneWayRoute(name,u);
    }
}
