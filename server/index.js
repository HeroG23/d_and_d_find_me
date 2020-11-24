require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const port= SERVER_PORT;
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

//# User Endpoints

//# Post Endpoints

//#Comment Endpoints


app.listen(port, ()=>console.log(`Server listening on port ${port}`))