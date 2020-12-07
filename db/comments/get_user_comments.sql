--get ALL comments
SELECT p.*, u.*, c.* FROM comments c
JOIN posts p ON p.post_id = c.post_id
JOIN users u ON u.user_id = c.user_id
WHERE u.user_id= $1;