const express = require("express");
const { getCurrent, getContacts, createContact, uploadUserAvatar } = require("../../controllers/users.controller");
const { auth, uploadAvatar } = require("../../middlewares/validate");
const userRouter = express.Router();

userRouter.get("/users/current", auth, getCurrent);
userRouter.get("/users/contacts", auth, getContacts);
userRouter.post("/users/contacts", auth, createContact);
userRouter.patch("/users/avatars", auth, uploadAvatar.single("avatar"), uploadUserAvatar);

module.exports = {
  userRouter,
};
