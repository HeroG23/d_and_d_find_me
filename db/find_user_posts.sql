SELECT p.post_id, p.title, p.post_url, p.user_id, u.email, u.username, u.dm
FROM dragon_posts p
JOIN dungeon_user u ON u.user_id = p.user_id
WHERE p.post_id = $1