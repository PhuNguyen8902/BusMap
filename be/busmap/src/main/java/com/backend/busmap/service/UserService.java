/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.service;

import com.backend.busmap.dto.request.EditUser;
import com.backend.busmap.enums.UserRole;
import com.backend.busmap.models.Route;
import com.backend.busmap.models.User;
import com.backend.busmap.repository.UserRepository;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
    
     public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveOrUpdateUser(User user) {
        if (user.getId() == null) {
            user.setId(UUID.randomUUID().toString());
        }
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user;
    }
    
     public Page<?> getAllUser(Map<String, String> params) {
        Pageable pageable = null;
        Page<User> users = null;

        if (params.get("limit") == null) {
            params.put("limit", "5");
        }

        if (params.get("page") == null || Integer.parseInt(params.get("page")) < 1) {
            params.put("page", "1");
        }
        try {
            pageable = PageRequest.of(Integer.parseInt(params.get("page")) - 1, Integer.parseInt(params.get("limit")));

            if (params.get("kw") == "") {
                users = userRepository.findUserByIsActive(pageable);

            } else {
                users = userRepository.findUserByIsActive(params.get("kw"), pageable);
            }
        } catch (NumberFormatException exception) {
            System.out.println(exception.getMessage());
            return null;
        }
        return users;
    }
     
     public boolean editUser(EditUser u ){
         User user = new User();
         user.setEmail(u.getEmail());
         user.setUserName(u.getUsername());
         user.setId(u.getId());
         user.setName(u.getName());
         user.setPhone(u.getPhone());
         user.setIsActive(1);
         user.setPassword(u.getPassword());
         String role =u.getRole();
         user.setRole(UserRole.valueOf(role));
         
         userRepository.save(user);
         return true;
     }
}
