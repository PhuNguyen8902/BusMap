///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.backend.busmap.controller;
//import com.backend.busmap.dto.response.Message;
//import jakarta.validation.ConstraintViolationException;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(ConstraintViolationException.class)
//    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
//                return ResponseEntity.ok(Message.builder().mess(e.getMessage()).build());
//
//    }
//}
//
