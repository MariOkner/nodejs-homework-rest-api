const { HttpError } = require("../helpers");
const { User } = require("../models/users");

const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const { JWT_SECRET } = process.env;

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new HttpError(400, "Missing required name field!"));
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return next(new HttpError(401, "Not authorized!"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return next(new HttpError(401, "Not authorized"));
    }

    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return next(new HttpError(401, "jwt token is not valid"));
    }

    next(error);
  }

  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const uploadAvatar = multer({
  storage,
});

module.exports = {
  validateBody,
  auth,
  uploadAvatar,
};
