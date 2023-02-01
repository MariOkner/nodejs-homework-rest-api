const { User } = require("../models/users");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

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
  const { _id } = req.user;
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../tmp", filename);

  const avatar = await jimp.read(tmpPath);
  await avatar.resize(250, 250);
  await avatar.writeAsync(tmpPath);

  const publicPath = path.resolve(__dirname, "../public/avatars", filename);

  try {
    await fs.rename(tmpPath, publicPath);
    const avatarURL = path.resolve("../public/avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    return res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
}

module.exports = {
  getCurrent,
  getContacts,
  createContact,
  uploadUserAvatar,
};
