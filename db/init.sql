CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(40),
    username VARCHAR(40),
    password VARCHAR(60),
    dm BOOLEAN,
    online BOOLEAN
);
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(40),
    post_url TEXT,
    content TEXT,
    user_id INT REFERENCES user(user_id)   
);
CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    body TEXT,
    user_id INT FOREIGN KEY REFERENCES users(user_id),
    post_id INT FOREIGN KEY REFERENCES posts(post_id)
);

INSERT INTO users(email, username, password, dm, online)
VALUES
('bdgm@yahoo.com', 'bigdragon25', hello, true, false),
('antimatter@yahoo.com', 'giantslayer2414', welcome, false, true),
('necromancer@aol.com', 'darkusurper', goodbye, false, false);

INSERT INTO posts(title, post_url, content, user_id)
VALUES
('Dragon Slaying', '', 'Killing dragons is hard', 1),
('Killing giants is fun', '', 'Giants horde everything', 2),
('Raiding graveyards', '', 'I love the bodies of the dead, is that weird?', 3);

INSERT INTO comments(body, meet, user_id, post_id)
VALUES
('Killing dragons is super easy', 2, 1),
('If you use the undead it is easy', 2, 3),
('Giants just eat everything so there is nothing left', 1, 2),
('I hate giants they even eat my undead warriors', 3, 2),
('Could you stop bringing dragons back to life please?', 1, 3),
('Giants love to kill your undead soldiers', 2, 3)