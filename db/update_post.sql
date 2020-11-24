UPDATE dragon_posts
SET post_url = $2, content = $3
WHERE post_id = $1
SELECT * FROM dragon_posts ORDER BY post_id