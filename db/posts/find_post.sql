SELECT u.username, u.user_id, p.* FROM posts p
JOIN users u ON u.user_id = p.user_id
WHERE p.post_id = $1

--finding a specific post