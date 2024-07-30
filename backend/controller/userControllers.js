import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/generateToken.js";

// for authorizing user - enter the app - cookie stuff
// POST/api/user/auth
// access - public
const authUser = async (req, res, next) => {
  // res.json({ message: "auth user" });
  const { username, email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND username= $2 ",
      [email, username]
    );
    if (!user.rows[0]) {
      const error = new Error("User does not exist");
      error.status = 401;
      return next(error);
    }
    // check password if passwowrd entry is correct
    const userObj = user.rows[0];
    const match = await bcrypt.compare(password, userObj.password);
    if (!match) {
      const error = new Error("Password is incorrect");
      error.status = 401;
      return next(error);
    }
    genToken(res, username);
    res.json(user.rows);
  } catch (error) {
    return next(error);
  }
};

// for registering user
// POST/api/user
// access - public
// ==todo: check for duplicate, change loging format - login via email and password only. remove username column
const regUser = async (req, res, next) => {
  // console.log(req.body); // returns { username: 'john', email: 'fox', password: 'heee', timestamp: 'heee' }
  const { username, email, password, timestamp } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT username FROM users WHERE username = $1 ",
      [username]
    );
    if (rows[0]) {
      const error = new Error(`User "${username}" already exists`);
      error.status = 400;
      return next(error);
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return alert("Error in hashing password");
        }
        genToken(res, username);
        await pool.query(
          "INSERT INTO users (username,email, password,timestamp) VALUES ($1,$2,$3,$4)",
          [username, email, hashedPassword, new Date()]
        );

        res.status(201).json(req.body);
      });
    }
  } catch (error) {
    return next(error);
  }
};

// for log-out user
// POST/api/user/logout
// access - public
const logOutUser = async (req, res) => {
  res.cooke("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: `User: logged-out` });
};

// for getting user data
// GET/api/user
// access - private
const getUser = async (req, res) => {
  res.json({ message: "get user" });
};

// for updating user data
// PUT/api/user
// access - private
const updateUser = async (req, res) => {
  res.json({ message: "update user" });
};

export { authUser, logOutUser, regUser, getUser, updateUser };
