UPDATE users
SET dm = $2, online = $3 
WHERE user_id = $1;

--update a specific user