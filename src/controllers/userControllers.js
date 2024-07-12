const { registerQuery } = require("../queries/userQueries");
const {
  loginQuery,
  getAllUser,
  destroyUser,
  alterUser,
} = require("../queries/userQueries");

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

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const delUser = await destroyUser(userId);
  res.send(delUser);
};

const changeUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const changedUser = await alterUser(userId);
    res.json(changedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = {
  register,
  login,
  displayAll,
  deleteUser,
  changeUser,
};
