/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backend.busmap.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class StationRoute {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer order;
    @JoinColumn(name = "route_id", referencedColumnName = "id")
    @ManyToOne
    private Route routeId;
    @JoinColumn(name = "station_id", referencedColumnName = "id")
    @ManyToOne
    private Station stationId;

}
