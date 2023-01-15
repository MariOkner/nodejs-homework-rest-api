const { HttpError } = require("../helpers");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new HttpError(400, "Missing required name field!"));
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
