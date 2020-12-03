SELECT p*, u.username
FROM posts p
JOIN users u ON u.user_id = p.user_id
WHERE post_id = $1

--finding a specific post