const express = require("express");
const contact = express.Router();
const {
  addContact,
  editContact,
  deleteContact,
  getAllContacts,
} = require("../controllers/conatctController");

contact.post("/add", addContact);
contact.put("/:id", editContact);
contact.delete("/:id", deleteContact);
contact.get("/:id", getAllContacts);

module.exports = contact;
