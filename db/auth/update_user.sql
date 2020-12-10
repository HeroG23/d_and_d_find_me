UPDATE users
SET dm = $3online = $2, 
WHERE user_id = $1;

--update a specific user