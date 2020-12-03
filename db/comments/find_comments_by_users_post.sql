SELECT c.*, p.post_id, u.user_id
FROM comments c
JOIN users u AND posts p
ON c.user_id = u.user_id AND c.post_id = p.post_id
WHERE c.comment_id = $1

--finding a comment on a post by a specific user