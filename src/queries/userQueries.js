const { bcrypt, prisma, jwt } = require("../shared/shared");
const registerQuery = async ({ firstName, lastName, email, password }) => {
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
  return token;
};

module.exports = {
  registerQuery,
};
