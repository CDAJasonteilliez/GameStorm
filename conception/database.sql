CREATE DATABASE IF NOT EXISTS `gamestorm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gamestorm`;

CREATE TABLE IF NOT EXISTS `utilisateur`
(
    `id` INT PRIMARY KEY NOT NULL auto_increment ,
    `name` VARCHAR(255) NOT NULL UNIQUE ,
    `email` VARCHAR(255) NOT NULL UNIQUE ,
    `password` VARCHAR(255) NOT NULL ,
    `avatar` VARCHAR(255) NULL ,
    `verify` TINYINT(1) NOT NULL ,
    `active` TINYINT(1) NOT NULL ,
    `role` VARCHAR(255) NOT NULL ,
    `createdAt` TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `game`
(
    `id` INT PRIMARY KEY NOT NULL auto_increment ,
    `name` VARCHAR(255) NOT NULL UNIQUE ,
    `link` VARCHAR(255) NOT NULL UNIQUE ,
    `miniature` VARCHAR(255) NOT NULL ,
    `description` TEXT NOT NULL ,
    `active` TINYINT(1) NOT NULL ,
    `addedAt` TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `score`
(
    `id` INT PRIMARY KEY NOT NULL auto_increment ,
    `score` INT NOT NULL ,
    `date` TIMESTAMP ,
    `utilisateur_id` INT NOT NULL ,
    `game_id` INT NOT NULL ,
    CONSTRAINT `FK_score_user` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_score_game` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `temp`
(
    `id` INT PRIMARY KEY NOT NULL auto_increment ,
    `type` VARCHAR(255) NOT NULL ,
    `link` VARCHAR(255) NOT NULL ,
    `pass` VARCHAR(255) NOT NULL ,
    `createdAt` TIMESTAMP ,
    `expiderAt` TIMESTAMP ,
    `utilisateur_id` INT NOT NULL ,
    CONSTRAINT `FK_temp_user` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);




