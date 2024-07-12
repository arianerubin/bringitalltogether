const { bcrypt, prisma, jwt } = require("../shared/shared");
const registerQuery = async ({ firstName, lastName, email, password }) => {
  console.log(password);
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
    },
    process.env.WEB_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  return {
    token: token,
    firstName: registerUser.firstName,
    lastName: registerUser.lastName,
    email: registerUser.email,
  };
};

module.exports = {
  registerQuery,
};
