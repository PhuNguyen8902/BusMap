/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author ADMIN
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddRoute {

//    private Integer idA;
//    private Integer idB;
    private String locationA;
    private String locationB;
    private String startTimeA;
    private String startTimeB;
    private String distance;
    private String duration;
    private String tripSpacing;
    private String endTimeA;
    private String endTimeB;
    private String routeNum;
//    private int isActive;
}
