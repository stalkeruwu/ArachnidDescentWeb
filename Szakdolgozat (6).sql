CREATE DATABASE `arachnid_descent`;
USE `arachnid_descent`;
CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `email` varchar(255),
  `password_hash` varchar(255),
  `verification_token` varchar(255),
  `is_verified` BOOLEAN,
  `balance` int
);

CREATE TABLE `user_skin` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `skin_id` int,
  `acquired_at` datetime
);

CREATE TABLE `user_runs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `run_id` int,
  `coins` int
);

CREATE TABLE `runs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `map_id` int,
  `date` datetime,
  `run_time` time
);

CREATE TABLE `maps` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `skins` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `rarity_id` int
);

CREATE TABLE `rarities` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `chance` double,
  `price` int
);

ALTER TABLE `user_runs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_runs` ADD FOREIGN KEY (`run_id`) REFERENCES `runs` (`id`);

ALTER TABLE `user_skin` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_skin` ADD FOREIGN KEY (`skin_id`) REFERENCES `skins` (`id`);

ALTER TABLE `runs` ADD FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`);

ALTER TABLE `skins` ADD FOREIGN KEY (`rarity_id`) REFERENCES `rarities` (`id`);

ALTER TABLE `users` 
ADD COLUMN `reset_password_token` varchar(255),
ADD COLUMN `reset_token_expiry` datetime;

ALTER TABLE `skins` 
ADD COLUMN `image_url` varchar(255);
