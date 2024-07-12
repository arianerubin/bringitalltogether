const { registerQuery } = require("../queries/userQueries");
const { loginQuery, getAllUser } = require("../queries/userQueries");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send(token);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResponse = await loginQuery({ email, password });
    res.json(loginResponse);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid login credentials.");
  }
};

const displayAll = async (req, res, next) => {
  const users = await getAllUser();
  res.send(users);
};


module.exports = {
  register,
  login,
  displayAll,
};
