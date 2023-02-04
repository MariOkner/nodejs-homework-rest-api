const { HttpError, sendMail } = require("../helpers");
const { User } = require("../models/users");

// const sendGrid = require("@sendgrid/mail");

const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { JWT_SECRET } = process.env;
// const { SEND_GRID_KEY } = process.env;

async function signup(req, res, next) {
  const { email, password } = req.body;
  const verificationToken = uuidv4();

  try {
    const avatarURL = gravatar.url(email);
    const savedUser = await User.create({
      email,
      password,
      avatarURL,
      verify: false,
      verificationToken,
    });

    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `Please, POST http://localhost:3000/api/users/users/verify/${verificationToken}`,
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

    if (!storedUser.varify) {
      return next(new HttpError(401, `Email ${email} is not varify`));
    }

    if (!storedUser || !storedUser.comparePassword(password)) {
      return next(new HttpError(401, `Email ${email} or password is wrong!`));
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
