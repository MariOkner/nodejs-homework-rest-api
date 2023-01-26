const express = require("express");
const { getCurrent, getContacts, createContact } = require("../../controllers/users.controller");
const { auth } = require("../../middlewares/validate");
const userRouter = express.Router();

userRouter.get("/users/current", auth, getCurrent);
userRouter.get("/users/contacts", auth, getContacts);
userRouter.post("/users/contacts", auth, createContact);

module.exports = {
  userRouter,
};
