/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.controller;

import com.backend.busmap.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ph4nv
 */
@RestController
@RequestMapping("/mail")
public class EmailController {
    
    private EmailService emailService;
    
    @PostMapping("/send")
    public String sendMail(){
        return emailService.sendMail();
    }
}
