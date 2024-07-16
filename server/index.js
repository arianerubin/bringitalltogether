const { app } = require("../src/shared/shared");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

const userRoutes = require("../src/routes/userRoutes");
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
