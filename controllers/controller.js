const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

async function getContacts(req, res, next) {
  const contactsList = await contacts.listContacts();
  console.log(contactsList);
  res.json(contactsList);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (!contact) {
    // return next(HttpError(404, "Not found!!!!!"));
    return res.status(404).json({ message: "Not" });
  }
  res.json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(HttpError(400, "Missing required name field!"));
    // return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = await contacts.addContact(name, email, phone);

  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await contacts.removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return next(HttpError(400, "Missing fields"));
  }

  const updatedContact = await contacts.updateContact(contactId, name, email, phone);

  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
