 -- seeing all the comments
SELECT u.username, u.user_id, p.*, c.* FROM comments c
JOIN posts p ON c.post_id = p.post_id
JOIN users u ON c.post_id = u.user_id
WHERE p.post_id = $1
ORDER BY c.comment_id;