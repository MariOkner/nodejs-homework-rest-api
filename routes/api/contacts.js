const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const { auth, validateBody } = require("../../middlewares/validate");
const { addContactsSchema, updateContactsSchema, updateStatusContactSchema } = require("../../schemas/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getContacts);
contactsRouter.get("/:contactId", getContact);
contactsRouter.post("/", auth, validateBody(addContactsSchema), createContact);
contactsRouter.delete("/:contactId", deleteContact);
contactsRouter.put("/:contactId", validateBody(updateContactsSchema), updateContact);
contactsRouter.patch("/:contactId", validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = {
  contactsRouter,
};
