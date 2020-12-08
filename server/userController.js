const bcrypt = require("bcrypt");

module.exports = {
  getUser: (req, res) => {
    res.status(200).send(req.session.user);
  },
  editUser: async (req, res) => {
    const db = req.app.get("db");
    const { phone_number, dm } = req.body;
    const { user_id } = req.session.user;
    const [updatedUser] = await db.auth.edit_user([user_id, phone_number, dm]);

    req.session.user = updatedUser;
    res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    //# checks if user exits
    //# checks password
    //# logs user in and sends to front end
    const db = req.app.get("db");
    const { username, password } = req.body;
    try {
      const [foundUser] = await db.auth.check_user(username);
      if (foundUser) {
        const comparePassword = foundUser.password;
        const authenticate = bcrypt.compareSync(password, comparePassword);
        if (authenticate) {
          delete foundUser.password;
          req.session.user = {
            user_id: foundUser.user_id,
            first_name: foundUser.first_name,
            last_name: foundUser.last_name,
            phone_number: foundUser.phone_number,
            username: foundUser.username,
            dm: foundUser.dm,
          };
          res.status(200).send(req.session.user);
        } else {
          res.status(503).send("Username or password incorrect");
        }
      } else {
        res.status(504).send("Username or password incorrect");
      }
    } catch (err) {
      console.log("Database error on login function", err);
    }
  },
  register: async (req, res) => {
    //# Seeing if user is already made(obviously don't want it to)
    //# Stores new user to database with hash password
    //# log user in once profile is made and sends it to front end
    const db = req.app.get("db");
    const {
      first_name,
      last_name,
      phone_number,
      email,
      username,
      password,
      dm,
      online,
    } = req.body;

    try {
      const [foundUser] = await db.auth.check_email(email);
      if (foundUser) {
        res.status(505).send("User already exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let [newUser] = await db.auth.check_user(username);
        if (newUser) {
          res.status(506).send("username already used");
        } else {
          newUser = await db.auth.create_user([
            first_name,
            last_name,
            phone_number,
            email,
            username,
            hash,
            dm,
            online,
          ]);
          req.session.user = newUser;
          res.status(200).send(req.session.user);
        }
      }
    } catch (err) {
      console.log("Database error with register function", err);
      res.sendStatus(507);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
};
