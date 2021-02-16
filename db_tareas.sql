-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2021 a las 15:04:23
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `idTareas` int(11) NOT NULL,
  `nombreTarea` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(100) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`idTareas`, `nombreTarea`, `fecha`, `estado`, `idUsuario`) VALUES
(125, 'pendiente 18', '2020-12-17', 'realizado', 1),
(138, 'Esto esta actualizado por el swager', '2021-01-21', 'Realizado', 1),
(139, 'ya esta no molestan mas', '2020-12-16', 'pendiente', 1),
(157, 'listo ya esta ', '0000-00-00', 'activo', 1),
(175, 'hola mundo 3', '2020-12-01', 'realizado', 1),
(176, 'creacion', '2021-01-07', 'activo', 2),
(177, 'test', '2021-01-12', 'activo', 6),
(178, 'holis', '2021-01-13', 'realizado', 7),
(180, 'listo', '2021-01-16', 'pendiente', 17),
(182, 'intentar hacer una labor del trabajo sin que me echen.', '2021-01-28', 'pendiente', 18),
(184, 'asdsafsd', '2021-01-21', 'activo', 18),
(185, 'make dinner this evening', '2021-01-19', 'pendiente', 18),
(187, 'jesus me la pela', '2021-01-21', 'chito', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `correo`, `contraseña`) VALUES
(1, 'juan david', 'rivera garzon', 'xenogenesis45@gmail.com', '12345'),
(2, 'pepito', 'perez', 'pepito@hotmail.com', '12345'),
(3, 'david', 'rivera', 'x@gmail.com', '123'),
(4, 'qwe', 'qwe', 'q@hot', '123'),
(5, 'pablo', 'andres', 'pablps@hotmail.com', '123'),
(6, 'test', 'test', 'test@test.com', '123'),
(7, 'mama', 'disimo', 'mamadisimo@xxx.com', '1234567890'),
(8, 'test', 'test', 'test@test.com', '123'),
(9, 'mama', 'disimo', 'mamadisimo@xxx.com', '1234567890'),
(10, 'benito', 'camelas', 'benitoca', '12345'),
(11, 'benito', 'camelas', 'benitoca', '12345'),
(12, 'HCM', 'CMH', 'hcm@gmail.com', '12345'),
(13, 'benito2', 'camelas2', 'benitocamelas@gmail.com', '12345'),
(14, 'puto el que lea esto', 'camelas2', 'benitocamelas@gmail.com', '12345'),
(15, 'puto el que lea esto', 'camelas2', 'benitocamelas@gmail.com', '12345'),
(16, 'puto el que lea esto', 'camelas2', 'benitocamelas@gmail.com', '12345'),
(17, 'juan', 'rivera', 'a@hotmail.com', '123'),
(18, 'malta', 'cortez', 'putoelqueleaesto@gmail.com', 'puto');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`idTareas`),
  ADD KEY `idUsuario` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `idTareas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
