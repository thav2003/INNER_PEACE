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
-- User 6: Professional user with DATABASE login
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Professional User', '888888888', 'professional@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'PROFESSIONAL', true, 'DATABASE', null, NOW());
SET @user_professional_id = LAST_INSERT_ID();

INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 1', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 2', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 3', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 4', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 5', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 6', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());
INSERT INTO users (full_name, phone_number, email, password, image_url, role, is_active, social_provider, provider_id, created_at)
VALUES ('Database Customer 7', '999999999', 'database@example.com', '$2a$10$ZK3B2r3TvLenI0qLLoGnJeCwsXkC.OwTEcehgd3DytRgBB526c1xq', 'default.jpg', 'CUSTOMER', true, 'DATABASE', null, NOW());


-- Insert a new room for the conversation
INSERT INTO rooms (created_at, updated_at) VALUES (NOW(), NOW());
SET @room1_id = LAST_INSERT_ID();
-- Associate the Professional user with the room
INSERT INTO room_users (room_id, user_id) VALUES (@room1_id, @user_professional_id);
-- Associate the Customer user with the room
INSERT INTO room_users (room_id, user_id) VALUES (@room1_id, @user5_id);
-- Insert a message from the Professional user to the Customer user
INSERT INTO messages (sender_id, receiver_id, room_id, content, created_at, updated_at)
VALUES (@user_professional_id, @user5_id, @room1_id, 'Hello Customer 5, how can I assist you today?', NOW(), NOW());
-- Insert a response from the Customer user to the Professional user
INSERT INTO messages (sender_id, receiver_id, room_id, content, created_at, updated_at)
VALUES (@user5_id, @user_professional_id, @room1_id, 'Hi Professional, I need help with my diet plan.', NOW(), NOW());

-- Insert a new room for the conversation
INSERT INTO rooms (created_at, updated_at) VALUES (NOW(),NOW());
SET @room2_id = LAST_INSERT_ID();
-- Associate the Professional user with the room
INSERT INTO room_users (room_id, user_id) VALUES (@room2_id, @user_professional_id);
-- Associate the Customer user with the room
INSERT INTO room_users (room_id, user_id) VALUES (@room2_id, @user4_id);
-- Insert a message from the Professional user to the Customer user
INSERT INTO messages (sender_id, receiver_id, room_id, content, created_at, updated_at)
VALUES (@user_professional_id, @user4_id, @room2_id, 'Hello Customer 4, how can I assist you today?', NOW(), NOW());
-- Insert a response from the Customer user to the Professional user
INSERT INTO messages (sender_id, receiver_id, room_id, content, created_at, updated_at)
VALUES (@user4_id, @user_professional_id, @room2_id, 'Hi Professional, I need help with my diet plan.', NOW(), NOW());

INSERT INTO user_packages(user_id, package_name)
VALUES
(1,"Basic"),
(2,"Basic"),
(3,"Basic"),
(4,"Basic"),
(5,"Basic");



-- Lesson 1
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Hướng dẫn thiền cân bằng tâm trí ', 14, 'Nhìn nhận lại cuộc sống, bỏ đi những gì không phục vụ cho hạnh phúc của mình nữa, đón nhận những điều mới để tâm trí bình an hơn. 😊', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l1.png', NOW(), NOW());

-- Lesson 2
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Hướng dẫn ngồi thiền đơn giản, khoa học & hiệu quả', 40, 'Một người thầy vĩ đại đã nói ngồi thiền tầm 40 phút sẽ đem lại vô vàn lợi lạc cho cuộc sống của bạn. Vì chúng ta làm mọi thứ với tâm trí này - học tập, làm việc, cư xử trong các mối quan hệ…. Nếu tâm trí nhẹ nhàng, bình an, suy nghĩ sáng suốt, rõ rang; thì nhờ đó cũng làm cho cuộc sống xung quanh mình tươi sáng & tích cực hơn.   Thiền là ở ngay trong hiện tại, rõ ràng, tỉnh thức. Không chạy theo hình ảnh hay âm thanh nào; không phải đi đến cảnh giới nào cả. Quan sát sự vật như nó là, không thêm không bớt, với phương pháp thiền cực kỳ đơn giản mà ai cũng làm được. Tập luyện từ từ bạn sẽ thấy tâm trí mình sáng suốt, tập trung tốt hơn và bình an hơn dù có chuyện gì xảy ra trong cuộc sống.  Bài thiền này đúc kết từ trải nghiệm của mình sau nhiều khóa thiền theo lời dạy của Đức Phật. Dành cho mọi người, mọi tôn giáo, phi tôn giáo.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l2.png', NOW(), NOW());

-- Lesson 3
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Thiền thư giãn cuối ngày yên lành', 14, 'Cùng ngồi thiền một vài phút cuối ngày để tâm trí thư giãn, ngủ ngon và sâu các bạn nhé.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l3.png', NOW(), NOW());

-- Lesson 4
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Thiền bắt đầu ngày mới an lành', 12, 'Chào ngày mới an lành!\n\nChúng ta làm tất cả mọi thứ từ tâm trí này, nếu tâm trí bình tĩnh, sáng suốt thì mình cũng nhìn mọi việc rõ ràng hơn, làm việc hiệu quả hơn, không tốn nhiều năng lượng cho việc không cần thiết.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l4.png', NOW(), NOW());

-- Lesson 5
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Phần 1 - Phương pháp ngồi thiền và thiền đếm hơi thở', 16, 'Thiền thở là bài tập cơ bản dành cho người mới bắt đầu, thường đi kèm với các bài tập thiền khác. Khi tập, bạn không nghĩ ngợi gì mà chỉ tập trung quan sát hơi thở. Bạn chú tâm cho việc hít vào và thở ra, chú tâm dõi theo từng luồng thở và biết được nơi nó đang đến.\n\nLợi ích: Giúp bạn tập trung tư tưởng mọi nơi, mọi lúc. Hãy tập trung vào hơi thở bất cứ lúc nào bạn cảm thấy đờ đẫn, mệt mỏi và căng thẳng để lấy lại tinh thần.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l5.png', NOW(), NOW());

-- Lesson 6
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Phần 2 - Hướng dẫn thiền theo dõi hơi thở', 17, 'Thiền thở là bài tập cơ bản dành cho người mới bắt đầu, thường đi kèm với các bài tập thiền khác. Khi tập, bạn không nghĩ ngợi gì mà chỉ tập trung quan sát hơi thở. Bạn chú tâm cho việc hít vào và thở ra, chú tâm dõi theo từng luồng thở và biết được nơi nó đang đến.\n\nLợi ích: Giúp bạn tập trung tư tưởng mọi nơi, mọi lúc. Hãy tập trung vào hơi thở bất cứ lúc nào bạn cảm thấy đờ đẫn, mệt mỏi và căng thẳng để lấy lại tinh thần.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l6.png', NOW(), NOW());

-- Lesson 7
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('CÁC BÀI TẬP GIÃN CƠ BUỔI SÁNG GIÚP GIẢM STRESS', 10, 'Ngoài việc tập luyện và ăn kiêng thì chúng ta nên kết hợp thêm stretching để đạt được một sức khoẻ tốt và tăng độ dẻo dai linh hoạt cho cơ bắp, hôm nay Sky sẽ cùng hướng dẫn các bạn 10 phút MORNING STRETCH giúp chúng ta giãn cơ và giảm stress nữa nha. Những bài stretch này hoàn toàn rất đơn giản, bạn có thể làm vào buổi sáng hoặc sau khi tập xong đều được.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l7.png', NOW(), NOW());

-- Lesson 8
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Yoga Giảm Stress và Căng Thẳng cho Người Mới', 25, 'Trong video này, Nguyên sẽ hướng dẫn chuỗi tư thế Yoga giúp giảm stress và căng thẳng. Bạn có thể xem video này bất kể khi nào bạn cảm thấy cuộc sống có quá nhiều thứ đang xảy ra, cảm xúc lẫn lộn, hay cảm thấy cần một chút thời gian cho bản thân, thư giãn cơ thể và tâm trí. Nó cũng sẽ giúp giảm các cơn đau lưng, đau cổ vai gáy, giúp bạn ngủ ngon hơn và bình an hơn.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l8.png', NOW(), NOW());

-- Lesson 9
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('5 Bài tập yoga giúp giảm căng thẳng, cải thiện tâm trạng', 6, 'Nếu bạn đang căng thẳng hoặc lo lắng có thể tìm đến với yoga. Hãy thử 5 bài tập yoga dưới đây có thể giảm căng thẳng và cải thiện tâm trạng của bạn', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l9.png', NOW(), NOW());

-- Lesson 10
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Thiền và thư giãn cổ vai gáy giảm stress', 17, 'Đây là video hướng dẫn ngồi Thiền và thư giãn Cổ vai gáy cùng HLV Yoga By Sophie.\nPhù hợp tập vào bất kỳ khi nào hoặc buổi tối trước khi đi ngủ cho giấc ngủ ngon, dễ chịu cùng nhạc nền thư giãn giúp bạn giảm căng thẳng.\n\nHãy tập thường xuyên để có kết quả tốt!', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l10.png', NOW(), NOW());

-- Lesson 11
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Bài tập thở: Tập mỗi ngày khỏe một đời - giảm cân, khoẻ phổi, thải độc, giải toả căng thẳng ✨', 10, 'Tập thở thường không được coi trọng vì đây được coi là hoạt động nhẹ nhàng và nhàm chán. Nhưng hít thở đúng cách bổ trợ rất tốt cho việc tập luyện và đạt kết quả tốt về hình thể. Hơn thế nữa, tập hít thở sâu có rất nhiều lợi ích như giải toả căng thẳng, gia tăng sức khoẻ của phổi, rèn luyện sự tập trung, đào thải độc tố.\nCùng rủ người thân và bạn bè tập hít thở để gia tăng sự gắn kết vì bài này rất dễ thực hiện ♥️', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l11.png', NOW(), NOW());

-- Lesson 12
INSERT INTO lessons (name, duration, description, video_url, img_url, created_at, updated_at)
VALUES ('Yoga giảm căng thẳng, stress giúp thư giãn ngủ ngon', 22, 'Hãy để tâm trí của bạn được thư giãn và tĩnh lặng hòa cùng dòng chảy của hơi thở, bạn sẽ cảm nhận được sự bình an và niềm hạnh phúc trào dâng trong cơ thể. Dành cho mình những phút giây thả lỏng và nghỉ ngơi thật sự sau ngày dài mệt mỏi, để quân bình lại năng lượng và phát triển tình yêu thương.', '1717857459038_AIO - TnP - Google Chrome 2024-04-13 07-39-22.mp4', 'l12.png', NOW(), NOW());

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
(12, 4);

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


INSERT INTO payments
(`amount`, `order_code`, `created_at`, `transaction_date`, `updated_at`, `user_id`, `account_name`, `account_number`,
`bin`, `checkout_url`, `currency`, `description`, `packages`, `payment_link_id`,
`qr_code`, `reference`, `status`)
VALUES
('79000', '413395', '2024-07-12 07:13:33.862302', '2024-07-15 07:14:00.000000', '2024-07-08 07:14:01.259566', '7', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'PAID'),
('79000', '350228', '2024-07-12 07:13:33.862302', '2024-07-15 07:14:00.000000', '2024-07-08 07:14:01.259566', '8', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'PAID'),
('79000', '925453', '2024-07-12 07:13:33.862302', '2024-07-16 07:14:00.000000', '2024-07-09 07:14:01.259566', '9', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'PAID'),
('79000', '384939', '2024-07-12 07:13:33.862302', '2024-07-16 07:14:00.000000', '2024-07-09 07:14:01.259566', '10', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'CANCELLED'),
('79000', '379427', '2024-07-12 07:13:33.862302', '2024-07-16 07:14:00.000000', '2024-07-10 07:14:01.259566', '11', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'PAID'),
('79000', '804617', '2024-07-12 07:13:33.862302', '2024-07-17 07:14:00.000000', '2024-07-10 07:14:01.259566', '12', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'PAID'),
('79000', '937361', '2024-07-12 07:13:33.862302', '2024-07-18 07:14:00.000000', '2024-07-08 07:14:01.259566', '13', 'TRUONG HOANG ANH VU', 'VQRQ0002apqjo',
'970422', 'https://pay.payos.vn/web/3f9c7dbd656d44bfad29c83867b34cd9', 'VND', 'Mua goi Essential', 'Essential', '3f9c7dbd656d44bfad29c83867b34cd9',
'00020101021238570010A000000727012700069704220113VQRQ0002apqjo0208QRIBFTTA5303704540420005802VN62180814Mua goi Essential63044A61', 'FT24194371469923', 'CANCELLED');
