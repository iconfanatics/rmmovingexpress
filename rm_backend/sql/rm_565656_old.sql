-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2025 at 12:00 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rm_565656`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '1743624280706_contact_schema', 1, '2025-04-02 20:07:44'),
(2, '1756160150824_adonis_test_one_schema', 2, '2025-08-25 23:14:31');

-- --------------------------------------------------------

--
-- Table structure for table `adonis_test_ones`
--

CREATE TABLE `adonis_test_ones` (
  `id` int(10) UNSIGNED NOT NULL,
  `photo` varchar(254) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `subject` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `subject`, `message`, `created_at`, `updated_at`) VALUES
(1, 'asdfasd', 'asdfasd@asdf.asdf', '2342342222', '234', 'kasem', '2025-04-03 03:16:57', '2025-04-03 03:16:57'),
(2, 'asdfasd', 'asdfasd@asdf.asdf', '2342342222', '234', 'kasem', '2025-04-03 03:20:00', '2025-04-03 03:20:00'),
(3, 'asdfasd', 'asdfasd@asdf.asdf', '2342342222', '234', 'kasem', '2025-04-03 03:20:55', '2025-04-03 03:20:55'),
(4, 'Mizan', 'mizan@gmail.com', '0145544555', 'test', 'hello bd', '2025-04-19 15:27:32', '2025-04-19 15:27:32'),
(5, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:15', '2025-08-17 02:13:15'),
(6, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:15', '2025-08-17 02:13:15'),
(7, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:15', '2025-08-17 02:13:15'),
(8, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:15', '2025-08-17 02:13:15'),
(9, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:14', '2025-08-17 02:13:14'),
(10, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:15', '2025-08-17 02:13:15'),
(11, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:19', '2025-08-17 02:13:19'),
(12, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:19', '2025-08-17 02:13:19'),
(13, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:19', '2025-08-17 02:13:19'),
(14, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:19', '2025-08-17 02:13:19'),
(15, 'asdf', 'asdf@sadf.asdf', '0172587598', 'sdasd', 'asdfasfsadf', '2025-08-17 02:13:19', '2025-08-17 02:13:19'),
(16, 'sdfadf', 'asdf@asdf.asdf', '0880171236', 'asdfasd', 'asdf', '2025-08-17 02:15:09', '2025-08-17 02:15:09'),
(17, 'asdf', 'asdf@afdds.asdf', '0880171236', 'asdf', 'asdf', '2025-08-17 02:15:44', '2025-08-17 02:15:44'),
(18, 'asdf', 'asdf@afdds.asdf', '0880171236', 'asdf', 'asdf', '2025-08-17 02:22:56', '2025-08-17 02:22:56'),
(19, 'asdf', 'aasdf@asdf.asdf', '0880171236', 'asdf', 'asdfdafgdf', '2025-08-17 02:24:48', '2025-08-17 02:24:48'),
(20, 'Md Mizan', 'asdfas@asdf.asdf', '0880171236', 'asdf', 'asfd', '2025-08-17 02:28:40', '2025-08-17 02:28:40'),
(21, 'asdf', 'asdf@asdf.asdf', '0880171236', 'asdf', 'asdf', '2025-08-17 02:49:49', '2025-08-17 02:49:49'),
(22, 'afasdf', 'asdfasd@sdf.adf', '0880171236', 'asdf', 'asdf', '2025-08-17 02:50:14', '2025-08-17 02:50:14'),
(23, 'Md Mizan', 'asdfas@sdfas.asdf', '0880171236', 'asdf', 'asdf', '2025-08-17 02:53:43', '2025-08-17 02:53:43'),
(24, 'sdfg', 'sgsdf@afd', '0880171236', 'asdf', 'asdf', '2025-08-17 02:56:10', '2025-08-17 02:56:10'),
(25, 'asdf', 'dfasdfasd@asdf.adf', '0880171236', 'sadf', 'asdf', '2025-08-17 02:56:28', '2025-08-17 02:56:28'),
(26, '', 'asdfasd@af.asfd', '0880171236', NULL, 'asdf', '2025-08-17 02:58:06', '2025-08-17 02:58:06'),
(27, '', 'asdfasd@af.asfd', '0880171236', NULL, 'asdf', '2025-08-17 02:58:41', '2025-08-17 02:58:41'),
(28, '', 'asdfasd@af.asfd', '0880171236', NULL, 'asdf', '2025-08-17 03:00:20', '2025-08-17 03:00:20'),
(29, 'Md Mizan', 'asdf@asdf.asdf', '0880171236', 'rtrrrrr sdfg s sdfg', 'yuky hfdgh', '2025-08-17 03:38:04', '2025-08-17 03:38:04'),
(30, 'sdf', 'asdf@asdf.asf', '0880171236', 'asdf', 'asfasd', '2025-08-17 03:52:04', '2025-08-17 03:52:04'),
(31, 'asdf', 'sadf@asdf.asdf', '0880171236', 'asdf', 'sdfgg', '2025-08-17 03:53:40', '2025-08-17 03:53:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adonis_test_ones`
--
ALTER TABLE `adonis_test_ones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `adonis_test_ones`
--
ALTER TABLE `adonis_test_ones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=400;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
