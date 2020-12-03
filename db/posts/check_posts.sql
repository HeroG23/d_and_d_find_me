-- --finding all posts
SELECT p.*, u.username FROM posts p
JOIN users u ON u.user_id = p.user_id
ORDER BY p.post_id