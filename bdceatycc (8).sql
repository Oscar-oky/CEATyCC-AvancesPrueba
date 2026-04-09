-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 09-04-2026 a las 16:58:41
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
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `label` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `color` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`label`, `category`, `color`) VALUES
('Bloque', 'bloque', '#0040ff'),
('Computo en la Nube', 'computo-en-la-nube', '#fbff00'),
('Prueba1', 'prueba1', '#ff0000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_reconocimientos`
--

CREATE TABLE `categorias_reconocimientos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `asunto` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `captcha_valido` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id`, `nombre`, `correo`, `telefono`, `asunto`, `mensaje`, `captcha_valido`, `created_at`) VALUES
(23, 'Oscar Alexandro Morales Galván', 'oscargalvan2724@gmail.com', '4181137544', 'adadeadas', 'adadadasd', 1, '2026-01-15 19:21:55'),
(24, 'Oscar2 Alexandro Morales Galván', 'oscargalvan2724@gmail.com', '4181137544', 'sadasdadasdadadad', 'asdasdasdadasdada', 1, '2026-01-15 19:25:55'),
(25, 'Oscar Alexandro Morales Galván', 'oscargalvan2724@gmail.com', '4181137544', 'afasdasdasdasdas', 'asdasdadasdasdas', 1, '2026-01-15 19:29:23'),
(26, 'oscar alexandro morales galvan', 'oscar@gmail.com', '3453535', 'adsadadsadasdadadasdasdasdasdasdas', 'asdsadmndvmnsdavvdvanbsvdnbvanbdnbv', 1, '2026-01-15 19:43:03'),
(27, 'oscar alexandro morales galvan', 'oscargalvan2724@gmail.com', '419 113 7544', 'aaaaaaaaaaaaaaaaaaaa', 'eeeeeeeeeeeeeeeeeee', 1, '2026-01-15 19:47:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `startTime` varchar(255) DEFAULT NULL,
  `endTime` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `photos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`photos`)),
  `videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`videos`)),
  `featured_videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`documents`)),
  `locationLink` text DEFAULT NULL,
  `publicationDate` date DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT 0.00,
  `capacidad` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Programado',
  `organizador` varchar(255) DEFAULT NULL,
  `capacidad_maxima` int(11) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `mainPhoto` varchar(255) DEFAULT NULL,
  `times` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`times`)),
  `photo_folders` text DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `startTime`, `endTime`, `location`, `category`, `color`, `photos`, `videos`, `featured_videos`, `documents`, `locationLink`, `publicationDate`, `precio`, `capacidad`, `estado`, `organizador`, `capacidad_maxima`, `costo`, `mainPhoto`, `times`, `photo_folders`) VALUES
('1762360421425-Foro 1', 'Foro 1', 'BLOQUE - Centro de Innovación y Tecnología Creativa\n', '2025-05-22', '09:00', '17:00', 'Bloque', 'computo-en-la-nube', '#fbff00', '[\"/public/uploads/1767993602138-Concurso_de_Programacion...jpeg\",\"/public/uploads/1767993602142-Concurso_de_Programacion..jpeg\",\"/public/uploads/1767993602145-Concurso_de_Programacion.jpeg\",\"/public/uploads/1768333467263-f1-15.jpeg\",\"/public/uploads/1768333467264-f1-14.jpeg\",\"/public/uploads/1768333467265-f1-13.jpeg\"]', '[]', '[]', '[]', 'https://maps.app.goo.gl/ecCe1TrVTePoE4kB8', NULL, 0.00, NULL, 'Programado', NULL, 0, 0.00, '/public/uploads/1767993602146-evento-Foro_1-1.jpg', '[{\"startTime\":\"09:00\",\"endTime\":\"17:00\"}]', '[{\"id\":\"folder-1768537684578\",\"name\":\"2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING\",\"photos\":[]},{\"id\":\"folder-1768537806718\",\"name\":\"2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING(2)\",\"photos\":[]}]'),
('1766156493584-2° FORO DE', '2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y CLOUD COMPUTING', 'REGÍSTRATE\n\nhttps://site39574-vlysiu.scloudsite101.com/\n', '2026-03-19', '09:00', '15:00', 'Bloque', 'bloque', '#0040ff', '[]', '[\"/public/uploads/1768503082071-1er_Foro.mp4\"]', '[\"/public/uploads/1768503082071-1er_Foro.mp4\"]', '[]', 'https://maps.app.goo.gl/FfWUaHMqug4LXaqj7', NULL, 0.00, NULL, 'Programado', NULL, 0, 0.00, '/public/uploads/1767818961182-Foro_2.jpeg', '[{\"startTime\":\"09:00\",\"endTime\":\"15:00\"},{\"startTime\":\"16:00\",\"endTime\":\"19:00\"}]', '[]'),
('1767819157512-2° FORO DE', '2° FORO DE EDUCACIÓN EN ALTA TECNOLOGÍA Y COMPUTACIÓN EN LA NUBE', 'REGÍSTRATE\n\nhttps://site39574-vlysiu.scloudsite101.com/', '2026-03-20', '09:00', '15:00', 'Bloque', 'computo-en-la-nube', '#fbff00', '[]', '[\"/public/uploads/1768503271507-1er_Foro.mp4\"]', '[]', '[]', 'https://maps.app.goo.gl/FfWUaHMqug4LXaqj7', NULL, 0.00, NULL, 'Programado', NULL, NULL, 0.00, '/public/uploads/1767894720430-Foro_2.png', '[{\"startTime\":\"09:00\",\"endTime\":\"15:00\"},{\"startTime\":\"16:00\",\"endTime\":\"19:00\"}]', '[]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id` int(11) NOT NULL COMMENT 'ID único de la inscripción',
  `evento_id` varchar(255) NOT NULL COMMENT 'ID del evento (FK a events.id)',
  `usuario_email` varchar(255) NOT NULL COMMENT 'Email del usuario (FK a users.email)',
  `estado` varchar(50) NOT NULL DEFAULT 'solicitado' COMMENT 'Estado de la inscripción (solicitado, aprobado, negado)',
  `fecha_inscripcion` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha y hora de la solicitud'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id`, `evento_id`, `usuario_email`, `estado`, `fecha_inscripcion`) VALUES
(45, '1766156493584-2° FORO DE', 'oscargalvan2724@gmail.com', 'aprobado', '2026-01-16 17:39:11'),
(46, '1767819157512-2° FORO DE', 'oscargalvan2724@gmail.com', 'aprobado', '2026-01-16 17:39:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reconocimientos`
--

CREATE TABLE `reconocimientos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `premio` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `institucion` varchar(255) NOT NULL DEFAULT '',
  `pdfUrl` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scans`
--

CREATE TABLE `scans` (
  `id` int(11) NOT NULL,
  `qr_data` text DEFAULT NULL,
  `estatus` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `fecha` date DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `nombre_evento` varchar(100) DEFAULT NULL,
  `id_registro` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL COMMENT 'Email del usuario, clave primaria',
  `name` varchar(255) NOT NULL COMMENT 'Nombre completo del usuario',
  `password` varchar(255) NOT NULL COMMENT 'Contraseña (debe ser hasheada)',
  `role` varchar(50) NOT NULL DEFAULT 'user' COMMENT 'Rol del usuario (ej. user, admin)',
  `status` varchar(255) DEFAULT 'active',
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `name`, `password`, `role`, `status`, `resetToken`, `resetTokenExpires`) VALUES
('jequintana@queretaro.gob.mx', 'Jacinto E. Quintana Landaverde', '$2b$10$2ev2Au0wzx8vojiRzurcBusuN.HEPucDUKXKLmt7w6uFlHcdU.IhK', 'admin', 'active', NULL, NULL),
('oscargalvan2724@gmail.com', 'Oscar Alexandro Morales Galvan', '$2b$10$IE6hcO3qJr3K9aA2suGq.uPqCUkZQ.q.YzRgOs4fGmIlA.fGDSyVK', 'user', 'active', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_eventos`
--

CREATE TABLE `usuarios_eventos` (
  `id_registro` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `nombre_alumno` varchar(100) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `nombre_evento` varchar(100) NOT NULL,
  `estatus` varchar(50) NOT NULL,
  `fecha_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`category`);

--
-- Indices de la tabla `categorias_reconocimientos`
--
ALTER TABLE `categorias_reconocimientos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evento_id` (`evento_id`),
  ADD KEY `usuario_email` (`usuario_email`);

--
-- Indices de la tabla `reconocimientos`
--
ALTER TABLE `reconocimientos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `usuarios_eventos`
--
ALTER TABLE `usuarios_eventos`
  ADD PRIMARY KEY (`id_registro`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_reconocimientos`
--
ALTER TABLE `categorias_reconocimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID único de la inscripción', AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `reconocimientos`
--
ALTER TABLE `reconocimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios_eventos`
--
ALTER TABLE `usuarios_eventos`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`usuario_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
