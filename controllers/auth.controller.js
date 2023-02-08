const { HttpError, sendMail } = require("../helpers");
const { User } = require("../models/users");


const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { JWT_SECRET } = process.env;

async function signup(req, res, next) {
  const { email, password } = req.body;
  const verifyToken = v4();

  try {
    const avatarURL = gravatar.url(email);
    const savedUser = await User.create({
      email,
      password,
      avatarURL,
      verify: false,
      verifyToken,
    });

    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Please, confirm your email</a>`,
    });

    res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(new HttpError(409, "Email in use"));
    }
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const storedUser = await User.findOne({
      email,
    });

    if (!storedUser || !storedUser.comparePassword(password)) {
      return next(new HttpError(401, `Email ${email} or password is wrong!`));
    }

    if (!storedUser.verify) {
      return next(new HttpError(401, `Email ${email} is not verify`));
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15h" });

    await User.findByIdAndUpdate(storedUser._id, { token });

    return res.status(201).json({
      token,
      user: {
        email,
        subscription: storedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(_id, { token: null });

    if (!user) {
      return res.status(401).json({ message: `Not authorized!!` });
    }

    return res.status(204).json({ message: `No Content` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  logout,
};
