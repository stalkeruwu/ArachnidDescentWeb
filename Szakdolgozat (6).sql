-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 27. 18:35
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `arachnid_descent`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `maps`
--

CREATE TABLE `maps` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rarities`
--

CREATE TABLE `rarities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `chance` double DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `rarities`
--

INSERT INTO `rarities` (`id`, `name`, `chance`, `price`) VALUES
(1, 'Common', 50, 10),
(2, 'Rare', 40, 20);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `runs`
--

CREATE TABLE `runs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `run_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `skins`
--

CREATE TABLE `skins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rarity_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `skins`
--

INSERT INTO `skins` (`id`, `name`, `rarity_id`, `image_url`) VALUES
(1, 'Pumpkin', 1, 'Pumpkin.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `verification_token`, `is_verified`, `balance`, `reset_password_token`, `reset_token_expiry`) VALUES
(1, 'Forry04', 'ebarni04@gmail.com', '$2b$10$F/M8cJqRRlEeDc5os6WLSe6fw1aFKygbVpEIRKioZBFEEzAYV/wo2', 'fd200f6932dbf0c72ba3559a3d169a4072d1b329acdc6149279b13bc12ac2b48', 1, 99989, NULL, NULL),
(2, 'Forry', 'ebarniyt@gmail.com', '$2b$10$wW0uhJPQf7AoRwN4doxrs.LUzTkRBl9Ga8gY1VVZwpsJ5hNBmd/32', NULL, 1, NULL, NULL, NULL),
(3, 'Forry04', 'forryofficial1@gmail.com', '$2b$10$c3jbXlRf1jXJ8XgFpvca4.kBO.D0moUrh2MTwR2VB0r4twrkxqhGq', NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_runs`
--

CREATE TABLE `user_runs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `run_id` int(11) DEFAULT NULL,
  `coins` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_skin`
--

CREATE TABLE `user_skin` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `skin_id` int(11) DEFAULT NULL,
  `acquired_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_skin`
--

INSERT INTO `user_skin` (`id`, `user_id`, `skin_id`, `acquired_at`) VALUES
(2, 1, 1, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rarities`
--
ALTER TABLE `rarities`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `map_id` (`map_id`);

--
-- A tábla indexei `skins`
--
ALTER TABLE `skins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rarity_id` (`rarity_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user_runs`
--
ALTER TABLE `user_runs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `run_id` (`run_id`);

--
-- A tábla indexei `user_skin`
--
ALTER TABLE `user_skin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `skin_id` (`skin_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rarities`
--
ALTER TABLE `rarities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `runs`
--
ALTER TABLE `runs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `skins`
--
ALTER TABLE `skins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `user_runs`
--
ALTER TABLE `user_runs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_skin`
--
ALTER TABLE `user_skin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `runs`
--
ALTER TABLE `runs`
  ADD CONSTRAINT `runs_ibfk_1` FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`);

--
-- Megkötések a táblához `skins`
--
ALTER TABLE `skins`
  ADD CONSTRAINT `skins_ibfk_1` FOREIGN KEY (`rarity_id`) REFERENCES `rarities` (`id`);

--
-- Megkötések a táblához `user_runs`
--
ALTER TABLE `user_runs`
  ADD CONSTRAINT `user_runs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_runs_ibfk_2` FOREIGN KEY (`run_id`) REFERENCES `runs` (`id`);

--
-- Megkötések a táblához `user_skin`
--
ALTER TABLE `user_skin`
  ADD CONSTRAINT `user_skin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_skin_ibfk_2` FOREIGN KEY (`skin_id`) REFERENCES `skins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
