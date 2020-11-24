SELECT c.comment_id, c.body, c.post_id, c.user_id, p.post_id, u.user_id
FROM dragon_comments c
JOIN dungeon_user u AND dragon_posts p
ON c.user_id = u.user_id AND c.post_id = p.post_id
WHERE c.comment_id = $1