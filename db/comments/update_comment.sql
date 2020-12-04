UPDATE comments
SET body = $2
WHERE comment_id = $1;
SELECT * FROM comments ORDER BY comment_id;

--updating what a comment says