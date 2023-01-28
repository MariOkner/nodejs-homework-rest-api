const { User } = require("../models/users");

async function getCurrent(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;

  return res.status(200).json({
    user: { email, subscription },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate("contacts", { name: 1, email: 1, phone: 1, _id: 1 });

  return res.status(200).json({
    contacts: userWithContacts.contacts,
  });
}

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  // if (user._id) {
  //   return res.status(208).json({ message: `This contact has already been added` });
  // }

  user.contacts.push({ _id: contactId });
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    contacts: user.contacts,
  });
}

async function uploadUserAvatar(req, res, next) {
  //
  console.log("req.file", req.file);

  return res.json({
    ok: true,
  });
}

module.exports = {
  getCurrent,
  getContacts,
  createContact,
  uploadUserAvatar,
};
