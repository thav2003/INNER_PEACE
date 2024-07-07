-- User 1: Admin user
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Admin User', '123456789', 'admin@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'ADMIN', true, 'DATABASE', null, NOW());
SET @user1_id = LAST_INSERT_ID();
-- User 2: Manager user
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Manager User', '987654321', 'manager@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'MANAGER', true, 'DATABASE', null, NOW());
SET @user2_id = LAST_INSERT_ID();
-- User 3: Customer user with Google login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Customer User', '555555555', 'customer@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'GOOGLE', 'google_provider_id', NOW());
SET @user3_id = LAST_INSERT_ID();
-- User 4: Customer user with Facebook login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Facebook User', '777777777', 'facebook@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'FACEBOOK', 'facebook_provider_id', NOW());
SET @user4_id = LAST_INSERT_ID();
-- User 5: Customer user with DATABASE login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
SET @user5_id = LAST_INSERT_ID();


INSERT INTO user_packages(user_id, package_name)
VALUES
(1,"Basic"),
(2,"Basic"),
(3,"Basic"),
(4,"Basic"),
(5,"Basic");



-- Lesson 1
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Lesson 1', 60, 'Introduction to Programming', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 2
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Lesson 2', 45, 'Database Design Basics', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 3
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Lesson 3', 30, 'Web Development Fundamentals', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 4
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Advanced Java Programming', 75, 'Advanced concepts in Java programming language', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 5
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Introduction to SQL', 60, 'Fundamentals of SQL and relational databases', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 6
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Web Development with Spring Boot', 90, 'Building web applications using Spring Boot framework', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 7
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Python for Data Analysis', 120, 'Using Python for data manipulation and analysis', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 8
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Introduction to Machine Learning', 90, 'Basic concepts and algorithms in machine learning', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 9
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Data Structures and Algorithms', 120, 'Fundamental data structures and algorithms', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 10
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Android App Development', 150, 'Developing mobile applications for Android platform', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 11
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Introduction to Cybersecurity', 60, 'Basic principles of cybersecurity', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 12
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Cloud Computing Basics', 90, 'Introduction to cloud computing services and providers', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 13
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('React.js Essentials', 75, 'Building user interfaces with React.js library', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 14
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Artificial Intelligence Applications', 120, 'Real-world applications of artificial intelligence', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 15
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Node.js Fundamentals', 90, 'Building scalable network applications with Node.js', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 16
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Digital Marketing Strategies', 60, 'Essential strategies and tools in digital marketing', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 17
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('UI/UX Design Principles', 75, 'Fundamentals of user interface and user experience design', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

-- Lesson 18
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Blockchain Technology', 120, 'Understanding blockchain technology and cryptocurrencies', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'thumbnail_1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4.png', NOW(), NOW());

INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (1, 'Packages', NULL, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (2, 'Basic', 1, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (3, 'Essential', 1, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (4, 'Premium', 1, NOW(), NOW());

-- Insert root category "Yoga"
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (13, 'Yoga', NULL, NOW(), NOW());

-- Insert sub-categories under "Yoga"
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (14, 'Beginner', 13, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (15, 'Intermediate', 13, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (16, 'Advanced', 13, NOW(), NOW());

-- Insert root category "Fitness"
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (20, 'Fitness', NULL, NOW(), NOW());

-- Insert sub-categories under "Fitness"
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (21, 'Cardio', 20, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (22, 'Strength Training', 20, NOW(), NOW());

-- Insert root category "Cooking"
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (30, 'Cooking', NULL, NOW(), NOW());

-- Insert sub-categories under "Cooking"
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (31, 'Vegetarian', 30, NOW(), NOW());
INSERT INTO lesson_categories (id, name, parent_id, created_at, updated_at)
VALUES (32, 'Desserts', 30, NOW(), NOW());


INSERT INTO lesson_category (lesson_id, category_id)
VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 3),
(8, 4),
(9, 3),
(10, 4),
(11, 3),
(12, 4),
(13, 4),
(14, 3),
(15, 2),
(16, 2),
(17, 2),
(18, 2);

-- Daily Meal Plan 1
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-03', 'BREAKFAST', @user1_id, NOW(), NOW());
SET @dailyMealPlan1_id = LAST_INSERT_ID();

-- Daily Meal Plan 2
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-03', 'LUNCH', @user1_id, NOW(), NOW());
SET @dailyMealPlan2_id = LAST_INSERT_ID();

-- Daily Meal Plan 3
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-03', 'DINNER', @user2_id, NOW(), NOW());
SET @dailyMealPlan3_id = LAST_INSERT_ID();

-- Daily Meal Plan 4
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-04', 'BREAKFAST', @user3_id, NOW(), NOW());
SET @dailyMealPlan4_id = LAST_INSERT_ID();

-- Daily Meal Plan 5
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-04', 'LUNCH', @user4_id, NOW(), NOW());
SET @dailyMealPlan5_id = LAST_INSERT_ID();

-- Daily Meal Plan 6
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-04', 'DINNER', @user5_id, NOW(), NOW());
SET @dailyMealPlan6_id = LAST_INSERT_ID();

-- Daily Meal Plan 7
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-04', 'BREAKFAST', @user1_id, NOW(), NOW());
SET @dailyMealPlan7_id = LAST_INSERT_ID();

-- Daily Meal Plan 8
INSERT INTO daily_meal_plans (date, slot, user_id, created_at, updated_at)
VALUES ('2024-07-04', 'DINNER', @user1_id, NOW(), NOW());
SET @dailyMealPlan8_id = LAST_INSERT_ID();

-- Meals for Daily Meal Plan 1
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan1_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan1_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan1_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 2
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan2_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan2_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan2_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 3
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan3_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan3_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan3_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 4
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan4_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan4_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan4_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 5
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan5_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan5_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan5_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 6
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan6_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan6_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan6_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 7
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan7_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan7_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan7_id, NOW(), NOW(), 'Products');

-- Meals for Daily Meal Plan 8
INSERT INTO meals (meal_id,name, quantity, unit, daily_meal_plan_id, created_at, updated_at, type_food)
VALUES (656817,'Pork Schnitzel And Apple Salad', 2, 'phần', @dailyMealPlan8_id, NOW(), NOW(), 'Recipes'),
       (650946,'Maple-Nut Oatmeal Cream Pies', 2, 'phần', @dailyMealPlan8_id, NOW(), NOW(), 'Recipes'),
       (10052066,'Sweet apple braided brioche', 1, 'phần', @dailyMealPlan8_id, NOW(), NOW(), 'Products');

-- Daily Meal Plan Nutrients for @dailyMealPlan1_id
INSERT INTO nutrients (name, amount, unit, percent_of_daily_needs, nutrition_id) VALUES
('Alcohol', 0.2, 'g', 1.08, @dailyMealPlan1_id),
('Caffeine', 0, 'mg', 0, @dailyMealPlan1_id),
('Calcium', 434.27, 'mg', 43.43, @dailyMealPlan1_id),
('Calories', 2000, 'kcal', 94.98, @dailyMealPlan1_id),
('Carbohydrates', 154.64, 'g', 51.55, @dailyMealPlan1_id),
('Cholesterol', 306.24, 'mg', 102.08, @dailyMealPlan1_id),
('Choline', 5.1, 'mg', 0, @dailyMealPlan1_id),
('Copper', 0.53, 'mg', 26.19, @dailyMealPlan1_id),
('Fat', 102.54, 'g', 157.77, @dailyMealPlan1_id),
('Fiber', 8.48, 'g', 33.95, @dailyMealPlan1_id),
('Fluoride', 4.95, 'mg', 0, @dailyMealPlan1_id),
('Folate', 82.81, 'µg', 20.7, @dailyMealPlan1_id),
('Folic Acid', 0, 'µg', 0, @dailyMealPlan1_id),
('Iron', 9.71, 'mg', 53.94, @dailyMealPlan1_id),
('Lycopene', 0, 'µg', 0, @dailyMealPlan1_id),
('Magnesium', 143.44, 'mg', 35.87, @dailyMealPlan1_id),
('Manganese', 0.85, 'mg', 42.54, @dailyMealPlan1_id),
('Mono Unsaturated Fat', 0.01, 'g', 0, @dailyMealPlan1_id),
('Net Carbohydrates', 146.15, 'g', 53.14, @dailyMealPlan1_id),
('Phosphorus', 1015.55, 'mg', 101.56, @dailyMealPlan1_id),
('Poly Unsaturated Fat', 0.08, 'g', 0, @dailyMealPlan1_id),
('Potassium', 1828.11, 'mg', 52.23, @dailyMealPlan1_id),
('Protein', 89.8, 'g', 179.61, @dailyMealPlan1_id),
('Saturated Fat', 43.52, 'g', 272.05, @dailyMealPlan1_id),
('Selenium', 80.06, 'µg', 114.36, @dailyMealPlan1_id),
('Sodium', 912.25, 'mg', 39.67, @dailyMealPlan1_id),
('Sugar', 110.27, 'g', 122.51, @dailyMealPlan1_id),
('Trans Fat', 0, 'g', 0, @dailyMealPlan1_id),
('Vitamin A', 769.99, 'IU', 15.4, @dailyMealPlan1_id),
('Vitamin B1', 0.89, 'mg', 59.03, @dailyMealPlan1_id),
('Vitamin B12', 11.06, 'µg', 184.38, @dailyMealPlan1_id),
('Vitamin B2', 1.28, 'mg', 75.17, @dailyMealPlan1_id),
('Vitamin B3', 15.1, 'mg', 75.48, @dailyMealPlan1_id),
('Vitamin B5', 2.74, 'mg', 27.45, @dailyMealPlan1_id),
('Vitamin B6', 1.65, 'mg', 82.31, @dailyMealPlan1_id),
('Vitamin C', 11.16, 'mg', 13.53, @dailyMealPlan1_id),
('Vitamin D', 3.1, 'µg', 20.64, @dailyMealPlan1_id),
('Vitamin E', 3.86, 'mg', 25.77, @dailyMealPlan1_id),
('Vitamin K', 26.58, 'µg', 25.31, @dailyMealPlan1_id),
('Zinc', 13.37, 'mg', 89.15, @dailyMealPlan1_id);

-- Nutrients for Daily Meal Plan 2
INSERT INTO nutrients (nutrition_id, name, amount, unit, percent_of_daily_needs)
VALUES
(@dailyMealPlan2_id, 'Alcohol', 0.2, 'g', 1.08),
(@dailyMealPlan2_id, 'Caffeine', 0, 'mg', 0),
(@dailyMealPlan2_id, 'Calcium', 434.27, 'mg', 43.43),
(@dailyMealPlan2_id, 'Calories', 1899.71, 'kcal', 94.98),
(@dailyMealPlan2_id, 'Carbohydrates', 154.64, 'g', 51.55),
(@dailyMealPlan2_id, 'Cholesterol', 306.24, 'mg', 102.08),
(@dailyMealPlan2_id, 'Choline', 5.1, 'mg', 0),
(@dailyMealPlan2_id, 'Copper', 0.53, 'mg', 26.19),
(@dailyMealPlan2_id, 'Fat', 102.54, 'g', 157.77),
(@dailyMealPlan2_id, 'Fiber', 8.48, 'g', 33.95),
(@dailyMealPlan2_id, 'Fluoride', 4.95, 'mg', 0),
(@dailyMealPlan2_id, 'Folate', 82.81, 'µg', 20.7),
(@dailyMealPlan2_id, 'Folic Acid', 0, 'µg', 0),
(@dailyMealPlan2_id, 'Iron', 9.71, 'mg', 53.94),
(@dailyMealPlan2_id, 'Lycopene', 0, 'µg', 0),
(@dailyMealPlan2_id, 'Magnesium', 143.44, 'mg', 35.87),
(@dailyMealPlan2_id, 'Manganese', 0.85, 'mg', 42.54),
(@dailyMealPlan2_id, 'Mono Unsaturated Fat', 0.01, 'g', 0),
(@dailyMealPlan2_id, 'Net Carbohydrates', 146.15, 'g', 53.14),
(@dailyMealPlan2_id, 'Phosphorus', 1015.55, 'mg', 101.56),
(@dailyMealPlan2_id, 'Poly Unsaturated Fat', 0.08, 'g', 0),
(@dailyMealPlan2_id, 'Potassium', 1828.11, 'mg', 52.23),
(@dailyMealPlan2_id, 'Protein', 89.80, 'g', 179.61),
(@dailyMealPlan2_id, 'Saturated Fat', 43.52, 'g', 272.05),
(@dailyMealPlan2_id, 'Selenium', 80.06, 'µg', 114.36),
(@dailyMealPlan2_id, 'Sodium', 912.25, 'mg', 39.67),
(@dailyMealPlan2_id, 'Sugar', 110.27, 'g', 122.51),
(@dailyMealPlan2_id, 'Trans Fat', 0, 'g', 0),
(@dailyMealPlan2_id, 'Vitamin A', 769.99, 'IU', 15.4),
(@dailyMealPlan2_id, 'Vitamin B1', 0.89, 'mg', 59.03),
(@dailyMealPlan2_id, 'Vitamin B12', 11.06, 'µg', 184.38),
(@dailyMealPlan2_id, 'Vitamin B2', 1.28, 'mg', 75.17),
(@dailyMealPlan2_id, 'Vitamin B3', 15.1, 'mg', 75.48),
(@dailyMealPlan2_id, 'Vitamin B5', 2.74, 'mg', 27.45),
(@dailyMealPlan2_id, 'Vitamin B6', 1.65, 'mg', 82.31),
(@dailyMealPlan2_id, 'Vitamin C', 11.16, 'mg', 13.53),
(@dailyMealPlan2_id, 'Vitamin D', 3.1, 'µg', 20.64),
(@dailyMealPlan2_id, 'Vitamin E', 3.86, 'mg', 25.77),
(@dailyMealPlan2_id, 'Vitamin K', 26.58, 'µg', 25.31),
(@dailyMealPlan2_id, 'Zinc', 13.37, 'mg', 89.15);

-- Nutrients for Daily Meal Plan 3
INSERT INTO nutrients (nutrition_id, name, amount, unit, percent_of_daily_needs)
VALUES
(@dailyMealPlan3_id, 'Alcohol', 0.2, 'g', 1.08),
(@dailyMealPlan3_id, 'Caffeine', 0, 'mg', 0),
(@dailyMealPlan3_id, 'Calcium', 434.27, 'mg', 43.43),
(@dailyMealPlan3_id, 'Calories', 1899.71, 'kcal', 94.98),
(@dailyMealPlan3_id, 'Carbohydrates', 154.64, 'g', 51.55),
(@dailyMealPlan3_id, 'Cholesterol', 306.24, 'mg', 102.08),
(@dailyMealPlan3_id, 'Choline', 5.1, 'mg', 0),
(@dailyMealPlan3_id, 'Copper', 0.53, 'mg', 26.19),
(@dailyMealPlan3_id, 'Fat', 102.54, 'g', 157.77),
(@dailyMealPlan3_id, 'Fiber', 8.48, 'g', 33.95),
(@dailyMealPlan3_id, 'Fluoride', 4.95, 'mg', 0),
(@dailyMealPlan3_id, 'Folate', 82.81, 'µg', 20.7),
(@dailyMealPlan3_id, 'Folic Acid', 0, 'µg', 0),
(@dailyMealPlan3_id, 'Iron', 9.71, 'mg', 53.94),
(@dailyMealPlan3_id, 'Lycopene', 0, 'µg', 0),
(@dailyMealPlan3_id, 'Magnesium', 143.44, 'mg', 35.87),
(@dailyMealPlan3_id, 'Manganese', 0.85, 'mg', 42.54),
(@dailyMealPlan3_id, 'Mono Unsaturated Fat', 0.01, 'g', 0),
(@dailyMealPlan3_id, 'Net Carbohydrates', 146.15, 'g', 53.14),
(@dailyMealPlan3_id, 'Phosphorus', 1015.55, 'mg', 101.56),
(@dailyMealPlan3_id, 'Poly Unsaturated Fat', 0.08, 'g', 0),
(@dailyMealPlan3_id, 'Potassium', 1828.11, 'mg', 52.23),
(@dailyMealPlan3_id, 'Protein', 89.80, 'g', 179.61),
(@dailyMealPlan3_id, 'Saturated Fat', 43.52, 'g', 272.05),
(@dailyMealPlan3_id, 'Selenium', 80.06, 'µg', 114.36),
(@dailyMealPlan3_id, 'Sodium', 912.25, 'mg', 39.67),
(@dailyMealPlan3_id, 'Sugar', 110.27, 'g', 122.51),
(@dailyMealPlan3_id, 'Trans Fat', 0, 'g', 0),
(@dailyMealPlan3_id, 'Vitamin A', 769.99, 'IU', 15.4),
(@dailyMealPlan3_id, 'Vitamin B1', 0.89, 'mg', 59.03),
(@dailyMealPlan3_id, 'Vitamin B12', 11.06, 'µg', 184.38),
(@dailyMealPlan3_id, 'Vitamin B2', 1.28, 'mg', 75.17),
(@dailyMealPlan3_id, 'Vitamin B3', 15.1, 'mg', 75.48),
(@dailyMealPlan3_id, 'Vitamin B5', 2.74, 'mg', 27.45),
(@dailyMealPlan3_id, 'Vitamin B6', 1.65, 'mg', 82.31),
(@dailyMealPlan3_id, 'Vitamin C', 11.16, 'mg', 13.53),
(@dailyMealPlan3_id, 'Vitamin D', 3.1, 'µg', 20.64),
(@dailyMealPlan3_id, 'Vitamin E', 3.86, 'mg', 25.77),
(@dailyMealPlan3_id, 'Vitamin K', 26.58, 'µg', 25.31),
(@dailyMealPlan3_id, 'Zinc', 13.37, 'mg', 89.15);

-- Nutrients for Daily Meal Plan 4
INSERT INTO nutrients (nutrition_id, name, amount, unit, percent_of_daily_needs)
VALUES
(@dailyMealPlan4_id, 'Alcohol', 0.3, 'g', 1.5),
(@dailyMealPlan4_id, 'Caffeine', 5, 'mg', 0.5),
(@dailyMealPlan4_id, 'Calcium', 500, 'mg', 50),
(@dailyMealPlan4_id, 'Calories', 2000, 'kcal', 100),
(@dailyMealPlan4_id, 'Carbohydrates', 200, 'g', 66.67),
(@dailyMealPlan4_id, 'Cholesterol', 150, 'mg', 50),
(@dailyMealPlan4_id, 'Choline', 400, 'mg', 72.73),
(@dailyMealPlan4_id, 'Copper', 0.5, 'mg', 25),
(@dailyMealPlan4_id, 'Fat', 70, 'g', 107.69),
(@dailyMealPlan4_id, 'Fiber', 30, 'g', 120),
(@dailyMealPlan4_id, 'Fluoride', 3, 'mg', 75),
(@dailyMealPlan4_id, 'Folate', 300, 'µg', 75),
(@dailyMealPlan4_id, 'Folic Acid', 200, 'µg', 50),
(@dailyMealPlan4_id, 'Iron', 18, 'mg', 100),
(@dailyMealPlan4_id, 'Lycopene', 500, 'µg', 0),
(@dailyMealPlan4_id, 'Magnesium', 400, 'mg', 100),
(@dailyMealPlan4_id, 'Manganese', 2.3, 'mg', 115),
(@dailyMealPlan4_id, 'Mono Unsaturated Fat', 20, 'g', 0),
(@dailyMealPlan4_id, 'Net Carbohydrates', 180, 'g', 60),
(@dailyMealPlan4_id, 'Phosphorus', 700, 'mg', 70),
(@dailyMealPlan4_id, 'Poly Unsaturated Fat', 10, 'g', 0),
(@dailyMealPlan4_id, 'Potassium', 3500, 'mg', 100),
(@dailyMealPlan4_id, 'Protein', 50, 'g', 100),
(@dailyMealPlan4_id, 'Saturated Fat', 20, 'g', 100),
(@dailyMealPlan4_id, 'Selenium', 55, 'µg', 100),
(@dailyMealPlan4_id, 'Sodium', 2300, 'mg', 100),
(@dailyMealPlan4_id, 'Sugar', 100, 'g', 110),
(@dailyMealPlan4_id, 'Trans Fat', 0, 'g', 0),
(@dailyMealPlan4_id, 'Vitamin A', 900, 'µg', 100),
(@dailyMealPlan4_id, 'Vitamin B1', 1.2, 'mg', 80),
(@dailyMealPlan4_id, 'Vitamin B12', 2.4, 'µg', 40),
(@dailyMealPlan4_id, 'Vitamin B2', 1.3, 'mg', 76.47),
(@dailyMealPlan4_id, 'Vitamin B3', 16, 'mg', 80),
(@dailyMealPlan4_id, 'Vitamin B5', 5, 'mg', 50),
(@dailyMealPlan4_id, 'Vitamin B6', 1.7, 'mg', 85),
(@dailyMealPlan4_id, 'Vitamin C', 90, 'mg', 100),
(@dailyMealPlan4_id, 'Vitamin D', 20, 'µg', 133.33),
(@dailyMealPlan4_id, 'Vitamin E', 15, 'mg', 100),
(@dailyMealPlan4_id, 'Vitamin K', 120, 'µg', 100),
(@dailyMealPlan4_id, 'Zinc', 11, 'mg', 73.33);

-- Nutrients for Daily Meal Plan 5
INSERT INTO nutrients (nutrition_id, name, amount, unit, percent_of_daily_needs)
VALUES
(@dailyMealPlan5_id, 'Alcohol', 0.3, 'g', 1.5),
(@dailyMealPlan5_id, 'Caffeine', 5, 'mg', 0.5),
(@dailyMealPlan5_id, 'Calcium', 500, 'mg', 50),
(@dailyMealPlan5_id, 'Calories', 2000, 'kcal', 100),
(@dailyMealPlan5_id, 'Carbohydrates', 200, 'g', 66.67),
(@dailyMealPlan5_id, 'Cholesterol', 150, 'mg', 50),
(@dailyMealPlan5_id, 'Choline', 400, 'mg', 72.73),
(@dailyMealPlan5_id, 'Copper', 0.5, 'mg', 25),
(@dailyMealPlan5_id, 'Fat', 70, 'g', 107.69),
(@dailyMealPlan5_id, 'Fiber', 30, 'g', 120),
(@dailyMealPlan5_id, 'Fluoride', 3, 'mg', 75),
(@dailyMealPlan5_id, 'Folate', 300, 'µg', 75),
(@dailyMealPlan5_id, 'Folic Acid', 200, 'µg', 50),
(@dailyMealPlan5_id, 'Iron', 18, 'mg', 100),
(@dailyMealPlan5_id, 'Lycopene', 500, 'µg', 0),
(@dailyMealPlan5_id, 'Magnesium', 400, 'mg', 100),
(@dailyMealPlan5_id, 'Manganese', 2.3, 'mg', 115),
(@dailyMealPlan5_id, 'Mono Unsaturated Fat', 20, 'g', 0),
(@dailyMealPlan5_id, 'Net Carbohydrates', 180, 'g', 60),
(@dailyMealPlan5_id, 'Phosphorus', 700, 'mg', 70),
(@dailyMealPlan5_id, 'Poly Unsaturated Fat', 10, 'g', 0),
(@dailyMealPlan5_id, 'Potassium', 3500, 'mg', 100),
(@dailyMealPlan5_id, 'Protein', 50, 'g', 100),
(@dailyMealPlan5_id, 'Saturated Fat', 20, 'g', 100),
(@dailyMealPlan5_id, 'Selenium', 55, 'µg', 100),
(@dailyMealPlan5_id, 'Sodium', 2300, 'mg', 100),
(@dailyMealPlan5_id, 'Sugar', 100, 'g', 110),
(@dailyMealPlan5_id, 'Trans Fat', 0, 'g', 0),
(@dailyMealPlan5_id, 'Vitamin A', 900, 'µg', 100),
(@dailyMealPlan5_id, 'Vitamin B1', 1.2, 'mg', 80),
(@dailyMealPlan5_id, 'Vitamin B12', 2.4, 'µg', 40),
(@dailyMealPlan5_id, 'Vitamin B2', 1.3, 'mg', 76.47),
(@dailyMealPlan5_id, 'Vitamin B3', 16, 'mg', 80),
(@dailyMealPlan5_id, 'Vitamin B5', 5, 'mg', 50),
(@dailyMealPlan5_id, 'Vitamin B6', 1.7, 'mg', 85),
(@dailyMealPlan5_id, 'Vitamin C', 90, 'mg', 100),
(@dailyMealPlan5_id, 'Vitamin D', 20, 'µg', 133.33),
(@dailyMealPlan5_id, 'Vitamin E', 15, 'mg', 100),
(@dailyMealPlan5_id, 'Vitamin K', 120, 'µg', 100),
(@dailyMealPlan5_id, 'Zinc', 11, 'mg', 73.33);

-- Nutrients for Daily Meal Plan 6
INSERT INTO nutrients (nutrition_id, name, amount, unit, percent_of_daily_needs)
VALUES
(@dailyMealPlan6_id, 'Alcohol',0.3, 'g', 1.5),
(@dailyMealPlan6_id, 'Caffeine', 5, 'mg', 0.5),
(@dailyMealPlan6_id, 'Calcium', 500, 'mg', 50),
(@dailyMealPlan6_id, 'Calories', 2000, 'kcal', 100),
(@dailyMealPlan6_id, 'Carbohydrates', 200, 'g', 66.67),
(@dailyMealPlan6_id, 'Cholesterol', 150, 'mg', 50),
(@dailyMealPlan6_id, 'Choline', 400, 'mg', 72.73),
(@dailyMealPlan6_id, 'Copper', 0.5, 'mg', 25),
(@dailyMealPlan6_id, 'Fat', 70, 'g', 107.69),
(@dailyMealPlan6_id, 'Fiber', 30, 'g', 120),
(@dailyMealPlan6_id, 'Fluoride', 3, 'mg', 75),
(@dailyMealPlan6_id, 'Folate', 300, 'µg', 75),
(@dailyMealPlan6_id, 'Folic Acid', 200, 'µg', 50),
(@dailyMealPlan6_id, 'Iron', 18, 'mg', 100),
(@dailyMealPlan6_id, 'Lycopene', 500, 'µg', 0),
(@dailyMealPlan6_id, 'Magnesium', 400, 'mg', 100),
(@dailyMealPlan6_id, 'Manganese', 2.3, 'mg', 115),
(@dailyMealPlan6_id, 'Mono Unsaturated Fat', 20, 'g', 0),
(@dailyMealPlan6_id, 'Net Carbohydrates', 180, 'g', 60),
(@dailyMealPlan6_id, 'Phosphorus', 700, 'mg', 70),
(@dailyMealPlan6_id, 'Poly Unsaturated Fat', 10, 'g', 0),
(@dailyMealPlan6_id, 'Potassium', 3500, 'mg', 100),
(@dailyMealPlan6_id, 'Protein', 50, 'g', 100),
(@dailyMealPlan6_id, 'Saturated Fat', 20, 'g', 100),
(@dailyMealPlan6_id, 'Selenium', 55, 'µg', 100),
(@dailyMealPlan6_id, 'Sodium', 2300, 'mg', 100),
(@dailyMealPlan6_id, 'Sugar', 100, 'g', 110),
(@dailyMealPlan6_id, 'Trans Fat', 0, 'g', 0),
(@dailyMealPlan6_id, 'Vitamin A', 900, 'µg', 100),
(@dailyMealPlan6_id, 'Vitamin B1', 1.2, 'mg', 80),
(@dailyMealPlan6_id, 'Vitamin B12', 2.4, 'µg', 40),
(@dailyMealPlan6_id, 'Vitamin B2', 1.3, 'mg', 76.47),
(@dailyMealPlan6_id, 'Vitamin B3', 16, 'mg', 80),
(@dailyMealPlan6_id, 'Vitamin B5', 5, 'mg', 50),
(@dailyMealPlan6_id, 'Vitamin B6', 1.7, 'mg', 85),
(@dailyMealPlan6_id, 'Vitamin C', 90, 'mg', 100),
(@dailyMealPlan6_id, 'Vitamin D', 20, 'µg', 133.33),
(@dailyMealPlan6_id, 'Vitamin E', 15, 'mg', 100),
(@dailyMealPlan6_id, 'Vitamin K', 120, 'µg', 100),
(@dailyMealPlan6_id, 'Zinc', 11, 'mg', 73.33);