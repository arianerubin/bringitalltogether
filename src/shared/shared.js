const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var cors = require("cors");
app.use(cors());
module.exports = {
  app,
  bcrypt,
  jwt,
  route,
  prisma,
};
