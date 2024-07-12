const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Pool } = require("pg");
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://localhost:5432/bringitalltogether_db",
});

module.exports = {
  app,
  bcrypt,
  jwt,
  route,
  prisma,
  db,
};
