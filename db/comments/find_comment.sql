SELECT u.username, u.user_id, p.*, c.* FROM comments c
JOIN posts p ON p.post_id = c.post_id
JOIN users u ON u.user_id = c.user_id
WHERE c.comment_id = $1

--finding a specific comment