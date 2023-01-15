const { HttpError } = require("../helpers");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  try {
    const contactsList = await Contact.find();

    res.json(contactsList);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  console.log("contactId", contactId);
  try {
    console.log("123");
    const contact = await Contact.findById(contactId);
    console.log("contact", contact);

    if (!contact) {
      return res.status(404).json({ message: `Not Found contact id: ${contactId}` });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;

  try {
    const newContact = await Contact.create({ name, email, phone });

    res.status(201).json(newContact);
  } catch (error) {
    next();
  }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(new HttpError(404, `Not Found contact id: ${contactId}`));
    }

    await Contact.getByIdAndRemove(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next();
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, name, email, phone);

    if (!updatedContact) {
      res.status(404).json({ message: `Not Found contact id: ${contactId}` });
      return;
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next();
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
