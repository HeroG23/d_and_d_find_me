UPDATE posts
SET  post_address = $3
WHERE post_id = $1;
SELECT * FROM posts ORDER BY post_id