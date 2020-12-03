 -- seeing all the comments
SELECT p.post_id, u.username, c.* 
FROM posts p
JOIN comments c ON p.post_id = c.post_id
JOIN users u ON u.user_id = c.user_id;
WHERE p.post_id = $1
ORDER BY c.comment_id