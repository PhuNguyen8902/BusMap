create database `bus_station`;
use `bus_station`;
create table `user` (
	`id` VARCHAR(50) PRIMARY KEY,
    `email` NVARCHAR(100) NOT NULL UNIQUE,
    `user_name` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `name` NVARCHAR(100) DEFAULT NULL,
    `role` VARCHAR(100) DEFAULT NULL,
    `is_active` TINYINT DEFAULT 1
);
create table `route`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` NVARCHAR(255) DEFAULT NULL,
    `distance` DOUBLE DEFAULT NULL,
    `duration` int DEFAULT NULL,
    `route_num` VARCHAR(50) DEFAULT NULL unique,
    `start_time` time default null,
     `end_time` time default null,
     `is_active` TINYINT DEFAULT 1
);
create table `station`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` NVARCHAR(100) DEFAULT NULL,
    `address` NVARCHAR(255) DEFAULT NULL,
    `latitude` double default null,
    `longitude` double default null,
    `code`	VARCHAR(20) DEFAULT NULL unique,
	`is_active` TINYINT DEFAULT 1
);
create table `station_route`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `order` int default null,
	`route_id` int DEFAULT NULL,
    `station_id` int default null,
	KEY `fk_station_route_station` (`station_id`),
    KEY `fk_station_route_route` (`route_id`),
    CONSTRAINT `fk_station_route_station` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_station_route_route` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`) ON DELETE CASCADE
);
create table `trip`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `start_time` time DEFAULT NULL,
    `route_id` INT DEFAULT NULL,
    KEY `fk_trip_route` (`route_id`),
    CONSTRAINT `fk_trip_route` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`) ON DELETE CASCADE
);
create table `feedback`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `content` NVARCHAR(255) DEFAULT NULL,
	`route_id` INT DEFAULT NULL,
    `user_id` VARCHAR(50) DEFAULT NULL,
	KEY `fk_feedback_route` (`route_id`),
    KEY `fk_trip_user` (`user_id`),
    CONSTRAINT `fk_feedback_route` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_trip_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);
