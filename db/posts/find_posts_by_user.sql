SELECT u.username, u.user_id, p.* FROM posts p
JOIN users u ON u.user_id = p.user_id
WHERE p.user_id = $1

--finding a specific post made by a user