const { HttpError } = require("../helpers");
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

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({
      verifyToken: verificationToken,
    });

    if (!user) {
      return next(new HttpError(404, "User not found"));
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verifyToken: null,
    });

    return res.status(201).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

async function sendVerifyEmail(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({email});
    
    if (!user) {
      return next(new HttpError(400, "Unknow user"));
    };

    if (user.verify) {
      return next(new HttpError(400, "Verification has already been passed"));
    };

    res.status(200).json({message: "Verification email sent"});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrent,
  getContacts,
  createContact,
  uploadUserAvatar,
  verifyEmail,
  sendVerifyEmail,
};
