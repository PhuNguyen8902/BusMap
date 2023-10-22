/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    @Override
    Optional<User> findById(String id);
    
    User findUserById(String id);

//    @Query("SELECT u FROM User u JOIN u.userRoles ur WHERE ur.name = :role")
//    Page<UserInfoResponse> findByRoles(UserRole role, Pageable pageable);
}
