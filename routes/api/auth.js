const express = require("express");
const { signup, login, logout } = require("../../controllers/auth.controller");
const { auth } = require("../../middlewares/validate");

const authRouter = express.Router();

authRouter.post("/users/signup", signup);
authRouter.post("/users/login", login);
authRouter.post("/users/logout", auth, logout);

module.exports = {
  authRouter,
};
