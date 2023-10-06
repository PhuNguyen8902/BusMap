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
public class EditRoute {

    private String id;
    private String direction;
    @Pattern(regexp = "^-?\\d+(\\.\\d+)?$", message = "Invalid formatting for Distance")
    private String distance;
    @Pattern(regexp = "^[1-9][0-9]*$", message = "Invalid formatting for Duration")
    private String duration;
    @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid formatting for EndTime")
    private String endTime;
    @Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid formatting for StartTime")
    private String startTime;
    private String name;
    private String routeNum;
    @Pattern(regexp = "^[1-9][0-9]*$", message = "Invalid formatting for TripSpacing")
    private String tripSpacing;

}
