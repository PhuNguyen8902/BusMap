/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.AddOrDeleteUserRouteLikes;
import com.backend.busmap.dto.request.AddOrDeleteUserStationLikes;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.Station;
import com.backend.busmap.models.User;
import com.backend.busmap.models.UserRouteLikes;
import com.backend.busmap.models.UserStationLikes;
import com.backend.busmap.repository.RouteRepository;
import com.backend.busmap.repository.StationRepository;
import com.backend.busmap.repository.UserRepository;
import com.backend.busmap.repository.UserRouteLikesRepository;
import com.backend.busmap.repository.UserStationLikesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class UserStationLikesService {

    @Autowired
    private UserStationLikesRepository userStationLikesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StationRepository stationRepository;

    public List<Station> getAllStationByUser(String id) {
        User user = userRepository.findUserById(id);

        return userStationLikesRepository.getAllStationByUser(user);
    }

    public List<Station> findSearchStation(String name, String id) {
        User u = userRepository.findUserById(id);

        return this.userStationLikesRepository.findSearchStation(name, u);
    }

    public String addNewUserStationLikes(AddOrDeleteUserStationLikes station) {
        UserStationLikes newItem = new UserStationLikes();
        Station s = stationRepository.findById(station.getStationId()).orElseThrow(null);
        User u = userRepository.findUserById(station.getUserId());

        newItem.setStation(s);
        newItem.setUser(u);
        
        UserStationLikes newUserStationLikes = userStationLikesRepository.save(newItem);
        if (newUserStationLikes != null) {
            return "Add Successfully";
        } else {
            return "Add UnSuccessfully";
        }
    }

    public String deleteUserStationLikes(AddOrDeleteUserStationLikes s) {
        UserStationLikes item = userStationLikesRepository.findByUserIdAndStationId(s.getUserId(), s.getStationId());

        userStationLikesRepository.deleteById(item.getId());
        return "Delete Successfully";
    }
}
