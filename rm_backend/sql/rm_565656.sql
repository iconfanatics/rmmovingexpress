-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2025 at 12:03 AM
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
-- Table structure for table `aboutuses`
--

CREATE TABLE `aboutuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `sort_title` varchar(254) DEFAULT NULL,
  `title` varchar(254) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aboutuses`
--

INSERT INTO `aboutuses` (`id`, `sort_title`, `title`, `details`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Elit sed doloremque Update', 'Ullam iure eveniet  Update', '<p>Alias non enim quam . Update</p>', '11483428_ad.jpg', 1, '2025-09-06 01:25:46', '2025-09-06 01:28:55'),
(2, 'Dolorem in non digni Update', 'Ut ad et qui sit non Update', '<p>Qui dolor officia ac. Update</p>', '20848297_service.jpg', 0, '2025-09-06 01:26:00', '2025-09-06 01:28:53'),
(4, 'Rem ab nulla non num', 'Obcaecati ipsam labo', '<p>Quia velit, aliquam .</p>', '28491840_service.png', 1, '2025-09-06 01:26:22', '2025-09-06 01:26:22');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `language` varchar(10) DEFAULT 'en' COMMENT 'language set for admin',
  `fname` varchar(80) NOT NULL,
  `lname` varchar(80) NOT NULL,
  `username` varchar(80) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `two_factor_auth` tinyint(4) NOT NULL DEFAULT 0,
  `profile_pic_url` mediumtext DEFAULT NULL,
  `p_code` varchar(45) NOT NULL,
  `p_code_time` datetime DEFAULT NULL COMMENT 'The Time When Verification Code is Sent	',
  `token` text DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `language`, `fname`, `lname`, `username`, `email`, `password`, `two_factor_auth`, `profile_pic_url`, `p_code`, `p_code_time`, `token`, `status`, `created_at`, `updated_at`) VALUES
(1, 'en', 'John', 'Doe', 'admin', 'demo@devech.com', '$2a$10$3kY/IgsCYFteQaFEmihFB.hb8hnxlJZzz8xxhnMnkm.CnLqtvhDCS', 0, NULL, '123456', '2025-02-01 15:21:51', NULL, 1, '2025-02-01 15:21:51', '2025-09-06 01:34:07'),
(2, 'en', 'fg', 'gkghjk', 'demo@devech.com', 'demo1@devech.com', '$2a$10$BAuWQN3zU/jDcmLjC0e2ruXDj/Z1M82e2QdUq9ss/5sTu.4fDCkjK', 0, NULL, '', NULL, NULL, 0, '2025-02-01 16:35:51', '2025-02-01 16:35:51'),
(3, 'en', 'dfgh', 'dh', 'dfhfdg@fasfd.com', 'dfhfdg@fasfd.com', '$2a$10$buQ1GO3XYEWFaUDwFikb2ejBntkrP2WU.KdVgInwbGDDqBrAleD2y', 0, NULL, '', NULL, NULL, 0, '2025-02-01 16:40:13', '2025-02-01 16:40:13'),
(4, 'en', 'asgsdf', 'jjjjjj', 'rrrr@gmail.com', 'rrrr@gmail.com', '$2a$10$r41aj9bIVWzHEKPM9PtRH.3RllYnHNeU.bMb0o/nReHtRtSRZbXbi', 0, NULL, '', NULL, NULL, 0, '2025-02-10 18:35:50', '2025-02-10 18:35:50'),
(5, 'en', 'asdf', 'rgdfsg', 'demo3@devech.com', 'demo3@devech.com', '$2a$10$1jWuhABpfJ3gAzyYDzPnS.dkqWq/S4FJ6IEyKH7EqwECOSkSZ0ul6', 0, NULL, '', NULL, NULL, 1, '2025-02-10 18:44:28', '2025-02-10 18:44:54');

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
(2, '1756160150824_adonis_test_one_schema', 2, '2025-08-25 23:14:31'),
(3, '1756842153963_blog_schema', 3, '2025-09-02 19:56:47'),
(4, '1756926084043_service_name_schema', 4, '2025-09-03 19:04:59'),
(5, '1756927622244_service_content_schema', 5, '2025-09-03 19:34:27'),
(6, '1756935043001_service_section_two_schema', 6, '2025-09-03 21:33:18'),
(7, '1756973862188_faqs_schema', 7, '2025-09-04 08:18:29'),
(8, '1756975739214_home_service_banner_schema', 8, '2025-09-04 08:51:37'),
(9, '1756976114959_home_banner_schema', 9, '2025-09-04 08:55:39'),
(10, '1757010152980_house_moving_experts_schema', 10, '2025-09-04 18:24:18'),
(11, '1757016710890_happy_customers_schema', 11, '2025-09-04 20:18:10'),
(12, '1757022031041_home_service_schema', 12, '2025-09-04 21:45:03'),
(13, '1757025539687_about_us_schema', 13, '2025-09-04 22:41:09'),
(14, '1757025539688_about_us_schema', 14, '2025-09-04 22:42:14'),
(15, '1757101026050_team_schema', 15, '2025-09-05 19:39:15'),
(16, '1757105133859_quote_schema', 16, '2025-09-05 20:48:48'),
(17, '1757276275932_test_about_schema', 17, '2025-09-07 20:19:01'),
(18, '1757276275933_test_about_schema', 18, '2025-09-07 21:17:35');

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
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `photo` varchar(254) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `photo`, `details`, `status`, `created_at`, `updated_at`) VALUES
(2, 'asdf update', '62001811_blog.webp', '<p>dfg</p>', 1, '2025-09-03 14:33:38', '2025-09-04 00:07:48'),
(9, 'Aute aspernatur beat', '65359926_blog.jpg', '<p>Illo reprehenderit m.</p>', 0, '2025-09-03 23:52:32', '2025-09-04 00:44:01'),
(10, 'Aut architecto ut id', '81846018_blog.jpg', '<p>Qui sunt odio amet, .</p>', 1, '2025-09-03 23:52:46', '2025-09-03 23:52:46'),
(11, 'Consequat Expedita ', '95301897_blog.webp', '<p>Ut ut itaque facere .</p>', 0, '2025-09-03 23:53:04', '2025-09-04 00:44:08'),
(12, 'Quas consectetur min', '27609372_blog.jpg', '<p>Libero id labore et .</p>', 1, '2025-09-03 23:53:23', '2025-09-03 23:53:23'),
(13, 'Minima culpa qui qu', '42784286_blog.webp', '<p>Ad sequi fugiat, adi.</p>', 1, '2025-09-03 23:54:01', '2025-09-03 23:54:01');

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
(31, 'asdf', 'sadf@asdf.asdf', '0880171236', 'asdf', 'sdfgg', '2025-08-17 03:53:40', '2025-08-17 03:53:40'),
(32, 'asdf', 'asdf@asdf.asdf', '0880171236', 'asdfsdf', 'asdf', '2025-09-06 03:42:39', '2025-09-06 03:42:39');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_name_id` int(10) UNSIGNED DEFAULT NULL,
  `title` text DEFAULT NULL,
  `sub_title` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `service_name_id`, `title`, `sub_title`, `created_at`, `updated_at`) VALUES
(1, 1, 'asdf ggg', 'asdf ss', '2025-09-04 14:23:48', '2025-09-04 14:28:59'),
(3, 5, 'hggf', 'erteerdsf', '2025-09-04 14:25:32', '2025-09-04 14:25:32'),
(4, 6, 'sdfg', 'yutyrt', '2025-09-04 14:25:39', '2025-09-04 14:25:39');

-- --------------------------------------------------------

--
-- Table structure for table `happy_customers`
--

CREATE TABLE `happy_customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `f_name` varchar(100) DEFAULT NULL,
  `l_name` varchar(100) DEFAULT NULL,
  `star` varchar(50) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `happy_customers`
--

INSERT INTO `happy_customers` (`id`, `f_name`, `l_name`, `star`, `details`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(3, 'Celeste FFFF', 'Mcleod FFFF', '2', '<p>Esse, ullam totam re.  FFFF</p>', '52807069_service.jpg', 1, '2025-09-05 03:15:31', '2025-09-05 03:34:25'),
(4, 'Jelani', 'Cleveland', '33', '<p>Quisquam error tempo.</p>', '37088858_service.PNG', 1, '2025-09-05 03:15:41', '2025-09-05 03:34:23'),
(5, 'Justina', 'Farley', '3', '<p>Quos sunt aspernatur.</p>', '11262369_service.jpg', 1, '2025-09-05 03:15:56', '2025-09-05 03:15:56');

-- --------------------------------------------------------

--
-- Table structure for table `home_banners`
--

CREATE TABLE `home_banners` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `link` text DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `home_banners`
--

INSERT INTO `home_banners` (`id`, `title`, `details`, `link`, `video`, `status`, `created_at`, `updated_at`) VALUES
(3, 'asdf', '<p>asdf</p>', 'dfg', '1756978862451.mp4', 0, '2025-09-04 15:41:02', '2025-09-04 16:34:03'),
(4, 'asdf', '<p>asdf</p>', 'dfg', '1756978896909.mp4', 1, '2025-09-04 15:41:37', '2025-09-04 15:41:37'),
(5, 'asdf', '<p>asdf</p>', 'dfg', '1756978932893.mp4', 0, '2025-09-04 15:42:12', '2025-09-04 16:34:08'),
(6, 'Incidunt mollitia d', '<p>Dolores cupidatat ar.</p>', 'Earum laborum Aut v', '1756979002060.mp4', 1, '2025-09-04 15:43:22', '2025-09-04 15:43:22'),
(7, 'Elit deserunt natus', '<p>Eum ut sed accusanti.</p>', 'Non iste similique n', '1756979163057.mp4', 1, '2025-09-04 15:46:03', '2025-09-04 15:46:03'),
(8, 'Quasi accusamus dolo', '<p>Ut consequatur? Nihi.</p>', 'Est dolorem sit qua', '1756979199007.mp4', 1, '2025-09-04 15:46:39', '2025-09-04 15:46:39');

-- --------------------------------------------------------

--
-- Table structure for table `home_services`
--

CREATE TABLE `home_services` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_name_id` int(10) UNSIGNED DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `home_services`
--

INSERT INTO `home_services` (`id`, `service_name_id`, `icon`, `details`, `link`, `created_at`, `updated_at`) VALUES
(1, 1, 'sadf ddddd', 'asdf ddddd', 'asdf ddddd', '2025-09-05 04:29:26', '2025-09-05 04:32:25'),
(3, 6, 'Eugenia Vang', 'Maxime qui quos tota', 'Lorem reiciendis sol', '2025-09-05 04:29:59', '2025-09-05 04:29:59');

-- --------------------------------------------------------

--
-- Table structure for table `house_moving_experts`
--

CREATE TABLE `house_moving_experts` (
  `id` int(10) UNSIGNED NOT NULL,
  `sort_title` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `house_moving_experts`
--

INSERT INTO `house_moving_experts` (`id`, `sort_title`, `title`, `details`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sunt eos dolor lab asdf', 'Consectetur accusam  asf', '<p>A nisi modi sed hic . asdf</p>', '19850941_service.jpg', 1, '2025-09-05 01:46:17', '2025-09-05 01:58:48'),
(5, 'Eveniet velit corp', 'Magnam incididunt ex', '<p>Natus aut magnam mol.</p>', '39552231_service.jpg', 0, '2025-09-05 01:49:35', '2025-09-05 02:10:36'),
(6, 'Fugit consequatur ', 'Quas officia molliti', '<p>Iusto fugiat molesti.</p>', '55993185_service.jpg', 1, '2025-09-05 01:49:55', '2025-09-05 02:10:26');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(254) DEFAULT NULL,
  `lastName` varchar(254) DEFAULT NULL,
  `involved` varchar(254) DEFAULT NULL,
  `numberOfHelper` varchar(254) DEFAULT NULL,
  `interested` varchar(254) DEFAULT NULL,
  `phone` varchar(254) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `message` text NOT NULL,
  `deliveryAddress` varchar(254) DEFAULT NULL,
  `collectionAddress` varchar(254) DEFAULT NULL,
  `typeOfMove` varchar(254) DEFAULT NULL,
  `sizeOfMove` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `firstName`, `lastName`, `involved`, `numberOfHelper`, `interested`, `phone`, `email`, `message`, `deliveryAddress`, `collectionAddress`, `typeOfMove`, `sizeOfMove`, `created_at`, `updated_at`) VALUES
(1, 'dfh', 'Mizan', 'yes', '2', 'flexible_date', '0880171236', 'dfgddf@sddf.asdf', 'dfhdg', 'dfhdf', '1 wakefield terrace, tawa', 'intercity-move', '3-4', '2025-09-08 14:21:55', '2025-09-08 14:21:55'),
(2, 'asdf', 'sdf', 'yes', '3', 'confirmed_date', '0880171236', 'sdfs@dfsafd.sfdf', 'sdf', 'sdf', 'ssdf', 'storage', '2', '2025-09-08 14:24:52', '2025-09-08 14:24:52'),
(3, 'adsf', 'aasdf', 'yes', '2', 'flexible_date', '0880171236', 'asdf@saf.asdf', 'asdf', 'asdf', 'aasdf', 'storage', '3-4', '2025-09-08 14:29:00', '2025-09-08 14:29:00'),
(4, 'asdf', 'Mizan', 'yes', '2', 'flexible_date', '0880171236', 'asdf@sadf.asdf', 'asdf', 'asdf', '1 wakefield terrace, tawa', 'relocation', '3-4', '2025-09-08 14:45:44', '2025-09-08 14:45:44'),
(5, 'asdf', 'Mizan', 'yes', '2', 'flexible_date', '0880171236', 'asdf@asdf.asdf', 'asdf', 'asdf', '1 wakefield terrace, tawa', 'storage', '3-4', '2025-09-08 14:54:47', '2025-09-08 14:54:47');

-- --------------------------------------------------------

--
-- Table structure for table `service_contents`
--

CREATE TABLE `service_contents` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_name_id` int(10) UNSIGNED DEFAULT NULL,
  `sort_title` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `costs_title` varchar(255) DEFAULT NULL,
  `costs_details` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service_contents`
--

INSERT INTO `service_contents` (`id`, `service_name_id`, `sort_title`, `title`, `details`, `costs_title`, `costs_details`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 'Molestiae at et quid FFF', 'Qui ut officia enim  update', '<p>Aliquid dicta libero. update</p>', 'Hic numquam in eaque update', '<p>Sit nihil voluptas r. update</p>', '91585758_ad.jpg', 1, '2025-09-04 02:16:11', '2025-09-04 02:28:27'),
(2, 1, 'Ut delectus enim qu uuuu', 'Dolor distinctio Au', '<p>Consequat. A dolores.</p>', 'Rerum pariatur Quia', '<p>Et quos culpa, aperi.</p>', '26215706_service.png', 0, '2025-09-04 02:16:39', '2025-09-04 02:30:30'),
(3, 6, 'Consectetur quaerat ', 'Inventore ullamco re', '<p>Est harum placeat, o.</p>', 'Quo beatae ut a aute', '<p>Aute ex facilis est.</p>', '96400661_service.jpg', 1, '2025-09-04 02:30:18', '2025-09-04 02:30:18'),
(4, 1, 'Duis et impedit vel', 'Facere quisquam culp', '<p>Anim voluptas distin.</p>', 'Laboriosam aliquip ', '<p>Sunt facere dolorem .</p>', '51501790_service.png', 1, '2025-09-04 02:47:59', '2025-09-04 02:47:59');

-- --------------------------------------------------------

--
-- Table structure for table `service_names`
--

CREATE TABLE `service_names` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pretty_name` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service_names`
--

INSERT INTO `service_names` (`id`, `name`, `pretty_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'yyyy', 'yyyy', 1, '2025-09-04 01:11:13', '2025-09-04 01:11:13'),
(5, 'sadg', 'sadg', 1, '2025-09-04 01:21:33', '2025-09-04 01:21:33'),
(6, 'asdf', 'asdf', 1, '2025-09-04 01:21:36', '2025-09-04 01:21:36');

-- --------------------------------------------------------

--
-- Table structure for table `service_section_twos`
--

CREATE TABLE `service_section_twos` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_name_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `need_title` varchar(255) DEFAULT NULL,
  `need_details` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service_section_twos`
--

INSERT INTO `service_section_twos` (`id`, `service_name_id`, `title`, `sub_title`, `details`, `need_title`, `need_details`, `created_at`, `updated_at`) VALUES
(1, 1, 'Necessitatibus et ad ffff', 'Ut est commodo amet sss', '<p>Exercitation qui ape.</p>', 'Officia aliqua Debi', '<p>Voluptatem. Labore m.</p>', '2025-09-04 13:41:23', '2025-09-04 14:10:21'),
(2, 1, 'Dolorem id id cupida', 'Ad excepteur magni t', '<p>Incididunt reiciendi.</p>', 'Ipsum aut laborum C', '<p>Error soluta aliquid.</p>', '2025-09-04 13:47:47', '2025-09-04 13:47:47'),
(5, 6, 'Dolor dolor sed dele', 'Aperiam omnis irure ', '<p>Nesciunt, eveniet, a.</p>', 'Et odio aut corrupti', '<p>Sed autem incidunt, .</p>', '2025-09-04 13:48:41', '2025-09-04 13:48:41');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(10) UNSIGNED NOT NULL,
  `designation` varchar(254) DEFAULT NULL,
  `name` varchar(254) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `designation`, `name`, `details`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Eiusmod Nam quia ad ', 'Jerry Mays', '<p>Eaque laboris archit. Update</p>', '75820745_ad.jpg', 1, '2025-09-06 02:11:35', '2025-09-06 02:15:12'),
(5, 'Voluptatem a dolorem', 'Ian Moses', '<p>Velit, id esse, ipsu.</p>', '22936304_service.jpeg', 1, '2025-09-06 02:12:01', '2025-09-06 02:15:10');

-- --------------------------------------------------------

--
-- Table structure for table `test_abouts`
--

CREATE TABLE `test_abouts` (
  `id` int(10) UNSIGNED NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aboutuses`
--
ALTER TABLE `aboutuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

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
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faqs_service_name_id_foreign` (`service_name_id`);

--
-- Indexes for table `happy_customers`
--
ALTER TABLE `happy_customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_banners`
--
ALTER TABLE `home_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_services`
--
ALTER TABLE `home_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `home_services_service_name_id_foreign` (`service_name_id`);

--
-- Indexes for table `house_moving_experts`
--
ALTER TABLE `house_moving_experts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_contents`
--
ALTER TABLE `service_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_contents_service_name_id_foreign` (`service_name_id`);

--
-- Indexes for table `service_names`
--
ALTER TABLE `service_names`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_section_twos`
--
ALTER TABLE `service_section_twos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_section_twos_service_name_id_foreign` (`service_name_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_abouts`
--
ALTER TABLE `test_abouts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aboutuses`
--
ALTER TABLE `aboutuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `adonis_test_ones`
--
ALTER TABLE `adonis_test_ones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=600;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `happy_customers`
--
ALTER TABLE `happy_customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `home_banners`
--
ALTER TABLE `home_banners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `home_services`
--
ALTER TABLE `home_services`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `house_moving_experts`
--
ALTER TABLE `house_moving_experts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `service_contents`
--
ALTER TABLE `service_contents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_names`
--
ALTER TABLE `service_names`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service_section_twos`
--
ALTER TABLE `service_section_twos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `test_abouts`
--
ALTER TABLE `test_abouts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `faqs`
--
ALTER TABLE `faqs`
  ADD CONSTRAINT `faqs_service_name_id_foreign` FOREIGN KEY (`service_name_id`) REFERENCES `service_names` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `home_services`
--
ALTER TABLE `home_services`
  ADD CONSTRAINT `home_services_service_name_id_foreign` FOREIGN KEY (`service_name_id`) REFERENCES `service_names` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `service_contents`
--
ALTER TABLE `service_contents`
  ADD CONSTRAINT `service_contents_service_name_id_foreign` FOREIGN KEY (`service_name_id`) REFERENCES `service_names` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `service_section_twos`
--
ALTER TABLE `service_section_twos`
  ADD CONSTRAINT `service_section_twos_service_name_id_foreign` FOREIGN KEY (`service_name_id`) REFERENCES `service_names` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
