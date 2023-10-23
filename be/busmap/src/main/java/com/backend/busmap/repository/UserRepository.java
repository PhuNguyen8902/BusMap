/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.repository;

import com.backend.busmap.models.Route;
import com.backend.busmap.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String userName);

    @Override
    Optional<User> findById(String id);
    
    User findUserById(String id);
    
    
     @Query("SELECT r FROM User r WHERE r.isActive = 1 and (r.name LIKE %:kw% or r.userName LIKE %:kw% or r.email LIKE %:kw%)")
    Page<User> findUserByIsActive(String kw, Pageable a);
    
     @Query("SELECT r FROM User r WHERE r.isActive = 1")
    Page<User> findUserByIsActive( Pageable a);

//    @Query("SELECT u FROM User u JOIN u.userRoles ur WHERE ur.name = :role")
//    Page<UserInfoResponse> findByRoles(UserRole role, Pageable pageable);
}
