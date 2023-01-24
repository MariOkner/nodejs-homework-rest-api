const { HttpError } = require("../helpers");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const contactsList = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate("owner", { id: _id, email: 1 });

    res.json(contactsList);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: `Not Found contact id: ${contactId}` });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const { _id } = req.user;

  try {
    const newContact = await Contact.create({
      ...req.body,
      owner: _id,
    });

    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(new HttpError(404, `Not Found contact id: ${contactId}`));
    }

    await Contact.findByIdAndRemove(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId }, { name, email, phone }, { new: true });

    if (!updatedContact) {
      res.status(404).json({ message: `Not Found contact id: ${contactId}` });
      return;
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const updateStatusContact = await Contact.findByIdAndUpdate({ _id: contactId }, { favorite }, { new: true });

    if (!updateStatusContact) {
      res.status(404).json({ message: `Not Found contact id: ${contactId}` });
      return;
    }

    res.status(200).json(updateStatusContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
