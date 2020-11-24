UPDATE dungeon_user
SET dm = $2, online = $3
WHERE user_id = $1