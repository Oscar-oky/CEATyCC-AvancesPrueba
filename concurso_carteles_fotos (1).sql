-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 21-04-2026 a las 18:24:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdceatycc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concurso_carteles_fotos`
--

CREATE TABLE `concurso_carteles_fotos` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `event_type` varchar(50) DEFAULT 'carteles',
  `uploaded_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `concurso_carteles_fotos`
--

INSERT INTO `concurso_carteles_fotos` (`id`, `url`, `filename`, `event_type`, `uploaded_by`, `created_at`) VALUES
(158, '/public/concurso-carteles/1775849689544-WhatsApp_Image_2026-03-12_at_9.30.31_AM.jpeg', '1775849689544-WhatsApp_Image_2026-03-12_at_9.30.31_AM.jpeg', 'carteles', 'test_user@example.com', '2026-04-10 19:34:49'),
(159, '/public/concurso-carteles/1775849696913-Captura_de_pantalla_2026-03-09_082844.png', '1775849696913-Captura_de_pantalla_2026-03-09_082844.png', 'carteles', 'test_user@example.com', '2026-04-10 19:34:56'),
(160, '/public/concurso-carteles/1775849696917-Captura_de_pantalla_2026-03-09_083105.png', '1775849696917-Captura_de_pantalla_2026-03-09_083105.png', 'carteles', 'test_user@example.com', '2026-04-10 19:34:56'),
(161, '/public/concurso-carteles/1775849696919-Captura_de_pantalla_2026-03-09_134819.png', '1775849696919-Captura_de_pantalla_2026-03-09_134819.png', 'carteles', 'test_user@example.com', '2026-04-10 19:34:56'),
(162, '/public/concurso-carteles/1775849696925-Captura_de_pantalla_2026-03-12_102356.png', '1775849696925-Captura_de_pantalla_2026-03-12_102356.png', 'carteles', 'test_user@example.com', '2026-04-10 19:34:56'),
(163, '/public/concurso-carteles/1775849696928-Captura_de_pantalla_2026-03-25_200322.png', '1775849696928-Captura_de_pantalla_2026-03-25_200322.png', 'carteles', 'test_user@example.com', '2026-04-10 19:34:56');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `concurso_carteles_fotos`
--
ALTER TABLE `concurso_carteles_fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_event_type` (`event_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `concurso_carteles_fotos`
--
ALTER TABLE `concurso_carteles_fotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
