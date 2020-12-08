CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    phone_number VARCHAR(20),
    email VARCHAR(40),
    username VARCHAR(40),
    password VARCHAR(60),
    dm BOOLEAN,
    online BOOLEAN
);
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(40),
    post_address TEXT,
    content TEXT,
    user_id INT REFERENCES users(user_id)   
);
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE
);




INSERT INTO users(email, username, password, dm, online)
VALUES
('John', 'Wall', '8615550123', 'bdgm@yahoo.com', 'bigdragon25', hello, true, false),
('Missy', 'Elliot', '7889897877', 'antimatter@yahoo.com', 'giantslayer2414', welcome, false, true),
('William', 'Shakespeare', '115641616', 'necromancer@aol.com', 'darkusurper', goodbye, false, false);

INSERT INTO posts(title, post_address, content, user_id)
VALUES
('Dragon Slaying', '', 'Killing dragons is hard', 1),
('Killing giants is fun', '', 'Giants horde everything', 2),
('Raiding graveyards', '', 'I love the bodies of the dead, is that weird?', 3);

INSERT INTO comments(body, user_id, post_id)
VALUES
('Killing dragons is super easy NERDS, git good', 1, 1),
('Killing dragons is super easy NERDS, git good', 1, 2),
('my first comment :D',	1,	3),
('Hello', 1, 4),
('I am trying my best',	1,	5),
('I am trying my best',	1,	6),
('I am trying my best',	1,	7),
('I am trying my best',	1,	8),
('my first comment :D',	1,	9)