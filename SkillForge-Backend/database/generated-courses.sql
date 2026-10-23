-- Additive migration. Select the existing SkillForge database before running.
CREATE TABLE IF NOT EXISTS generated_courses (
    id VARCHAR(80) PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(160) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    level VARCHAR(30) NOT NULL,
    learning_goal VARCHAR(600) NOT NULL,
    description TEXT NOT NULL,
    learning_outcomes JSON NOT NULL,
    module_count TINYINT UNSIGNED NOT NULL,
    source ENUM('gemini', 'template') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (module_count BETWEEN 5 AND 10)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS generated_modules (
    id VARCHAR(80) PRIMARY KEY,
    course_id VARCHAR(80) NOT NULL,
    position TINYINT UNSIGNED NOT NULL,
    title VARCHAR(160) NOT NULL,
    duration VARCHAR(40) NOT NULL,
    summary TEXT NOT NULL,
    key_points JSON NOT NULL,
    guide JSON NOT NULL,
    example JSON NULL,
    recommended_search VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_generated_module_position (course_id, position),
    UNIQUE KEY uq_generated_module_course (course_id, id),
    FOREIGN KEY (course_id) REFERENCES generated_courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS generated_questions (
    id VARCHAR(80) PRIMARY KEY,
    course_id VARCHAR(80) NOT NULL,
    module_id VARCHAR(80) NOT NULL,
    position TINYINT UNSIGNED NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    topic VARCHAR(160) NOT NULL,
    question TEXT NOT NULL,
    options JSON NOT NULL,
    correct_option TINYINT UNSIGNED NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_generated_question_position (course_id, position),
    FOREIGN KEY (course_id) REFERENCES generated_courses(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id, module_id) REFERENCES generated_modules(course_id, id) ON DELETE CASCADE,
    CHECK (correct_option BETWEEN 0 AND 3)
) ENGINE=InnoDB;
