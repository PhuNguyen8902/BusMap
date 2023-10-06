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
    @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid formatting for StartTime Route")
    private String startTimeA;
    @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid formatting for StartTime return Route")
    private String startTimeB;
    @Pattern(regexp = "^-?\\d+(\\.\\d+)?$", message = "Invalid formatting for Distance")
    private String distance;
    @Pattern(regexp = "^[1-9][0-9]*$", message = "Invalid formatting for Duration")
    private String duration;
    @Pattern(regexp = "^[1-9][0-9]*$", message = "Invalid formatting for TripSpacing")
    private String tripSpacing;
    @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid formatting for EndTime Route")
    private String endTimeA;
    @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid formatting for EndTime return Route")
    private String endTimeB;
    private String routeNum;
//    private int isActive;
}
