const express = require("express");
const { 
  getCurrent, 
  getContacts, 
  createContact, 
  uploadUserAvatar, 
  verifyEmail, 
  sendVerifyEmail 
} = require("../../controllers/users.controller");
const { auth, uploadAvatar, validateBody } = require("../../middlewares/validate");
const {sendVerifyEmailSchema} = require("../../schemas/user");

const userRouter = express.Router();

userRouter.get("/current", auth, getCurrent);
userRouter.get("/contacts", auth, getContacts);
userRouter.post("/contacts", auth, createContact);
userRouter.patch("/avatars", auth, uploadAvatar.single("avatar"), uploadUserAvatar);
userRouter.get("/verify/:verificationToken", verifyEmail);
userRouter.post("/verify", validateBody(sendVerifyEmailSchema), sendVerifyEmail);

module.exports = {
  userRouter,
};
