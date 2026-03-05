-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2026 at 06:15 PM
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
(1, 'About Us ', 'Introducing RM Moving Express', '<p>At RM Moving Express, we’re more than just movers — we’re your trusted relocation partners across New Zealand. With years of experience in the industry, our team specializes in providing affordable, reliable, and hassle-free moving services tailored to your needs. From house relocations and office moves to piano shifting and vehicle transport, we handle every job with care and professionalism.</p><p></p><p>We pride ourselves on transparent pricing, punctual service, and customer satisfaction. Whether you’re moving locally or across islands, RM Moving Express is here to make the journey smooth, secure, and stress-free. Let us do the heavy lifting — literally. </p>', '80251268_ad.webp', 1, '2025-09-06 01:25:46', '2025-12-19 16:58:09');

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
(1, 'en', 'John', 'Doe', 'admin', 'demo@devech.com', '$2a$10$3kY/IgsCYFteQaFEmihFB.hb8hnxlJZzz8xxhnMnkm.CnLqtvhDCS', 0, NULL, '123456', '2025-02-01 15:21:51', NULL, 1, '2025-02-01 15:21:51', '2026-01-12 22:42:25'),
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
(18, '1757276275933_test_about_schema', 18, '2025-09-07 21:17:35'),
(19, '1765355888249_service_banner_schema', 19, '2025-12-10 08:40:07');

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
(2, ' BNP leaders, supporters throng Dhaka streets ahead of Tarique’s return', '62001811_blog.webp', '<p>Tarique invokes Martin Luther King at Dhaka reception: \'I have a plan for Bangladesh.\'</p>', 1, '2025-09-03 14:33:38', '2025-12-25 17:46:44'),
(9, 'Aute aspernatur beat', '65359926_blog.jpg', '<p>Illo reprehenderit m.</p>', 0, '2025-09-03 23:52:32', '2025-09-04 00:44:01'),
(10, 'Aut architecto ut id', '81846018_blog.jpg', '<p>Qui sunt odio amet, .</p>', 1, '2025-09-03 23:52:46', '2025-09-03 23:52:46'),
(11, 'Consequat Expedita ', '95301897_blog.webp', '<p>Ut ut itaque facere .</p>', 0, '2025-09-03 23:53:04', '2025-09-04 00:44:08'),
(12, 'Quas consectetur min DDD', '27609372_blog.jpg', '<p>Libero id labore et .</p>', 1, '2025-09-03 23:53:23', '2025-12-23 03:05:51'),
(14, 'sgs sdfd gf ', '56278804_blog.jpg', '<p>qwwyhjghj d dfhfdgh dfdfhfgh</p>', 1, '2025-12-23 03:10:17', '2025-12-25 17:51:15'),
(15, 'One killed in mob beating over extortion allegation in Rajbari', '97628790_blog.webp', '<p>A man was beaten to death by a mob in Rajbari\'s Pangsha upazila last night over an extortion allegation, police said.</p><p>The incident took place around 11:00pm yesterday at Hosendanga village of Kalimohor union, Assistant Superintendent of Police (Pangsha Circle) Debrata Sarkar told reporters today.</p><p>The deceased was identified as Amrit Mondal, also known as Samrat, a resident of the same village.</p><p>During the incident, police arrested one of his associates, Mohammad Selim, and recovered two firearms from his possession.</p><p>The ASP said police rushed to the spot upon receiving information and rescued Samrat in a critical condition. He was taken to Pangsha Upazila Health Complex, where doctors declared him dead around 2:00am.</p><p>Police later recovered a pistol and a one-shooter gun from Selim and took him into custody. Samrat\'s body was sent to Rajbari Sadar Hospital morgue for an autopsy, the ASP added.</p>', 1, '2025-12-25 17:47:21', '2025-12-25 17:47:21');

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
(32, 'asdf', 'asdf@asdf.asdf', '0880171236', 'asdfsdf', 'asdf', '2025-09-06 03:42:39', '2025-09-06 03:42:39'),
(33, 'name', 'miii@gafd.com', '1254568789', 'subject', 'sdfgsd', '2025-10-10 15:36:47', '2025-10-10 15:36:47'),
(34, 'Md Mizan', 'asdf@asdf.afd', '0880171236', 'asdf', 'afgadf', '2025-10-19 02:40:30', '2025-10-19 02:40:30');

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
(5, 7, 'How long should it take movers to move a 3-bedroom house?  ', 'Normally, it takes 4-7 hours to shift a fully furnished 3 bedroom home but the actual time sometimes varies depending on the access of the premises, packing and unpacking items and the distance between the two locations. ', '2025-12-10 15:42:11', '2025-12-23 03:14:38'),
(6, 7, 'How much do movers cost for a 4-bedroom house?', 'Usually, it costs around $800-$1000 depending on the volume of the items and excess of the work. The costing depends on various factors like distance, number of movers and any other additional services like packing, boxing things separately.', '2025-12-10 15:42:32', '2025-12-10 15:42:32'),
(7, 7, 'How long does it take movers to pack a house?', 'Packing an entire house can take 4–10 hours for professional movers, depending on the number of rooms and items. For a 3-bedroom house, expect 6–8 hours if done by an experienced team.', '2025-12-10 15:42:52', '2025-12-10 15:42:52'),
(8, 7, 'Are your local moving services insured?', 'Yes, we can provide context insurance whenever needed and some time required by the client.', '2025-12-10 15:43:20', '2025-12-10 15:43:20'),
(9, 7, 'Do you provide cheap movers for small local jobs?', 'Yes we provide low cost and cheap moving options for small local moving i.e furniture, bed, electronics.', '2025-12-10 15:43:38', '2025-12-10 15:43:38'),
(10, 7, 'Why choose RM Moving Express over other local movers?', 'Check out our customer feedback and reviews before hiring us so you can get an idea how they received our services.', '2025-12-10 15:43:55', '2025-12-10 15:43:55'),
(11, 8, 'Do you offer cleaning after moving out?', 'Yes! We provide full end-of-tenancy cleaning and decluttering services to help you hand over a clean property stress-free.', '2025-12-10 15:44:22', '2025-12-10 15:44:22'),
(12, 8, 'Can I use this service without booking a move?', 'Absolutely. Our cleaning and decluttering service is available as a standalone offering—even if you\'re not moving with us.', '2025-12-10 15:44:35', '2025-12-10 15:44:35'),
(13, 8, 'What happens to the items I want to get rid of?', 'We can help you donate, dispose, or recycle unwanted items responsibly. Just let us know your preference.', '2025-12-10 15:44:49', '2025-12-10 15:44:49'),
(14, 8, 'How much does cleaning and decluttering cost?', 'Prices vary depending on the size of the property and amount of work. Get in touch for a free quote tailored to your needs.', '2025-12-10 15:45:06', '2025-12-10 15:45:06'),
(15, 9, 'Do you move single large items like pianos or fridges?', 'Yes! We’re equipped to move large or heavy single items safely and securely.', '2025-12-10 15:45:45', '2025-12-10 15:45:45'),
(16, 9, 'How much does a single item move cost?', 'Prices start as low as $80–$150 depending on distance, item size, and access conditions.', '2025-12-10 15:45:59', '2025-12-10 15:45:59'),
(17, 9, 'Can I book same-day pickup for one item?', 'Absolutely! Same-day service is available depending on schedule availability.', '2025-12-10 15:46:12', '2025-12-10 15:46:12'),
(18, 9, 'Are your single item moving rates the cheapest in Christchurch?', 'We offer some of the most competitive rates in the city—get a quote to compare!', '2025-12-10 15:46:26', '2025-12-10 15:46:26'),
(19, 9, 'What kind of items can you move individually?', 'We move all types—TVs, couches, washing machines, beds, desks, appliances, and more.', '2025-12-10 15:46:41', '2025-12-10 15:46:41'),
(20, 9, 'Do I need to wrap the item before pickup?', 'Our movers bring padding and straps, but pre-wrapping fragile items is always helpful for extra protection.', '2025-12-10 15:47:01', '2025-12-10 15:47:01'),
(21, 10, 'Do you move offices outside of Christchurch?', 'Yes, we handle office moves throughout New Zealand, including inter-city relocations.', '2025-12-10 15:47:30', '2025-12-10 15:47:30'),
(22, 10, 'Can you disassemble and reassemble office furniture?', 'Absolutely. Our team is trained in dismantling and assembling desks, shelving, and workstations.', '2025-12-10 15:47:44', '2025-12-10 15:47:44'),
(23, 10, 'Do you work outside business hours for office moves?', 'Yes! We offer after-hours and weekend service to minimize disruption to your business.', '2025-12-10 15:47:58', '2025-12-10 15:47:58'),
(24, 10, 'Do you provide boxes or packing supplies for office moves?', 'Yes, we offer boxes, bubble wrap, and other supplies as part of our moving packages.', '2025-12-10 15:48:13', '2025-12-10 15:48:13'),
(25, 10, 'Can you move IT equipment safely?', 'Absolutely. Our movers are trained in handling fragile electronics and office equipment with care.', '2025-12-10 15:48:30', '2025-12-10 15:48:30'),
(26, 10, 'Do you offer weekend office relocations?', 'Yes, we provide flexible scheduling including weekend and after-hours moves to reduce downtime.', '2025-12-10 15:48:43', '2025-12-10 15:48:43'),
(27, 11, 'Do you provide packing materials for long moves?', 'Yes! We offer high-quality boxes, wrap, and packing supplies upon request.', '2025-12-10 15:49:05', '2025-12-10 15:49:05'),
(28, 11, 'How do you calculate pricing for long distance moving?', 'Cost depends on distance, load size, and services needed. Contact us for a custom quote.', '2025-12-10 15:49:18', '2025-12-10 15:49:18'),
(29, 11, 'How far in advance should I book a long distance move?', 'We recommend booking at least 7–10 days ahead to secure your preferred date.', '2025-12-10 15:49:34', '2025-12-10 15:49:34'),
(30, 11, 'What’s the cheapest way to move long distance in NZ?', 'Booking with RM Moving Express! We offer customized long-distance moving packages to fit your needs and budget.', '2025-12-10 15:49:49', '2025-12-10 15:49:49'),
(31, 11, 'Do you offer tracking for long distance moves?', 'Yes, we keep you updated throughout the journey for full peace of mind.', '2025-12-10 15:50:06', '2025-12-10 15:50:06'),
(32, 11, 'Are your long distance movers insured?', 'Yes, your belongings are covered during transit, and we offer optional comprehensive insurance.', '2025-12-10 15:50:21', '2025-12-10 15:50:21'),
(33, 12, 'Do you offer packing help for full house moves?', 'Yes, we provide both packing materials and full packing services if needed.', '2025-12-10 15:50:50', '2025-12-10 15:50:50'),
(34, 12, 'How much notice do you need for a house move?', 'We recommend at least 3–5 days notice, especially during peak seasons.', '2025-12-10 15:51:06', '2025-12-10 15:51:06'),
(35, 12, 'Can you move items into storage for me?', 'Absolutely. We can move your belongings to your chosen storage facility safely and efficiently.', '2025-12-10 15:51:24', '2025-12-10 15:51:24'),
(36, 12, 'What’s included in a full house relocation?', 'We include packing, disassembly, loading, transport, and reassembly—all handled by professional movers.', '2025-12-10 15:51:41', '2025-12-10 15:51:41'),
(37, 12, 'Do you offer cheap house movers in NZ?', 'Yes, our pricing is among the most competitive for house moving services across New Zealand.', '2025-12-10 15:51:57', '2025-12-10 15:51:57'),
(38, 12, 'Can I schedule a pre-move consultation?', 'Absolutely! We offer free assessments to help you plan and get an accurate quote.', '2025-12-10 15:52:10', '2025-12-10 15:52:10'),
(39, 13, 'Do you charge extra for stairs or tight spaces?', 'Yes, a small surcharge may apply for stairs or tricky access. We\'ll include this in your quote.', '2025-12-10 15:52:38', '2025-12-10 15:52:38'),
(40, 13, 'Can you move grand pianos or just uprights?', 'We move both types! Let us know the model and we’ll prepare the right gear.', '2025-12-10 15:52:52', '2025-12-10 15:52:52'),
(41, 13, 'Is your team trained for piano moving?', 'Yes, our movers are trained in safe piano handling and positioning.', '2025-12-10 15:53:09', '2025-12-10 15:53:09'),
(42, 13, 'Do you move pianos for schools or events?', 'Yes, we work with schools, venues, and private clients for both one-time and recurring piano moves.', '2025-12-10 15:53:24', '2025-12-10 15:53:24'),
(43, 13, 'What’s the cost to move a piano locally?', 'Prices typically range from $150 to $350 depending on access and piano type.', '2025-12-10 15:53:37', '2025-12-10 15:53:37'),
(44, 13, 'Can you move a piano upstairs?', 'Yes, but stair fees may apply depending on weight, angle, and difficulty.', '2025-12-10 15:53:51', '2025-12-10 15:53:51'),
(45, 14, 'Do you arrange inter-island ferry transport?', 'Yes, we coordinate all necessary ferry bookings and logistics.', '2025-12-10 15:54:16', '2025-12-10 15:54:16'),
(46, 14, 'Can I send only a few items between islands?', 'Yes, we handle both full house moves and partial or small-load transfers.', '2025-12-10 15:54:33', '2025-12-10 15:54:33'),
(47, 14, 'Is there a delivery timeline guarantee?', 'We provide an estimated timeframe and stay in contact throughout the move.', '2025-12-10 15:54:55', '2025-12-10 15:54:55'),
(48, 14, 'How long does inter-island moving usually take?', 'Most moves take 2–4 days depending on the ferry schedule and destination.', '2025-12-10 15:55:04', '2025-12-10 15:55:04'),
(49, 14, 'Can I add extra items last-minute?', 'We’ll do our best to accommodate extra items—just let us know as early as possible.', '2025-12-10 15:55:34', '2025-12-10 15:55:34'),
(50, 14, 'Is inter-island moving expensive?', 'Not with us! We provide affordable rates with transparent ferry and fuel fees included.', '2025-12-10 15:55:48', '2025-12-10 15:55:48'),
(51, 15, 'Can you transport non-running vehicles?', 'Yes, as long as we’re informed in advance so we can bring the right equipment.', '2025-12-10 15:56:28', '2025-12-10 15:56:28'),
(52, 15, 'Is vehicle transport insured?', 'Yes, all vehicle moves are covered by our basic insurance policy.', '2025-12-10 15:56:44', '2025-12-10 15:56:44'),
(53, 15, 'Do you offer door-to-door delivery?', 'Yes, we aim for direct delivery whenever access allows.', '2025-12-10 15:56:57', '2025-12-10 15:56:57'),
(54, 15, 'How much does it cost to move a car across NZ?', 'Prices vary by distance and vehicle size—starting from $250. Request a quote for exact pricing.', '2025-12-10 15:57:10', '2025-12-10 15:57:10'),
(55, 15, 'Do I need to empty the fuel tank before transport?', 'For safety, we recommend keeping fuel to a minimum—about a quarter tank is ideal.', '2025-12-10 15:57:23', '2025-12-10 15:57:23'),
(56, 15, 'Can I transport personal items inside the vehicle?', 'We generally discourage it, but small, secured items may be allowed with prior notice.', '2025-12-10 15:57:38', '2025-12-10 15:57:38'),
(57, 16, 'Do you deliver from stores or only homes?', 'We deliver from retail stores, warehouses, or individual sellers—wherever you need.', '2025-12-10 15:58:06', '2025-12-10 15:58:06'),
(58, 16, 'What areas do you cover?', 'We provide furniture delivery services across New Zealand.', '2025-12-10 15:58:20', '2025-12-10 15:58:20'),
(59, 16, 'Do you protect furniture during transport?', 'Yes, we use padding, wraps, and tie-downs to protect all cabinets and furniture during delivery.', '2025-12-10 15:58:34', '2025-12-10 15:58:34'),
(60, 16, 'Can you deliver to rural or remote locations?', 'Yes, we deliver across urban and rural NZ. Let us know your address and we’ll confirm access.', '2025-12-10 15:58:46', '2025-12-10 15:58:46'),
(61, 16, 'What’s the average delivery time for commercial moving?', 'Most deliveries are completed same-day or next-day, depending on availability and location.', '2025-12-10 15:59:01', '2025-12-10 15:59:01'),
(62, 17, 'Can you help with sorting and packing?', 'Yes, we offer gentle assistance with organizing, packing, and even light decluttering.', '2025-12-10 15:59:28', '2025-12-10 15:59:28'),
(63, 17, 'Do you coordinate with family or care facilities?', 'Absolutely—we’re happy to work directly with family members or facility staff for a smooth move.', '2025-12-10 15:59:42', '2025-12-10 15:59:42'),
(64, 17, 'Is your team trained for senior support?', 'Yes, our movers are trained to be patient, courteous, and extra careful.', '2025-12-10 15:59:58', '2025-12-10 15:59:58'),
(65, 17, 'Do you offer moving services for retirement villages?', 'Yes, we regularly help seniors transition to retirement homes or aged care facilities.', '2025-12-10 16:00:13', '2025-12-10 16:00:13'),
(66, 17, 'Can you assist with downsizing or donating items?', 'Yes, we can help sort, donate, or dispose of unwanted belongings as part of the move.', '2025-12-10 16:00:28', '2025-12-10 16:00:28'),
(67, 17, 'Is this service suitable for seniors with mobility issues?', 'Absolutely. Our team is trained to assist gently, with care, patience, and respect at every step.', '2025-12-10 16:00:41', '2025-12-10 16:00:41');

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
(6, 'Danielle ', 'Ellis', '4', '<p>Excellent company! Quick and easy communication, on time and efficient! Thank you so much. Also, it was a very reasonable price! Thank you</p>', '96031553_service.png', 1, '2025-12-10 03:49:39', '2025-12-10 03:50:32'),
(7, 'Amanda', 'da', '5', '<p>Excellent company! Quick and easy communication, on time and efficient! Thank you so much. Also, it was a very reasonable price! Thank you so much.</p>', '73921729_service.webp', 1, '2025-12-10 03:51:53', '2025-12-10 03:51:53'),
(8, 'Melissa ', 'Mc', '5', '<p>Absolute life savers! 10/10! Rapid Movers were able to help us move at late notice which we were super grateful for! A very professional and efficient</p>', '50361620_service.png', 1, '2025-12-10 03:52:58', '2025-12-10 03:52:58'),
(9, 'Christophilarry ', 'Alex', '5', '<p>A huge thanks to JJ for making the move so much less stressful! The team handled everything promptly and professionally.</p>', '15873887_service.png', 1, '2025-12-10 03:54:06', '2025-12-10 03:54:06'),
(10, 'Maryann ', 'Cain', '3', '<p>Very quick and efficient, would recommend</p>', '11758574_service.jpg', 1, '2025-12-10 03:54:38', '2025-12-10 03:54:38'),
(11, 'Kylie ', 'Trompert', '4', '<p>Many thanks to the team at AJ House Moving you did an amazing job despite all the challenges with my driveways. You dealt with those obstacles with professionalism and care. I would highly recommend your services.</p>', '64282554_ad.png', 1, '2025-12-19 16:42:24', '2025-12-19 16:50:11');

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
(3, 'AAA Professional Movers for Stress Free Shifting', '<p>dddd RM Moving Express provides fast, secure, and cost-effective moving services for homes and businesses in Christchurch and across New Zealand.</p>', '/moving-quote', '1756978862451.mp4', 1, '2025-09-04 15:41:02', '2026-01-07 00:55:02');

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
(4, 7, 'moving', 'Quick and efficient local moving solutions for homes and small offices, stress-free and affordable.', 'local-moving', '2025-12-10 03:01:29', '2025-12-10 03:01:29'),
(5, 10, 'island', 'Reliable, organized office relocations with minimal downtime and safe handling of all furniture and equipment.', 'office-furniture-moving', '2025-12-10 03:04:37', '2025-12-10 03:04:37'),
(6, 11, 'relocation', 'Nationwide moving support with secure packing, timely delivery, and competitive long-distance', 'long-distance-moving', '2025-12-10 03:05:08', '2025-12-10 03:05:08'),
(7, 12, 'moving', 'Complete home relocation from packing to setup — fast, careful, and fully insured service.', 'house-relocation', '2025-12-10 03:05:38', '2025-12-10 03:07:38'),
(8, 13, 'island', 'Specialized piano transport using protective gear and expert handling for safe, damage-free delivery. Spa content need to be added', 'piano-shifting', '2025-12-10 03:08:09', '2025-12-10 03:08:09'),
(9, 14, 'relocation', 'Seamless inter-island moving with full logistics support from North Island to South Island and back.', 'nort-south-island-moving', '2025-12-10 03:08:40', '2025-12-10 03:08:40'),
(10, 15, 'relocation', 'Trusted vehicle and boat transportation with professional handling and nationwide delivery options.', 'bike-car-boat-transport', '2025-12-10 03:09:07', '2025-12-10 03:09:07'),
(11, 16, 'relocation', 'Delivering your dream kitchen? Trust Moving Express for reliable and damage-free kitchen cabinet delivery to your doorstep.', 'kitchen-cabinet-delivery', '2025-12-10 03:09:31', '2025-12-10 03:09:31'),
(12, 17, 'relocation', 'Compassionate, professional moving services for seniors — making relocation smooth and worry-free for older adults.', 'senior-movers', '2025-12-10 03:10:07', '2025-12-10 03:10:07');

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
(1, 'Test Fast. Reliable. Affordable. Guaranteed.', 'Update Your Trusted House Moving Experts', '<p>Looking for cheap house movers you can count on? RM Moving Express offers fast, affordable, and stress-free relocation services across New Zealand. As one of the best house movers in the region, we handle everything from packing and lifting to secure transport and timely delivery. Whether it’s a small apartment or a large family home, we tailor every move to fit your needs. We’re proud to be known among the most affordable and reliable house movers NZ-wide. Get in touch today for a free quote and discover why we’re the top choice for cheap movers and professional house shifting services.</p>', '95469612_ad.webp', 1, '2025-09-05 01:46:17', '2026-01-12 22:42:58');

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
(10, 'asdf', 'Mizan', 'yes', '2', 'flexible_date', '0880171236', 'sdf@sdf.sfa', 'sdf', 'adsf', '1 wakefield terrace, tawa', 'relocation', '2', '2025-09-10 17:13:00', '2025-09-10 17:13:00'),
(11, 'asdf', 'Mizan', 'yes', '2', 'confirmed_date', '08801712323', 'asdfasd!@dfasd.afd', 'asdf', 'adf', '1 wakefield terrace, tawa', 'storage', '2', '2025-09-27 23:56:48', '2025-09-27 23:56:48'),
(12, 'asdf', 'Mizan', 'yes', '2', 'confirmed_date', '0880171232', 'asdf@df.asdf', 'asdf', 'asdf', '1 wakefield terrace, tawa', 'relocation', '3-4', '2025-09-27 23:57:42', '2025-09-27 23:57:42'),
(13, 'asdf', 'Mizan', 'yes', '2', 'confirmed_date', '08801712356', 'dsf@sdfa.asdf', 'asdf', 'asdf', '1 wakefield terrace, tawa', 'relocation', '3-4', '2025-09-28 00:00:51', '2025-09-28 00:00:51'),
(14, 'asdf', 'Mizan', 'yes', '2', 'confirmed_date', '0880171236', 'asdf@sfdg.df', 'asdf', 'asdf', '1 wakefield terrace, tawa', 'relocation', '2', '2025-09-28 00:03:13', '2025-09-28 00:03:13'),
(15, 'asdf', 'asdf', 'yes', '3', 'exact_date', '0880171236', 'asdf@sdaf.asfd', 'asdf', 'asdf', 'asdf', 'relocation', '2', '2025-09-28 00:06:13', '2025-09-28 00:06:13'),
(16, 'asdf', 'asdf', 'yes', '2', 'confirmed_date', '0880171236', 'sdf@asdf.asdf', 'asdf', 'sadf', 'asdf', 'relocation', '2', '2025-09-28 00:10:10', '2025-09-28 00:10:10'),
(17, 'sdfg', 'sdg', 'yes', '2', 'confirmed_date', '0880171236', 'sdf@sfg.asdf', 'sdfg', 'sdfg', 'sg', 'storage', '2', '2025-09-28 00:13:49', '2025-09-28 00:13:49'),
(18, 'asdf', 'asdf', 'yes', '2', 'confirmed_date', '0880171236', 'asdf@asdf.sadf', 'asdf', 'asdf', 'asdf', 'storage', '2', '2025-09-28 00:23:37', '2025-09-28 00:23:37'),
(19, 'hgjh', 'Mizan', 'yes', '2', 'confirmed_date', '0880171236', 'hgfhg@kjhkl.ghfh', 'jhgjhg', 'pik', '1 wakefield terrace, tawa', 'relocation', '3-4', '2025-09-28 00:25:12', '2025-09-28 00:25:12'),
(20, 'asdf', 'Mizan', 'yes', '2', 'confirmed_date', '0880171236', 'asdf@sdf.asdf', 'asdf', 'asdf', '1 wakefield terrace, tawa', 'storage', '3-4', '2025-09-28 00:45:33', '2025-09-28 00:45:33'),
(21, 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'relocation', 'asdf', '2025-10-13 03:48:12', '2025-10-13 03:48:12'),
(22, '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', '1 wakefield terrace, tawa', 'storage', '1 wakefield terrace, tawa', '2025-10-13 03:49:21', '2025-10-13 03:49:21'),
(23, 'First Name', 'Last Name', 'yes', '2', 'confirmed_date', '0880171236', 'Email', 'sadfa', 'Delivery address', '1 wakefield terrace, tawa', 'storage', '3-4', '2025-10-13 03:52:01', '2025-10-13 03:52:01'),
(24, 'asdf', 'asdfdsfdfg', 'yes', '2', 'confirmed_date', '0880171236', 'asdf@sadf.asdf', 'asdf', 'asdf', 'aasdf', 'relocation', '3-4', '2025-10-19 02:43:23', '2025-10-19 02:43:23'),
(25, 'sdfg', 'sdf', 'yes', '2', 'confirmed_date', '0880171236', 'sdf@asdf.asdf', 'sdf', 'dfg', 'fgdfg', 'storage', '2', '2025-10-19 02:44:12', '2025-10-19 02:44:12');

-- --------------------------------------------------------

--
-- Table structure for table `service_banners`
--

CREATE TABLE `service_banners` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_name_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service_banners`
--

INSERT INTO `service_banners` (`id`, `service_name_id`, `title`, `sub_title`, `created_at`, `updated_at`) VALUES
(8, 7, 'Local Moving Services ', 'Moving Express provides fast, reliable, and affordable local moving services for homes, apartments, and offices in Christchurch and across New Zealand.  ', '2025-12-10 15:01:36', '2025-12-23 03:11:23'),
(9, 8, 'Cleaning and Decluttering Services', 'A fresh start begins with a clean space. Moving Express offers professional cleaning and decluttering before or after your move to make transitions easier.', '2025-12-10 15:01:53', '2025-12-10 15:01:53'),
(10, 9, 'Single Item Movers', 'No move is too small! Our single item moving service is perfect for safely relocating bulky furniture or valuable items.', '2025-12-10 15:02:08', '2025-12-10 15:02:08'),
(11, 10, 'Office Furniture Moving Services', 'Moving your office? Let our experts manage the process with minimal disruption. Our office furniture moving services are designed to be efficient, secure, and reliable.', '2025-12-10 15:02:25', '2025-12-10 15:02:25'),
(12, 11, 'Long Distance Moving Services', 'Planning a move across cities or islands? Moving Express offers reliable and cost-effective long distance moving services across New Zealand.', '2025-12-10 15:02:39', '2025-12-10 15:02:39'),
(13, 12, 'House Relocation Services', 'Whether it’s a small home or a multi-bedroom property, our house relocation services offer an end-to-end moving experience you can trust.', '2025-12-10 15:02:54', '2025-12-10 15:02:54'),
(14, 13, 'Piano Shifting Services', 'Moving a piano isn\'t just about strength — it\'s about precision, care, and experience. At RM Moving Express, we specialize in safe and professional piano shifting across New Zealand, ensuring your valuable instrument arrives in perfect condition.', '2025-12-10 15:03:15', '2025-12-10 15:03:15'),
(15, 13, 'North & South Island Moving', 'Inter-island moves can be complex, but with Moving Express, it’s a smooth and well-coordinated experience.', '2025-12-10 15:03:29', '2025-12-10 15:03:29'),
(16, 14, 'North & South Island Moving', 'Inter-island moves can be complex, but with Moving Express, it’s a smooth and well-coordinated experience.', '2025-12-10 15:04:02', '2025-12-10 15:04:02'),
(17, 15, 'Bike, Car & Boat Transport', 'Need to move your vehicle? We offer professional bike, car, and boat transportation services anywhere in New Zealand.', '2025-12-10 15:04:19', '2025-12-10 15:04:19'),
(18, 16, 'Commercial Delivery', 'Delivering your dream kitchen? Trust Moving Express for reliable and damage-free kitchen cabinet delivery to your doorstep.', '2025-12-10 15:04:35', '2025-12-10 15:04:35'),
(19, 17, 'Senior Movers', 'Compassionate, professional moving services for seniors — making relocation smooth and worry-free for older adults.', '2025-12-10 15:04:51', '2025-12-10 15:04:51');

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
  `position` tinyint(1) NOT NULL DEFAULT 0,
  `photo` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0 for Inactive, 1 for Active, 2 for Deleted',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service_contents`
--

INSERT INTO `service_contents` (`id`, `service_name_id`, `sort_title`, `title`, `details`, `costs_title`, `costs_details`, `position`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(22, 7, 'Best Local Movers ', 'Need Help for Moving Across Town at Low cost? ', '<p>Our team of skilled local movers handles everything with care. We take pride in providing the best shifting services in Christchurch and across New Zealand. </p>', 'Worried About Moving Costs? ', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process. </p>', 0, '71383088_service.webp', 1, '2025-12-10 15:05:58', '2025-12-23 03:12:33'),
(23, 7, 'Local Movers', 'Cheap Local Movers in Christchurch', '<p>Local moving requires local guys who know the area completely from every street to every corner. At RM Moving Express we are the local movers of Christchurch who are providing the most affordable local shifting services.</p>', 'Flexible scheduling, transparent quotes', '<p>As experienced item movers in Christchurch, we provide flexible scheduling, transparent quotes, and top-notch customer service. Whether you\'re moving across the street or across town, we make your move hassle-free and cost-effective. Let our friendly, trained moving team take the stress out of your next local move.</p>', 1, '27277214_service.webp', 1, '2025-12-10 15:06:43', '2025-12-10 15:06:43'),
(24, 7, 'Local Movers', 'Affordable & Professional Local Moving Services', '<p>Finding a trustable item movers is very difficult at this age, we specialize in efficient local moving solutions for homes, companies and small offices. Our team handles all the items with care and ensure the safe delivery to your new location</p>', 'Fast, Easy, and Stress-free', '<p>We understand that no two moves are the same. That’s why we offer tailored moving services to suit your specific needs and schedule. From packing and lifting to transport and unloading, our Christchurch movers are here to make your move fast, easy, and stress-free—without stretching your budget.</p>', 0, '24467356_service.webp', 1, '2025-12-10 15:07:17', '2025-12-10 15:07:17'),
(25, 8, 'Cleaning and Decluttering', 'Let Us Handle the Mess', '<p>Clear the mess with RM Moving Express with professional cleaning and decluttering services. We are here to keep you more organized so you can focus on your important stuff.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '75614295_service.webp', 1, '2025-12-10 15:09:36', '2025-12-10 15:09:36'),
(26, 8, 'Cleaning and Decluttering', 'Fast & Affordable Cleaning Help', '<p>We sort things from what goes to donation and what goes to the dust bin. Some parts of the house like garages and attic need more cleaning than any other place, we specialized in both cleaning and decluttering services of all small places which is not easy to clear.</p>', 'Need Fast & Affordable Cleaning Help Before or After Your Move', '<p>Our team works fast and respects your schedule. We remove unwanted items, organize what\'s staying, and thoroughly clean the space for handover or personal comfort. Trust RM Moving Express to make your move easier with reliable, professional cleaning services at competitive prices.</p>', 1, '48014024_service.webp', 1, '2025-12-10 15:10:11', '2025-12-10 15:10:11'),
(27, 8, 'Cleaning and Decluttering', 'Get More Space with Professional Decluttering Services', '<p>It\'s time to transform dirty places into well organized and clean areas, this could only happened when done properly by expert cleaners.</p>', 'Your go-to movers in Christchurch', '<p>Whether you’re moving out, preparing for sale, or just need a reset, our experienced cleaners and movers handle it all. Affordable, quick, and thorough—we’re your go-to moving support team in Christchurch.</p>', 0, '52065351_service.webp', 1, '2025-12-10 15:10:44', '2025-12-10 15:10:44'),
(28, 9, 'Single Item Movers', 'Just One Item? We’ve Got You', '<p>Whether it’s a couch, fridge, or antique cabinet, we’ll move it with expert care and attention. We are the top rated single item movers in Wise Move</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process</p>', 0, '91393967_service.webp', 1, '2025-12-10 15:11:30', '2025-12-10 15:11:30'),
(29, 9, 'Single Item Movers', 'Quick & Safe Single Item Moves', '<p>The cheapest movers of single items like bed, fridge, sofa, furniture, mattress, chairs etc. Even if there is a small move within the same building or within a near location we provide the best low cost single item moving services in Christchurch.</p>', 'Best Single Item Movers in Christchurch', '<p>We offer flexible same-day or next-day options and treat every item like it\'s valuable—because to you, it is. No job is too small for our professional movers. We\'re here to make moving one thing just as easy as moving everything.</p>', 1, '65952396_service.webp', 1, '2025-12-10 15:12:04', '2025-12-10 15:12:04'),
(30, 9, 'Best Single Item Movers', 'Safe, Cheap Single Item Movers Near You', '<p>RM Moving Express is offering quick and professional single item moving and shifting services in Christchurch with budget friendly options. Single items like bed, electronics or any home appliances like fridge, TV, music station, piano we cover it all.</p>', 'Handle your item with care', '<p>We use the right gear and handle your item with care—every time. It’s fast, simple, and cheaper than hiring a big truck for a small job.</p>', 0, '13237708_service.webp', 1, '2025-12-10 15:12:40', '2025-12-10 15:12:40'),
(31, 10, 'Office Furniture Movers', 'Best Cheapest Office Furniture moving in Christchurch', '<p>RM moving express understands the complexities of shifting as it can become a hectic one if not done properly. You can trust us in handling your beautiful office furniture, tech equipment and official documents, cabinets and other office items.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '99085715_service.webp', 1, '2025-12-10 15:13:57', '2025-12-10 15:13:57'),
(32, 10, 'Office Furniture Movers', 'Smooth & Efficient Office Moves with Zero Downtime', '<p>Office shifting is a big task and complex too, only professionals can handle this with ease. RM Moving Express have a team of professional movers who are specialists in moving office furniture and have done this 100’s times before.</p>', 'After-hours and weekend moving', '<p>We offer after-hours and weekend moving options, tailored packing, and coordinated delivery. Trust RM Moving Express to handle your office move efficiently and professionally—so you can get back to business fast.</p>', 1, '16858667_service.webp', 1, '2025-12-10 15:15:27', '2025-12-10 15:15:27'),
(33, 10, 'Cheapest Office Relocations in Christchurch with Trusted Commercial Movers', 'Compare other quotes to us before hiring as you will find us the cheapest movers at Christchurch yet the best of the best listed in Wise Move as well.', '<p>Our local movers handle everything — from careful packing to safe transportation — ensuring your belongings arrive intact and on time. We take pride in providing professional, friendly, and prompt local moving solutions.</p>', 'Stress-free office moving', '<p>Our team works outside business hours to minimize downtime, and we provide full disassembly and reassembly services. Book us for a professional, stress-free office move that keeps your team focused on what matters.</p>', 0, '47286052_service.webp', 1, '2025-12-10 15:16:10', '2025-12-10 15:16:10'),
(34, 11, 'Long Distance Movers', 'Distance Doesn’t Matter, We’ve Got You', '<p>Whether it’s a solo relocation or an entire household, we make long-distance moves simple and secure</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process while offering movers services across NZ at low -cost.</p>', 0, '33555154_service.webp', 1, '2025-12-10 15:17:00', '2025-12-10 15:17:00'),
(35, 11, 'Long Distance Movers', 'Long Distance Cheapest Home Movers in Christchurch', '<p>When choosing your long distance moving partner, check their previous customers\' feedback first. Compare the quotes and also count on real experience, when done all this you will find RM Moving Express is the only movers in Christchurch who fulfill all these things.</p>', 'Stress free long distance moving', '<p>From start to finish, we manage every part of the move so you can relax. Our competitive pricing, timely updates, and reliable service make long distance moving easy and stress-free.</p>', 1, '84375455_service.webp', 1, '2025-12-10 15:17:32', '2025-12-10 15:17:32'),
(36, 11, 'Long Distance Movers', 'Reliable Long Distance Movers at Affordable Prices', '<p>Reliability is a big concern when moving for long distance relocation. At RM moving express we handle everything from packing to the destination placement with complete surety ensuring smooth transition.</p>', 'No hidden costs', '<p>Our pricing is transparent and competitive, with no hidden costs. Whether you’re moving from Auckland to Christchurch or anywhere in between, we’ve got the skills and trucks to get it done right.</p>', 0, '18434404_service.webp', 1, '2025-12-10 15:18:09', '2025-12-10 15:18:09'),
(37, 12, 'House Relocation Services', 'Your Home in Safe Hands', '<p>From packing and loading to transport and setup, we take care of every part of your move.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '59684957_service.webp', 1, '2025-12-10 15:19:00', '2025-12-10 15:19:00'),
(38, 12, 'House Relocation Services', 'Reliable House Moves Across New Zealand', '<p>Russel and his team are the best in house relocation” Thats, the quote we receive after every house relocation services given to the households of Christchurch. Changing of house is a big decision in life and not something that can be done frequently and at this stage you need a right partner who can give you peace of mind in the whole relocation process.</p>', 'Flexible moving options', '<p>We offer full-service or flexible moving options tailored to your schedule and budget. Whether you’re moving down the street or across the country, we make house shifting simple.</p>', 1, '31517656_service.webp', 1, '2025-12-10 15:20:22', '2025-12-10 15:20:22'),
(39, 12, 'House Relocation Services', 'House Movers That Make Moving Feel Easy', '<p>Are you searching for the cheapest house relocation services in Christchurch, You’ve come to the right place. RM Moving services is the best yet the cheapest house movers in this locality.</p>', 'Moving with high care', '<p>We treat your belongings with care and respect while keeping to your timeline and budget. Whether you’re upsizing, downsizing, or just shifting neighborhoods, we make it all feel effortless</p>', 0, '27888651_service.webp', 1, '2025-12-10 15:20:56', '2025-12-10 15:20:56'),
(40, 13, 'Piano Movers Christchurch', 'Need Expert Help Moving a Piano?', '<p>Pianos are delicate, heavy, and require expert handling. Our trained movers use specialized equipment, protective padding, and secure transport methods to move your upright or grand piano safely — whether it\'s within your home, across town, or to a new city.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process</p>', 0, '29745538_service.webp', 1, '2025-12-10 15:21:46', '2025-12-10 15:21:46'),
(41, 13, 'Piano Movers in Christchurch', 'Specialized Piano Movers You Can Trust', '<p>Moving a piano is a delicate job, and we’re the pros who can do it right. Whether it’s an upright or baby grand, RM Moving Express uses proper equipment and trained handlers to ensure your instrument is protected during every step of the move.</p>', 'Long Distance Piano Movers', '<p>We treat your piano like the fine instrument it is—because moving music requires more than muscle. Trust our team for careful, affordable, and professional piano shifting.</p>', 1, '42371428_service.webp', 1, '2025-12-10 15:22:22', '2025-12-10 15:22:22'),
(42, 13, 'Piano Moving services in Christchurch', 'Best Piano Movers and Trained Professionals', '<p>Moving a piano requires skill, precision, and care. At RM Moving Express, we offer professional piano shifting services for upright and grand pianos alike.</p>', 'Moving without a scratch', '<p>Our team uses proper lifting equipment, padding, and transport gear to ensure your instrument arrives without a scratch. Whether it’s a family heirloom or a performance piece, we move it safely, affordably, and on your schedule.</p>', 0, '78905634_service.webp', 1, '2025-12-10 15:23:03', '2025-12-10 15:23:03'),
(43, 14, 'North & South Island Movers', 'Relocate Across Islands, Hassle-Free', '<p>We manage the logistics of moving between the North and South Island so you don’t have to worry.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '86735600_service.webp', 1, '2025-12-10 15:23:47', '2025-12-10 15:23:47'),
(44, 14, 'North & South Island Movers', 'Inter-Island Moving Made Simple', '<p>Whether you’re moving from the North Island to the South or vice versa, RM Moving Express offers reliable inter-island transport for homes and businesses. We handle logistics, ferry bookings, and delivery so you don’t have to worry about anything.</p>', 'Professional movers across islands', '<p>From packing to final setup, we manage your move end-to-end. Get peace of mind with professional movers who know how to move across islands efficiently.</p>', 1, '97274207_service.webp', 1, '2025-12-10 15:24:30', '2025-12-10 15:24:30'),
(45, 14, 'North & South Island Movers', 'Inter-Island Moving Services You Can Rely On', '<p>Moving between islands? RM Moving Express offers fully managed North and South Island moving services. We coordinate ferry transport, logistics, and safe delivery across Christchurch and New Zealand.</p>', 'Affordable, secure and on-time', '<p>Our team handles everything from home contents to office equipment. Affordable, secure, and on time—inter-island moving doesn’t have to be stressful when you’ve got the right partner on your side.</p>', 1, '34349044_service.webp', 1, '2025-12-10 15:25:04', '2025-12-10 15:25:04'),
(46, 15, 'Bike, Car & Boat Transport', 'Trusted Vehicle Transport Across NZ', '<p>We use secure carriers and experienced staff to safely transport your vehicle door-to-door or depot-to-depot.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '49561413_service.webp', 1, '2025-12-10 15:25:45', '2025-12-10 15:25:45'),
(47, 15, 'Bike, Car & Boat Transport', 'Safe & Reliable Vehicle Transport Across NZ', '<p>Need to move a bike, car, or even a boat? We’ve got the right equipment and experienced team to get your vehicle delivered safely, on time, and at an affordable price.</p>', 'Loading with professional care', '<p>Our vehicle transport service is fully insured, and we handle loading, securing, and transport with professional care. Whether short haul or cross-country, we’ve got you covered.</p>', 1, '61352030_service.webp', 1, '2025-12-10 15:26:24', '2025-12-10 15:26:24'),
(48, 15, 'Bike, Car & Boat Transport', 'Specialist Vehicle Movers Across New Zealand', '<p>Whether it’s a bike, car, or boat, RM Moving Express offers safe and affordable vehicle transport services across NZ. Our team secures your vehicle using industry-standard equipment and ensures smooth, damage-free delivery</p>', 'City moves to countryside', '<p>From city moves to rural locations, we handle it all with care and precision. Choose us for fast turnaround, competitive pricing, and complete peace of mind.</p>', 0, '24055376_service.webp', 1, '2025-12-10 15:26:55', '2025-12-10 15:26:55'),
(49, 16, 'Commercial Moving', 'Fragile & Bulky? We Deliver with Care', '<p>We understand the value and sensitivity of cabinetry. Our experts ensure every cabinet is wrapped, loaded, and delivered safely.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '69403957_service.webp', 1, '2025-12-10 15:27:37', '2025-12-10 15:27:37'),
(50, 16, 'Commercial Moving', 'Affordable Commercial Moving Done Right', '<p>Need a kitchen cabinet or other large furniture item delivered? RM Moving Express offers secure, same-day or next-day delivery at prices that won’t break the bank. We handle pick-up, loading, and safe transport for a wide range of furniture items.</p>', 'Extra care to protect things', '<p>We take extra care to protect surfaces and corners during loading and unloading. Whether it’s from a warehouse or online marketplace, we’ll get it there safely.</p>', 1, '84799963_service.webp', 1, '2025-12-10 15:28:13', '2025-12-10 15:28:13'),
(51, 17, 'Senior Movers', 'Gentle Moves with Extra Care', '<p>Our team offers patient, respectful moving support tailored to seniors relocating to new homes, care facilities, or family residences.</p>', 'Worried About Moving Costs?', '<p>We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.</p>', 0, '44303736_service.webp', 1, '2025-12-10 15:28:54', '2025-12-10 15:28:54'),
(52, 17, 'Senior Movers', 'Compassionate & Professional Moving Help for Seniors', '<p>Moving can be overwhelming, especially for seniors. That’s why RM Moving Express offers a calm, respectful, and organized moving experience tailored for older adults. Our team is patient, careful, and ready to help every step of the way.</p>', 'Smooth Transition', '<p>Whether downsizing or relocating to assisted living, we make the transition smooth and supportive for seniors and their families.</p>', 1, '82219768_service.webp', 1, '2025-12-10 15:29:23', '2025-12-10 15:29:23'),
(53, 17, 'Senior Movers', 'Caring & Supportive Moving Help for Seniors', '<p>Our senior moving service is designed with comfort and care in mind. RM Moving Express helps older adults move with ease—whether it’s into a retirement village, smaller home, or with family.</p>', 'Simple move for Seniors', '<p>We assist with packing, transport, and setup while showing patience and respect throughout the process. It’s more than moving—it’s making transitions simpler for the people who need it most.</p>', 0, '67569974_service.webp', 1, '2025-12-10 15:29:55', '2025-12-10 15:29:55');

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
(7, 'Local Moving', 'local-moving', 1, '2025-12-10 02:58:34', '2025-12-23 03:10:39'),
(8, 'Cleaning and Decluttering Services', 'cleaning-and-decluttering-services', 1, '2025-12-10 02:58:56', '2025-12-10 02:58:56'),
(9, 'Single Item Movers', 'single-item-movers', 1, '2025-12-10 02:59:08', '2025-12-10 02:59:08'),
(10, 'Office Furniture Moving Services', 'office-furniture-moving-services', 1, '2025-12-10 02:59:17', '2025-12-10 02:59:17'),
(11, 'Long Distance Moving Services', 'long-distance-moving-services', 1, '2025-12-10 02:59:26', '2025-12-10 02:59:26'),
(12, 'House Relocation Services', 'house-relocation-services', 1, '2025-12-10 02:59:34', '2025-12-10 02:59:34'),
(13, 'Piano Shifting Services', 'piano-shifting-services', 1, '2025-12-10 02:59:42', '2025-12-10 02:59:42'),
(14, 'North & South Island Moving', 'north-south-island-moving', 1, '2025-12-10 02:59:50', '2025-12-10 02:59:50'),
(15, 'Bike, Car & Boat Transport', 'bike-car-boat-transport', 1, '2025-12-10 03:00:00', '2025-12-10 03:00:00'),
(16, 'Kitchen Cabinet Delivery', 'kitchen-cabinet-delivery', 1, '2025-12-10 03:00:09', '2025-12-10 03:00:09'),
(17, 'Senior Movers', 'senior-movers', 1, '2025-12-10 03:00:18', '2025-12-10 03:00:18');

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
(7, 7, 'What You Get with Our Local Moving Service ', 'When you choose RM Moving Express for your local move, you get more than just a couple of guys with a truck. We offer a full-service experience—careful packing, efficient loading, safe transportation, and reliable unloading at your new place ', '<p>Experienced Local Movers:Trained professionals who know how to navigate tight spaces and handle your items with care.</p><p>Quick Turnaround:We make sure your local move is done fast without compromising on safety or quality.</p><p>Packing &amp; Unpacking Options:Choose full-service packing or opt for help only where you need it.</p><p>Modern Equipment:From moving blankets to trolleys and secure vans, we come prepared.</p><p>Affordable &amp; Transparent Pricing:No hidden fees — just honest, competitive rates for top-tier service. </p>', 'Need Local Moving Help Fast? ', '<p>Looking to move across town without the stress or the high price tag? RM Moving Express offers quick, efficient, and budget-friendly local moving solutions tailored to your needs. Whether you\'re shifting a small apartment or a family home, we’ll handle everything with care and speed. Our experienced team knows the ins and outs of local moves, and we work around your schedule to make the process seamless. Best of all, our pricing is transparent and competitive—so no surprises, just smooth service. </p>', '2025-12-10 15:32:24', '2025-12-23 03:13:58'),
(8, 8, 'What You Get with Our Cleaning & Decluttering', 'We help you clean, clear, and refresh your space—no mess, no stress. Fast, affordable, and perfect for move-outs or general home resets.', '<p>Move-In/Move-Out Cleaning:Thorough cleaning of kitchens, bathrooms, living areas, and more.</p><p>Decluttering Support:We help you sort, pack, and remove unnecessary items before the big day.</p><p>Eco-Friendly Disposal:We donate or responsibly dispose of unwanted items whenever possible.</p><p>Flexible Scheduling:Book your service at your convenience, even on short notice.</p><p>Affordable Add-On Service:Combine it with your move for a bundled discount.</p>', 'Need Help with Cleaning & Decluttering?', '<p>Moving out or refreshing your space? Our team can handle your cleaning and decluttering needs quickly and affordably. We help you clear out the mess, sort what matters, and leave your space spotless. Whether it\'s a pre-move cleanup or post-move refresh, we’ll take care of it all—saving you time, stress, and energy. Our rates are competitive, and we always work to fit your schedule.</p>', '2025-12-10 15:33:32', '2025-12-10 23:27:53'),
(9, 9, 'What You Get with Our Single Item Moving', 'Whether it\'s a sofa or fridge, we move it safely and on time. Ideal for small moves without the big price tag.', '<p>On-Demand Availability:Book a quick move for a single item, even on the same day.</p><p>Specialty Item Handling:We move items like safes, appliances, and large furniture safely and securely.</p><p>Protective Materials Used:We wrap and cushion items to avoid damage during transport.</p><p>Trained Movers:Experienced staff who know how to lift and move heavy objects safely.</p><p>Budget-Friendly Pricing:Pay only for what you move — no unnecessary fees.</p>', 'Moving Just One Item?', '<p>No job is too small for us! Whether it\'s a couch, fridge, or a heavy dresser, we provide quick and affordable single-item moving services. Our team will pick up and deliver with care, saving you the hassle of figuring it out yourself. Same-day service available in most areas!</p>', '2025-12-10 15:34:16', '2025-12-10 23:28:05'),
(10, 10, 'What You Get with Our Office Moving Service', 'We handle desks, chairs, and workstations with speed and care. Minimize downtime and let us manage the heavy lifting.', '<p>Dedicated Project Coordination:One point of contact to oversee your entire office relocation.</p><p>IT &amp; Furniture Handling:Careful packing and moving of computers, desks, and office equipment.</p><p>After-Hours Moving:We work on weekends or evenings to minimize business disruption.</p><p>Inventory &amp; Labeling:Organized tracking of your assets for smooth unpacking.</p><p>Licensed &amp; Insured Service:Full protection for your valuable office items.</p>', 'Need Office Furniture Moved?', '<p>Business move coming up? We specialize in safe and swift office furniture moves at cost-effective rates. From desks to workstations, we move it all with zero fuss. We work around your business hours to minimize disruption, so you can keep your operations running smoothly.</p>', '2025-12-10 15:34:59', '2025-12-10 23:30:14'),
(11, 11, 'What You Get with Our Long Distance Service', 'Reliable cross-country moving without the hassle or high costs. We ensure your items arrive safely, no matter the distance.', '<p>Nationwide Coverage:We move you anywhere in New Zealand — North or South Island.</p><p>Real-Time Tracking:Stay informed with updates on your shipment.</p><p>Careful Packing &amp; Loading:We ensure long-haul safety with expert packing and vehicle loading.</p><p>Flexible Scheduling:Choose your date and time — we’ll handle the logistics.</p><p>Affordable Packages:Competitive pricing tailored to distance and load size.</p>', 'Planning a Long Distance Move?', '<p>Don’t let the distance stress you out! RM Moving Express offers fast, secure, and affordable long-distance moving services across New Zealand. Our experienced team handles everything from packing to delivery, ensuring your belongings arrive safely, no matter the distance.</p>', '2025-12-10 15:35:42', '2025-12-10 23:30:49'),
(12, 12, 'What You Get with Our House Relocation', 'We make full house moves smooth, secure, and budget-friendly. Our team manages packing, transport, and setup from start to finish.', '<p>Full-Service Moving:Packing, transport, and setup done by trained pros.</p><p>Packing Supplies Included:We bring boxes, wrap, tape, and tools.</p><p>Furniture Assembly:Disassembly and reassembly of furniture as needed.</p><p>Fragile Item Protection:Special care for delicate items like glassware and electronics.</p><p>Move-In Ready Service:We’ll even help place your furniture where you want it.</p>', 'Shifting to a New Home?', '<p>We make house moves easy, fast, and affordable. Our friendly movers ensure your furniture and valuables are handled with care and precision. Whether you\'re upsizing or downsizing, we’ve got the gear and experience to make your move stress-free.</p>', '2025-12-10 15:36:38', '2025-12-10 23:28:31'),
(13, 13, 'Why Choose RM Moving Express?', 'Specialized equipment and skilled hands to move your piano safely. We treat your instrument with the care it deserves.', '<p>Seamless Project Management: From the moment you book, we assign a coordinator to manage your move, keeping you informed at every step.</p><p>Trained &amp; Trusted Movers:Our team is experienced in handling sensitive items like pianos, antiques, and artwork with care.</p><p>Tailored Solutions:We offer flexible booking options and services based on your specific piano type and location.</p><p>Efficiency &amp; Care:We move quickly without compromising on safety, saving you time and worry.</p>', 'Need to Move a Piano?', '<p>Moving a piano is no ordinary job—and we treat it like the treasure it is. Our team is trained to handle piano shifting safely, efficiently, and affordably. From upright to baby grand, we’ll make sure your instrument is transported without a scratch.</p>', '2025-12-10 15:38:26', '2025-12-10 23:31:51'),
(14, 14, 'What You Get with Inter-Island Moving', 'Stress-free inter-island moves with organized logistics and careful handling. We take care of everything—so you don’t have to.', '<p>Coastal Transport Coordination:We handle ferry schedules and inter-island transfers seamlessly.</p><p>Safe &amp; Secure Transit:Proper packing and insured service for long-distance moves.</p><p>Dedicated Move Manager:One point of contact for stress-free coordination.</p><p>Flexible Delivery Options:Choose door-to-door or depot-based delivery.</p><p>Reliable Timing:Your items arrive on schedule — no delays.</p>', 'Moving Between Islands?', '<p>Whether you\'re going from North to South or vice versa, we offer reliable inter-island moving services that are both fast and budget-friendly. We handle all logistics so you don’t have to—making your big move easier than ever.</p>', '2025-12-10 15:39:19', '2025-12-10 23:28:44'),
(15, 15, 'What You Get with Vehicle Transport', 'Safe and reliable transport for vehicles of all sizes. We deliver across NZ, with secure handling and quick turnaround.', '<p>Fully Insured Transport:Peace of mind for your valuable car, bike, or boat.</p><p>Nationwide Coverage:We transport to and from any city in NZ.</p><p>Specialty Carriers:Equipped trailers designed for different vehicle types.</p><p>Pickup &amp; Drop-Off Flexibility:Home, depot, or specified location — we’re flexible.</p><p>Affordable &amp; Transparent Rates:No surprises — you get a full quote upfront.</p>', 'Vehicle to Transport?', '<p>Need to shift a car, bike, or even a boat? We\'ve got the transport solutions to get your vehicle safely where it needs to go. With careful handling and reliable delivery times, we make vehicle moves simple and stress-free.</p>', '2025-12-10 15:39:55', '2025-12-10 23:28:53'),
(16, 16, 'What You Get with Kitchen Cabinet Delivery', 'Swift, damage-free delivery of cabinets and furniture at great rates. Perfect for store drops or online purchases.', '<p>Special Packing Materials:Cushioned protection for panels, doors, and accessories.</p><p>Trained Delivery Crew:Professionals who know how to handle fragile, heavy items.</p><p>Scheduled Delivery Slots:On-time service that fits your renovation schedule.</p><p>Door-to-Door Service:Cabinets delivered directly to your site.</p><p>Affordable &amp; Flexible Rates:Pay only for what you need — no surprise charges.</p>', 'Delivering a Kitchen Cabinet?', '<p>Bought a new kitchen cabinet? We’ll get it to your doorstep safely and quickly—without overcharging you.</p><p></p><p>Our single-item delivery service is ideal for furniture drops, and we treat every item like it’s our own.</p>', '2025-12-10 15:40:40', '2025-12-10 15:40:40'),
(17, 17, 'What You Get with Senior Moving Services', 'Gentle, respectful moving support tailored for seniors. We handle the heavy work while keeping things comfortable and clear.', '<p>Personalized Assistance:Help with packing, unpacking, and settling into the new home.</p><p>Friendly Movers:Our crew treats clients like family.</p><p>Flexible Timing:We work around your preferred moving hours.</p><p>Safe &amp; Gentle Handling:We treat every item and person with the utmost care.</p><p>Stress-Free Transitions:Support throughout the moving day to keep it smooth and easy.</p>', 'Helping Seniors Move with Care?', '<p>We offer specialized moving services for seniors, focused on comfort, care, and clear communication. Our team ensures a smooth, respectful moving experience every step of the way.</p><p></p><p>Whether downsizing or transitioning to assisted living, we’re here to help—gently and affordably.</p>', '2025-12-10 15:41:30', '2025-12-10 23:29:18');

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
(6, 'Operations Manager', 'Russel Rahman', '<p>Rasel is the engine behind RM Moving Express. He oversees daily operations, coordinates logistics, and ensures every job runs smoothly. With a sharp eye for detail and a strong focus on customer care, Rasel is your go-to guy for a seamless moving experience. fffff</p>', '80207396_service.webp', 1, '2025-12-10 05:30:29', '2025-12-25 17:45:49'),
(7, 'Professional Loader', 'Deepu Singh', '<p>Deepu Sing brings strength, speed, and a great attitude to every move. Whether it’s heavy furniture or fragile items, he handles everything with care and precision. His work ethic and reliability have earned him praise from countless happy clients.</p>', '46298506_service.webp', 1, '2025-12-10 05:30:56', '2025-12-23 03:05:01'),
(8, 'Professional Loader', 'Arun Singh', '<p>Arun Sing is all about safety and efficiency. He’s always ready to lend a hand, making sure your belongings are securely packed and transported with minimal hassle. His friendly nature and professionalism make him a key part of every successful move.</p>', '94174409_service.webp', 1, '2025-12-10 05:31:18', '2025-12-19 17:00:09');

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
-- Dumping data for table `test_abouts`
--

INSERT INTO `test_abouts` (`id`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(33, '75701382_service.jpg', 1, '2025-09-13 00:32:55', '2025-09-13 00:32:55'),
(34, '78428944_service.jpg', 1, '2025-09-13 00:32:58', '2025-09-13 00:32:58'),
(35, '90855320_service.jpg', 1, '2025-09-13 00:33:01', '2025-09-13 00:33:01'),
(36, '58053802_service.jpg', 1, '2025-09-13 00:33:14', '2025-09-13 00:33:14');

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
-- Indexes for table `service_banners`
--
ALTER TABLE `service_banners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_banners_service_name_id_foreign` (`service_name_id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `adonis_test_ones`
--
ALTER TABLE `adonis_test_ones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=600;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `happy_customers`
--
ALTER TABLE `happy_customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `home_banners`
--
ALTER TABLE `home_banners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `home_services`
--
ALTER TABLE `home_services`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `house_moving_experts`
--
ALTER TABLE `house_moving_experts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `service_banners`
--
ALTER TABLE `service_banners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `service_contents`
--
ALTER TABLE `service_contents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `service_names`
--
ALTER TABLE `service_names`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `service_section_twos`
--
ALTER TABLE `service_section_twos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `test_abouts`
--
ALTER TABLE `test_abouts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
-- Constraints for table `service_banners`
--
ALTER TABLE `service_banners`
  ADD CONSTRAINT `service_banners_service_name_id_foreign` FOREIGN KEY (`service_name_id`) REFERENCES `service_names` (`id`) ON DELETE CASCADE;

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
