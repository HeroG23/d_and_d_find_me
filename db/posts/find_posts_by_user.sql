SELECT p.*, u.*
FROM posts p
JOIN users u ON u.user_id = p.user_id
WHERE u.user_id = $1

--finding a specific post made by a user