const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  phone: Joi.string().min(10).required(),
});

const updateContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(1),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  phone: Joi.string().min(10),
});

module.exports = {
  addContactsSchema,
  updateContactsSchema,
};
