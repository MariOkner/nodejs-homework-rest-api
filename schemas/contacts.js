const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  phone: Joi.string().min(10).required(),
});

module.exports = {
  addContactsSchema,
};
