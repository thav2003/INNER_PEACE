-- User 1: Admin user
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id)
VALUES ('Admin User', '123456789', 'admin@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'ADMIN', true, 'DATABASE', null);
SET @user1_id = LAST_INSERT_ID();
-- User 2: Manager user
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id)
VALUES ('Manager User', '987654321', 'manager@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'MANAGER', true, 'DATABASE', null);
SET @user2_id = LAST_INSERT_ID();
-- User 3: Customer user with Google login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id)
VALUES ('Customer User', '555555555', 'customer@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'GOOGLE', 'google_provider_id');
SET @user3_id = LAST_INSERT_ID();
-- User 4: Customer user with Facebook login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id)
VALUES ('Facebook User', '777777777', 'facebook@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'FACEBOOK', 'facebook_provider_id');
SET @user4_id = LAST_INSERT_ID();
-- User 5: Customer user with DATABASE login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id)
VALUES ('Database Customer', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null);
SET @user5_id = LAST_INSERT_ID();






-- Lesson 1
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Lesson 1', 60, 'Introduction to Programming', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 2
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Lesson 2', 45, 'Database Design Basics', true, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 3
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Lesson 3', 30, 'Web Development Fundamentals', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 4
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Advanced Java Programming', 75, 'Advanced concepts in Java programming language', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 5
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Introduction to SQL', 60, 'Fundamentals of SQL and relational databases', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 6
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Web Development with Spring Boot', 90, 'Building web applications using Spring Boot framework', true, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 7
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Python for Data Analysis', 120, 'Using Python for data manipulation and analysis', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 8
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Introduction to Machine Learning', 90, 'Basic concepts and algorithms in machine learning', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 9
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Data Structures and Algorithms', 120, 'Fundamental data structures and algorithms', true, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 10
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Android App Development', 150, 'Developing mobile applications for Android platform', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 11
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Introduction to Cybersecurity', 60, 'Basic principles of cybersecurity', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 12
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Cloud Computing Basics', 90, 'Introduction to cloud computing services and providers', true, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 13
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('React.js Essentials', 75, 'Building user interfaces with React.js library', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 14
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Artificial Intelligence Applications', 120, 'Real-world applications of artificial intelligence', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 15
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Node.js Fundamentals', 90, 'Building scalable network applications with Node.js', true, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 16
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Digital Marketing Strategies', 60, 'Essential strategies and tools in digital marketing', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 17
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('UI/UX Design Principles', 75, 'Fundamentals of user interface and user experience design', true, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 18
INSERT INTO lessons (name, duration, description, is_vip, video_url, img_url, created_at, updated_at)
VALUES ('Blockchain Technology', 120, 'Understanding blockchain technology and cryptocurrencies', false, '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());


