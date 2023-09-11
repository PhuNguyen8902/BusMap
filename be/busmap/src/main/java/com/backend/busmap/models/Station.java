/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author ADMIN
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Station {
    
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private double latitude;
    private double longitude;
    private String address;
    private String code;
    private boolean isActive;
}
