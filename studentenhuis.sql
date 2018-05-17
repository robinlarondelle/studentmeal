-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 17 mei 2018 om 01:49
-- Serverversie: 10.1.31-MariaDB
-- PHP-versie: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentenhuis`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `deelnemers`
--

CREATE TABLE `deelnemers` (
  `UserID` int(10) UNSIGNED NOT NULL,
  `StudentenhuisID` int(10) UNSIGNED NOT NULL,
  `MaaltijdID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `deelnemers`
--

INSERT INTO `deelnemers` (`UserID`, `StudentenhuisID`, `MaaltijdID`) VALUES
(1, 1, 1),
(1, 1, 21),
(1, 4, 2),
(1, 4, 3),
(1, 4, 22),
(41, 1, 4);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `maaltijd`
--

CREATE TABLE `maaltijd` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Naam` varchar(32) NOT NULL,
  `Beschrijving` varchar(64) NOT NULL,
  `Ingredienten` varchar(64) NOT NULL,
  `Allergie` varchar(32) NOT NULL,
  `Prijs` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED NOT NULL,
  `StudentenhuisID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `maaltijd`
--

INSERT INTO `maaltijd` (`ID`, `Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs`, `UserID`, `StudentenhuisID`) VALUES
(1, 'string', 'string', 'string', 'string', 0, 1, 1),
(2, 'Chips', 'Lekker', 'COOOOLAAAA', 'Lucht', 10, 1, 1),
(3, 'Chips', 'Lekker', 'COOOOLAAAA', 'Lucht', 10, 1, 1),
(4, 'tomaotensoep', 'lekker man', 'pindas', 'neuten', 10, 1, 1),
(10, 'tomaotensoep', 'lekker man', 'pindas', 'neuten', 20, 1, 1),
(11, 'tomaotensoep', 'lekker man', 'pindas', 'neuten', 20, 1, 1),
(13, 'HOI', 'MOOIE KUTMAALTIJD', 'KAAS', 'JODEN', 666, 1, 1),
(14, 'jodensoep', 'lekker man', 'pindas', 'neauten', 0, 1, 1),
(15, 'tomaotensoep', 'lekker man', 'pindas', 'neauten', 10, 1, 1),
(17, 'tomaotensoep', 'lekker man', 'pindas', 'neauten', 0, 1, 1),
(21, 'tomaotensoep', 'lekker man', 'pindas', 'neauten', 500, 1, 1),
(22, 'tomaotensoep', 'lekker man', 'pindas', 'neauten', 8, 1, 1),
(23, 'string', 'string', 'string', 'string', 0, 1, 1),
(24, 'string', 'string', 'string', 'string', 0, 1, 1),
(25, 'string', 'string', 'string', 'string', 0, 1, 1),
(26, 'string', 'string', 'string', 'string', 0, 1, 1),
(27, 'string', 'string', 'string', 'string', 0, 1, 1),
(28, 'string', 'string', 'string', 'string', 0, 1, 1),
(29, 'string', 'string', 'string', 'string', 0, 1, 1),
(30, 'string', 'string', 'string', 'string', 0, 1, 1),
(31, 'string', 'string', 'string', 'string', 0, 1, 1),
(32, 'string', 'string', 'string', 'string', 0, 1, 1),
(33, 'string', 'string', 'string', 'string', 0, 1, 1),
(34, 'string', 'string', 'string', 'string', 0, 1, 1),
(35, 'string', 'string', 'string', 'string', 0, 1, 1),
(36, 'string', 'string', 'string', 'string', 0, 1, 1),
(37, 'string', 'string', 'string', 'string', 0, 1, 1),
(38, 'string', 'string', 'string', 'string', 0, 1, 1),
(39, 'string', 'string', 'string', 'string', 0, 1, 1),
(40, 'string', 'string', 'string', 'string', 0, 1, 1),
(41, 'string', 'string', 'string', 'string', 0, 1, 1),
(42, 'string', 'string', 'string', 'string', 0, 1, 1),
(43, 'string', 'string', 'string', 'string', 0, 1, 1),
(44, 'string', 'string', 'string', 'string', 0, 1, 1),
(45, 'string', 'string', 'string', 'string', 0, 1, 1),
(46, 'string', 'string', 'string', 'string', 0, 1, 1),
(47, 'string', 'string', 'string', 'string', 0, 1, 1),
(48, 'string', 'string', 'string', 'string', 0, 1, 1),
(49, 'string', 'string', 'string', 'string', 0, 1, 1),
(50, 'string', 'string', 'string', 'string', 0, 1, 1),
(51, 'string', 'string', 'string', 'string', 0, 1, 1),
(52, 'string', 'string', 'string', 'string', 0, 1, 1),
(53, 'string', 'string', 'string', 'string', 0, 1, 1),
(54, 'string', 'string', 'string', 'string', 0, 1, 1),
(55, 'string', 'string', 'string', 'string', 0, 1, 1),
(56, 'string', 'string', 'string', 'string', 0, 1, 1),
(57, 'string', 'string', 'string', 'string', 0, 1, 1),
(58, 'string', 'string', 'string', 'string', 0, 1, 1),
(59, 'string', 'string', 'string', 'string', 0, 1, 1),
(60, 'string', 'string', 'string', 'string', 0, 1, 1),
(61, 'string', 'string', 'string', 'string', 0, 1, 1),
(62, 'string', 'string', 'string', 'string', 0, 1, 1),
(63, 'string', 'string', 'string', 'string', 0, 1, 1),
(64, 'string', 'string', 'string', 'string', 0, 1, 1),
(65, 'string', 'string', 'string', 'string', 0, 41, 1),
(66, 'string', 'string', 'string', 'string', 0, 41, 1),
(67, 'string', 'string', 'string', 'string', 0, 41, 1),
(69, 'hoi', 'lekker', 'kaas', 'neauten', 0, 41, 60),
(70, 'hoi', 'lekker', 'kaas', 'neauten', 0, 41, 60),
(71, 'string', 'string', 'string', 'string', 0, 1, 1),
(72, 'string', 'string', 'string', 'string', 0, 1, 1),
(73, 'string', 'string', 'string', 'string', 0, 1, 1),
(74, 'string', 'string', 'string', 'string', 0, 1, 1),
(75, 'string', 'string', 'string', 'string', 0, 1, 1),
(76, 'string', 'string', 'string', 'string', 0, 1, 1),
(77, 'string', 'string', 'string', 'string', 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `studentenhuis`
--

CREATE TABLE `studentenhuis` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Naam` varchar(32) NOT NULL,
  `Adres` varchar(32) DEFAULT 'hier het adres',
  `UserID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `studentenhuis`
--

INSERT INTO `studentenhuis` (`ID`, `Naam`, `Adres`, `UserID`) VALUES
(1, 'string', 'string', 1),
(4, 'Huiz', 'Galgenbaan', 1),
(5, 'Huiz', 'Galgenbaan', 1),
(6, 'Huiz', 'Galgenbaan', 1),
(7, 'Roffa', 'Rotterdam', 1),
(8, 'Roffa', 'Rotterdam', 1),
(9, 'Roffa', 'Rotterdam', 1),
(10, 'Frank', 'GFI', 1),
(11, 'Roffa', 'Rotterdam', 1),
(12, 'Bredda', 'Rotterdam', 1),
(13, 'Roffa', 'Rotterdam', 1),
(14, 'Roffa', 'Rotterdam', 1),
(17, 'Roffa', 'Rotterdam', 1),
(18, 'Roffa', 'Rotterdam', 1),
(19, 'Roffa', 'Rotterdam', 1),
(20, 'Roffa', 'Rotterdam', 1),
(24, 'Bredda', 'GallaBannah 10', 1),
(25, 'undefined', 'GallaBannah 10', 1),
(26, 'undefined', 'GallaBannah 10', 1),
(27, 'undefined', 'GallaBannah 10', 1),
(28, 'undefined', 'GallaBannah 10', 1),
(29, 'undefined', 'GallaBannah 10', 1),
(30, 'Frank', 'Hut', 1),
(31, 'Frank', 'Hut', 1),
(32, 'string', 'string', 1),
(33, 'string', 'string', 1),
(34, 'string', 'string', 1),
(35, 'string', 'string', 1),
(36, 'string', 'string', 1),
(37, 'string', 'string', 1),
(38, 'string', 'string', 1),
(39, 'string', 'string', 1),
(40, 'string', 'string', 1),
(41, 'string', 'string', 1),
(42, 'string', 'string', 1),
(43, 'string', 'string', 1),
(44, 'string', 'string', 1),
(45, 'string', 'string', 1),
(46, 'string', 'string', 1),
(47, 'string', 'string', 1),
(48, 'string', 'string', 1),
(49, 'string', 'string', 1),
(50, 'string', 'string', 1),
(51, 'string', 'string', 1),
(52, 'string', 'string', 1),
(53, 'string', 'string', 1),
(54, 'string', 'string', 1),
(55, 'string', 'string', 1),
(56, 'string', 'string', 1),
(57, 'string', 'string', 1),
(58, 'string', 'string', 1),
(59, 'string', 'string', 1),
(60, 'string', 'string', 1),
(61, 'string', 'string', 1),
(62, 'string', 'string', 1),
(63, 'string', 'string', 1),
(64, 'string', 'string', 1),
(65, 'string', 'string', 1),
(66, 'string', 'string', 1),
(67, 'string', 'string', 1),
(68, 'string', 'string', 1),
(69, 'string', 'string', 1),
(70, 'string', 'string', 1),
(71, 'string', 'string', 1),
(72, 'string', 'string', 1),
(73, 'string', 'string', 1),
(74, 'string', 'string', 1),
(75, 'hoi', 'lovensdijkstraat', 41),
(76, 'hoi', 'lovensdijkstraat', 41),
(78, 'string', 'string', 1),
(79, 'string', 'string', 1),
(80, 'string', 'string', 1),
(81, 'string', 'string', 1),
(82, 'string', 'string', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Voornaam` varchar(32) NOT NULL,
  `Achternaam` varchar(32) NOT NULL,
  `Email` varchar(32) NOT NULL,
  `Password` char(64) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user`
--

INSERT INTO `user` (`ID`, `Voornaam`, `Achternaam`, `Email`, `Password`) VALUES
(1, 'Jan', 'Smit', 'jsmit@server.nl', 'secret'),
(2, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(3, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(4, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(5, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(6, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(7, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(8, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(9, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(10, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(11, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(12, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(13, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(14, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(15, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(16, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(17, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(18, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(19, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(20, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(21, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(22, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(23, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(24, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(25, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(26, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(27, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(28, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(29, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(30, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(31, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(32, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(33, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(34, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(35, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(36, '', '', 'KRIJGKANKER', 'tyfus'),
(37, 'string', 'string', 'string', 'string'),
(38, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(39, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(40, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(41, 'string', 'string', 'string@jemoeder.nl', '$2b$10$qkMXxWyhFRtBEPJToIcFGO1RWhdRzkoGz2JVpMbfdwx5aMn/YEQqK'),
(42, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(43, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(44, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(45, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(46, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(47, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(48, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(49, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(50, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(51, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(52, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(53, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(54, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(55, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(56, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(57, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(58, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(59, 'tjurd', 'skepers', 'string@jemoedr.nl', 'secret'),
(60, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(61, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(62, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(63, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(64, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(65, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(66, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(67, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(68, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(69, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(70, '', '', '', ''),
(71, 'TJUUURUUDD', 'SKEPURS', 'sjoerd@schepers.nl', 'geheimpie'),
(72, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(73, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(74, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(75, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(76, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(77, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(78, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(79, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(80, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(81, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(82, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(83, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(84, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(85, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(86, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(87, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(88, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(89, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret'),
(90, 'Robin', 'La Rondelle', 'robinlarondelle@hotmail.com', 'secret');

-- --------------------------------------------------------

--
-- Stand-in structuur voor view `view_deelnemers`
-- (Zie onder voor de actuele view)
--
CREATE TABLE `view_deelnemers` (
`StudentenhuisID` int(10) unsigned
,`MaaltijdID` int(10) unsigned
,`Voornaam` varchar(32)
,`Achternaam` varchar(32)
,`Email` varchar(32)
);

-- --------------------------------------------------------

--
-- Stand-in structuur voor view `view_studentenhuis`
-- (Zie onder voor de actuele view)
--
CREATE TABLE `view_studentenhuis` (
`ID` int(10) unsigned
,`Naam` varchar(32)
,`Adres` varchar(32)
,`Contact` varchar(65)
,`Email` varchar(32)
);

-- --------------------------------------------------------

--
-- Structuur voor de view `view_deelnemers`
--
DROP TABLE IF EXISTS `view_deelnemers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_deelnemers`  AS  select `deelnemers`.`StudentenhuisID` AS `StudentenhuisID`,`deelnemers`.`MaaltijdID` AS `MaaltijdID`,`user`.`Voornaam` AS `Voornaam`,`user`.`Achternaam` AS `Achternaam`,`user`.`Email` AS `Email` from (`deelnemers` left join `user` on((`deelnemers`.`UserID` = `user`.`ID`))) ;

-- --------------------------------------------------------

--
-- Structuur voor de view `view_studentenhuis`
--
DROP TABLE IF EXISTS `view_studentenhuis`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_studentenhuis`  AS  select `ID` AS `ID`,`Naam` AS `Naam`,`Adres` AS `Adres`,concat(`user`.`Voornaam`,' ',`user`.`Achternaam`) AS `Contact`,`user`.`Email` AS `Email` from (`studentenhuis` left join `user` on((`UserID` = `user`.`ID`))) ;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `deelnemers`
--
ALTER TABLE `deelnemers`
  ADD PRIMARY KEY (`UserID`,`StudentenhuisID`,`MaaltijdID`),
  ADD KEY `fk_deelnemers_studentenhuis` (`StudentenhuisID`),
  ADD KEY `fk_deelnemers_maaltijd` (`MaaltijdID`);

--
-- Indexen voor tabel `maaltijd`
--
ALTER TABLE `maaltijd`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_maaltijd_user` (`UserID`),
  ADD KEY `fk_maaltijd_studentenhuis` (`StudentenhuisID`);

--
-- Indexen voor tabel `studentenhuis`
--
ALTER TABLE `studentenhuis`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_studentenhuis_user` (`UserID`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `maaltijd`
--
ALTER TABLE `maaltijd`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT voor een tabel `studentenhuis`
--
ALTER TABLE `studentenhuis`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `deelnemers`
--
ALTER TABLE `deelnemers`
  ADD CONSTRAINT `fk_deelnemers_maaltijd` FOREIGN KEY (`MaaltijdID`) REFERENCES `maaltijd` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_deelnemers_studentenhuis` FOREIGN KEY (`StudentenhuisID`) REFERENCES `studentenhuis` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_deelnemers_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `maaltijd`
--
ALTER TABLE `maaltijd`
  ADD CONSTRAINT `fk_maaltijd_studentenhuis` FOREIGN KEY (`StudentenhuisID`) REFERENCES `studentenhuis` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_maaltijd_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `studentenhuis`
--
ALTER TABLE `studentenhuis`
  ADD CONSTRAINT `fk_studentenhuis_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
