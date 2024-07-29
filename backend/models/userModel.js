import bcrypt from "bcryptjs";

const passwordCryp = (req, pool) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return alert("xxx");
    }
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword
    ]);
  });
};

export { passwordCryp };
