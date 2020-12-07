SELECT u.username, u.user_id, p.* FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE post_id = $1

--finding a specific post