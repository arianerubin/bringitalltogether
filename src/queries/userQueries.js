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
  return {
    token: token,
    firstName: registerUser.firstName,
    lastName: registerUser.lastName,
    email: registerUser.email,
  };
};

const loginQuery = async ({ email, password }) => {
  try {
    const userLogin = await prisma.user.findUnique({
      where: { email },
    });
    if (!userLogin || !bcrypt.compareSync(password, userLogin.password)) {
      return "Invalid login credentials.";
    }
    const token = jwt.sign(
      {
        id: userLogin.id,
      },
      process.env.WEB_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    return {
      token: token,
      firstName: userLogin.firstName,
      lastName: userLogin.lastName,
      email: userLogin.email,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerQuery,
  loginQuery,
};
