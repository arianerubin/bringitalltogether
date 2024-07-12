const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/userQueries");
const {
  register,
  login,
  displayAll,
  deleteUser,
  changeUser,
} = require("../controllers/userControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

route.post("/register", register);
route.post("/login", login);
route.get("/all_users", isLoggedIn, displayAll);
route.delete("/:id/delete", isLoggedIn, deleteUser);
route.put("/:id/change", isLoggedIn, changeUser);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
