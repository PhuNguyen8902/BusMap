/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author vegar
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddFeedback {
    
    private String content;
    private Integer rate;
    private Integer routeId;
    private String userId;
}
