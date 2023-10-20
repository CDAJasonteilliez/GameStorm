CREATE DATABASE IF NOT EXISTS `gamestorm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gamestorm`;

CREATE TABLE IF NOT EXISTS `utilisateur`
(
    `user_id` INT PRIMARY KEY NOT NULL auto_increment ,
    `user_name` VARCHAR(20) NOT NULL UNIQUE ,
    `user_mail` VARCHAR(100) NOT NULL UNIQUE ,
    `user_password` VARCHAR(60) NOT NULL ,
    `user_avatar` VARCHAR(120) NULL ,
    `user_kind` INT NOT NULL DEFAULT '2' ,
    `user_date_inscription` TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `game`
(
    `game_id` INT PRIMARY KEY NOT NULL auto_increment ,
    `game_name` VARCHAR(20) NOT NULL UNIQUE ,
    `game_description` TEXT NOT NULL ,
    `game_miniature` VARCHAR(100) NOT NULL ,
    `game_lien` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `score`
(
    `score_id` INT PRIMARY KEY NOT NULL auto_increment ,
    `score_user_id` INT NOT NULL ,
    `score_game_id` INT NOT NULL ,
    `score_score` INT NOT NULL ,
    `score_date` VARCHAR(20) NOT NULL ,
    CONSTRAINT `FK_score_user` FOREIGN KEY (`score_user_id`) REFERENCES `utilisateur`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_score_game` FOREIGN KEY (`score_game_id`) REFERENCES `game`(`game_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `temp`
(
    `temp_id` INT PRIMARY KEY NOT NULL auto_increment ,
    `temp_user_id` INT NOT NULL ,
    `temp_lien` VARCHAR(100) NOT NULL ,
    `temp_pass` VARCHAR(60) NOT NULL ,
    `temp_date` TIMESTAMP
    CONSTRAINT `FK_temp_user` FOREIGN KEY (`temp_user_id`) REFERENCES `utilisateur`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);