const { route } = require("../shared/shared");
const { register } = require("../controllers/userControllers");
const { login } = require("../controllers/userControllers");

route.post("/register", register);
route.post("/login", login);

module.exports = route;
