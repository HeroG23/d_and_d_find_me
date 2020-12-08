UPDATE users
SET phone_number = $2, dm = $3
WHERE user_id = $1;

--update a specific user