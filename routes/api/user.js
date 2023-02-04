const express = require("express");
const { getCurrent, getContacts, createContact, uploadUserAvatar, verifyEmail } = require("../../controllers/users.controller");
const { auth, uploadAvatar } = require("../../middlewares/validate");
const userRouter = express.Router();

userRouter.get("/users/current", auth, getCurrent);
userRouter.get("/users/contacts", auth, getContacts);
userRouter.post("/users/contacts", auth, createContact);
userRouter.patch("/users/avatars", auth, uploadAvatar.single("avatar"), uploadUserAvatar);
userRouter.get("/users/verify/:verificationToken", verifyEmail);

module.exports = {
  userRouter,
};
