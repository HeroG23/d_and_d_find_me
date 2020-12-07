-- --finding all posts
SELECT u.username, u.user_id, p.* FROM posts p
JOIN users u ON p.user_id = u.user_id
ORDER BY p.post_id