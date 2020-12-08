-- --finding all posts
SELECT u.username, u.user_id, p.* FROM posts p
JOIN users u ON u.user_id = p.user_id
ORDER BY p.post_id