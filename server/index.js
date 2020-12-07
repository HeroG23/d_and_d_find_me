require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const userCtrl = require('./userController');
const postCtrl = require('./postController');
const commCtrl = require('./commentController');
const locCtrl = require('./locationController');

const {checkUser} = require('./middleware');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, REACT_APP_API_KEY} = process.env;

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db =>{
    app.set('db', db);
    console.log('Database connected')
}).catch(err => console.log(err));

//!ENDPOINTS
//# User Endpoints
app.get('/api/user', checkUser, userCtrl.getUser);
app.put('/auth/user', checkUser, userCtrl.editUser);
app.post('/auth/login', userCtrl.login);
app.post('/auth/register', userCtrl.register);
app.post('/auth/logout', userCtrl.logout);

//# Post Endpoints
app.get('/api/posts', postCtrl.checkPosts);
app.get('/api/posts/:id', postCtrl.findPost);
app.get('/api/posts/:userid/:id', postCtrl.findPostsByUser);
app.post('/api/posts', checkUser, postCtrl.createPost);
app.put('/api/posts/:id', checkUser, postCtrl.updatePostContent);
app.put('/api/posts/:id', checkUser, postCtrl.updatePostAddress);
app.delete('/api/posts/:id', checkUser, postCtrl.deletePost);

//#Comment Endpoints
app.get('/api/comments/:id', commCtrl.findComment);
app.get('/api/posts/comments/:post_id', commCtrl.getComments);
app.get('/api/comments/:userid/:id', commCtrl.getCommentsByUsers);
app.post('/api/comments', checkUser, commCtrl.postComment);
app.put('/api/comments/:id', checkUser, commCtrl.updateComment);
app.delete('/api/comments/:id', checkUser, commCtrl.deleteComment);

//#Location Endpoint
app.post('api/locate', locCtrl.postAddress);

const port= SERVER_PORT;
app.listen(port, ()=>console.log(`Server listening on port ${port}`))