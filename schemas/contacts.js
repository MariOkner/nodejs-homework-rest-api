const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.boolean(),
});

const updateContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(1),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  phone: Joi.string().min(10),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactsSchema,
  updateContactsSchema,
  updateStatusContactSchema,
};
