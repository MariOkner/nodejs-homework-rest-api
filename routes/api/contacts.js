const express = require("express");
const { getContacts, getContact, createContact, deleteContact, updateContact } = require("../../controllers/controller");
const { validateBody } = require("../../middlewares/validate");
const { addContactsSchema, updateContactsSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", validateBody(addContactsSchema), createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateBody(updateContactsSchema), updateContact);

module.exports = router;
