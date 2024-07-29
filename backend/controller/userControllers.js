// for authorizing user
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
  console.log(req.body); // returns { username: 'john', email: 'fox', password: 'heee', timestamp: 'heee' }
  const { username, email, password, timestamp } = req.body;
  res.json({ message: "register user" });
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
