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
    private String distance;
    private String duration;
    private String endTime;
    private String startTime;
    private String name;
    private String routeNum;
    private String tripSpacing;

}
