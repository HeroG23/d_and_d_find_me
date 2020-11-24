UPDATE dragon_comments
SET body = $2
WHERE comment_id = $1
SELECT * FROM dragon_comments ORDER BY comment_id