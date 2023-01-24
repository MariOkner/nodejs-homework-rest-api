const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

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

module.exports = {
  validateBody,
  auth,
};
