const mongoose = require("mongoose");
// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.resolve(__dirname, "contacts.json");

const shcema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Contact = mongoose.model("contact", shcema);

// async function readContacts() {
//   const contactsRaw = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(contactsRaw);
//   return contacts;
// }

// async function writeContacts(contact) {
//   await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
// }

// const listContacts = async () => {
//   const contacts = await readContacts();
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await readContacts();
//   const contact = contacts.find((contact) => contact.id == contactId);
//   return contact || null;
// };

// const addContact = async (name, email, phone) => {
//   const id = nanoid();
//   const contact = { id, name, email, phone };

//   const contacts = await readContacts();
//   contacts.push(contact);

//   await writeContacts(contacts);

//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await readContacts();
//   const updateContacts = contacts.filter((contact) => contact.id !== contactId);
//   await writeContacts(updateContacts);
// };

// const updateContact = async (contactId, name, email, phone) => {
//   const contacts = await readContacts();
//   let contact = contacts.find((contact) => contact.id == contactId);

//   if (!contact) {
//     return null;
//   }

//   if (name) {
//     contact.name = name;
//   }
//   if (email) {
//     contact.email = email;
//   }
//   if (phone) {
//     contact.phone = phone;
//   }

//   await writeContacts(contacts);

//   return contact;
// };

module.exports = {
  Contact,
  // listContacts,
  // getContactById,
  // addContact,
  // removeContact,
  // updateContact,
};
