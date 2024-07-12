const { registerQuery } = require("../queries/userQueries");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send(token);
};

module.exports = {
  register,
};
