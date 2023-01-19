const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/controller");
const { validateBody } = require("../../middlewares/validate");
const { addContactsSchema, updateContactsSchema, updateStatusContactSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", validateBody(addContactsSchema), createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateBody(updateContactsSchema), updateContact);
router.patch("/:contactId", validateBody(updateStatusContactSchema), updateStatusContact);

module.exports = router;
