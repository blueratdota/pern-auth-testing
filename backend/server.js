import express from "express";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// db stuff
import pool from "./config/db.js";
// import error stuff
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`### pathname is: ${__filename}`);

// body parser middleware
// must be before other
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.get("/", (req, res, next) => {
  res.send("server is running test");
});

// use error handler
app.use(notFound);
app.use(errorHandler);

// testing db -- logs latest registy
const logDB = async () => {
  const tryDB = await pool.query("SELECT * FROM users");
  console.log(tryDB.rows[tryDB.rows.length - 1]);
};
logDB();

app.listen(port, () => {
  console.log(`### server is running on port: ${port}`);
});
