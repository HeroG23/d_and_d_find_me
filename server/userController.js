const bcrypt = require('bcrypt');

module.exports = {
    getUser: (req, res) => {
        res.status(200).send(req.session.user);
    },
    editUser: async (req, res) => {
        const db = req.app.get('db');
        const {dm} = req.body;
        const {user_id} = req.session.user;
        const [updatedUser] = await db.auth.edit_user([user_id, dm]);

        req.session.user = updatedUser;
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        //# checks if user exits
        //# checks password
        //# logs user in and sends to front end
        const db = req.app.get('db');
        const {username, password} = req.body;
        try{
            const [foundUser] = await db.auth.check_user(username);
            if(foundUser) {
                const comparePassword = foundUser.password;
                const authenticate = bcrypt.compareSync(password, comparePassword);
                if(authenticate) {
                    delete foundUser.password;
                    req.session.user = {
                        userId: foundUser.user_id,
                        username: foundUser.username,
                        dm: foundUser.dm
                    };
                    res.status(200).send(req.session.user);
                }else {
                    res.status(409).send('Username or password incorrect');
                }
            }else {
                res.status(409).send('Username or password incorrect');
            }
        }catch(err){
            console.log('Database error on login function', err)
        }
    },
    register: async (req, res) => {
        //# Seeing if user is already made(obviously don't want it to)
        //# Stores new user to database with hash password
        //# log user in once profile is made and sends it to front end 
        const db = req.app.get('db');
        const {email, username, password, dm, online} = req.body;

        try {
            const [foundUser] = await db.auth.check_email(email)
            if(foundUser){
                res.status(409).send('User already exists');
            }else{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                let [newUser] = await db.auth.check_user(username)
                if(newUser){
                    res.status(409).send('username already used')
                } else {
                    newUser = await db.auth.create_user([email, username, hash, dm, online]);
                    req.session.user = newUser;
                    res.status(200).send(req.session.user);
                }
            }
        }catch (err){
            console.log('Database error with register function', err)
            res.sendStatus(500)
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}