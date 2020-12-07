--get ALL comments
SELECT u.username, u.user_id, p.*, c.* FROM comments c
JOIN posts p ON c.post_id = p.post_id
JOIN users u ON c.user_id = u.user_id
WHERE u.user_id= $1;