CREATE DATABASE IF NOT EXISTS skillforge
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE skillforge;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    interests TEXT NULL,
    skill_level VARCHAR(30) NOT NULL DEFAULT 'Beginner',
    learning_goal VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(80) NOT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_enrollment (user_id, course_id),
    CONSTRAINT fk_enrollment_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(80) NOT NULL,
    module_id VARCHAR(80) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    completed_at TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY uq_progress (user_id, course_id, module_id),
    CONSTRAINT fk_progress_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(80) NOT NULL,
    score TINYINT UNSIGNED NOT NULL,
    correct_answers TINYINT UNSIGNED NOT NULL,
    total_questions TINYINT UNSIGNED NOT NULL DEFAULT 10,
    performance VARCHAR(40) NOT NULL,
    weak_modules TEXT NULL,
    answers_json LONGTEXT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_quiz_user_course (user_id, course_id),
    CONSTRAINT fk_quiz_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;
