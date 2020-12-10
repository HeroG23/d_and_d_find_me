require("dotenv").config({path: __dirname + '/../.env'});
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const path = require('path')

const userCtrl = require("./userController");
const postCtrl = require("./postController");
const commCtrl = require("./commentController");
const locCtrl = require("./locationController");
const textCtrl = require("./textController");
const emailCtrl = require("./emailController");
const graphCtrl = require('./graphController');

const { checkUser } = require("./middleware");

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
} = process.env;

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(express.static(__dirname + '/../build'))

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

//!ENDPOINTS
//# User Endpoints
app.get("/api/user", checkUser, userCtrl.getUser);
app.put("/auth/user", checkUser, userCtrl.editUser);
app.post("/auth/login", userCtrl.login);
app.post("/auth/register", userCtrl.register);
app.post("/auth/logout", userCtrl.logout);

//# Post Endpoints
app.get("/api/posts", postCtrl.checkPosts);
app.get("/api/posts/:id", postCtrl.findPost);
app.get("/api/user/posts/:userid", postCtrl.findPostsByUser);
app.post("/api/posts", checkUser, postCtrl.createPost);
app.put("/api/posts/:id", checkUser, postCtrl.updatePost);
app.delete("/api/posts/:id", checkUser, postCtrl.deletePost);

//#Comment Endpoints
app.get("/api/comments/:id", commCtrl.findComment);
app.get("/api/posts/comments/:post_id", commCtrl.getComments);
app.get("/api/user/comments/:userid", commCtrl.findCommentsByUsers);
app.post("/api/comments", checkUser, commCtrl.postComment);
app.put("/api/comments/:id", checkUser, commCtrl.updateComment);
app.delete("/api/comments/:id", checkUser, commCtrl.deleteComment);

//#Location Endpoint
app.post("api/locate", locCtrl.postAddress);

//#Text Endpoint
app.post("/api/sendSMS", textCtrl.sendSMS);

//#Email Endpoint
app.post("/api/email", emailCtrl.email)

//#Graph Endpoint
app.get('/api/graph', graphCtrl.getInfo);

//#Hosting Endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
const port = SERVER_PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
