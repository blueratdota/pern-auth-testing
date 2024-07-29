import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// for authorizing user - enter the app - cookie stuff
// POST/api/user/auth
// access - public
const authUser = async (req, res) => {
  res.json({ message: "auth user" });
};

// for log-out user
// POST/api/user/logout
// access - public
const logOutUser = async (req, res) => {
  res.json({ message: "log-out user" });
};

// for registering user
// POST/api/user
// access - public
const regUser = async (req, res) => {
  // console.log(req.body); // returns { username: 'john', email: 'fox', password: 'heee', timestamp: 'heee' }
  const { username, email, password, timestamp } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT username FROM users WHERE username = $1 ",
      [username]
    );
    if (rows[0]) {
      res.json({ message: "user exists" });
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return alert("Error in hashing password");
        }
        await pool.query(
          "INSERT INTO users (username,email, password,timestamp) VALUES ($1, $2,$3,$4)",
          [username, email, hashedPassword, new Date()]
        );
      });
    }
  } catch (error) {
    console.log(error.message);
  }
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
