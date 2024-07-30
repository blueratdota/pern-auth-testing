import jwt from "jsonwebtoken";

const genToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30
  });

  // console.log("decrpyt", jwt.verify(token, process.env.JWT_SECRET));
};

export { genToken };
