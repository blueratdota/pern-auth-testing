import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userQuery = await pool.query(
          "SELECT username,email FROM users WHERE username = $1 ",
          [decoded.userId]
        );
        req.user = userQuery.rows[0];
        next();
      } catch (error) {
        const err = new Error("Not authorized, INVALID token");
        err.status = 401;
        return next(err);
      }
    } else {
      const error = new Error("Not authorized, no token");
      error.status = 401;
      return next(error);
    }
  } catch (error) {}
};

export { protect };
