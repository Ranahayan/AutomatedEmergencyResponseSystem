const express = require("express");
const contact = express.Router();
const {
  addContact,
  editContact,
  deleteContact,
  getAllContacts,
} = require("../controllers/conatctController");

contact.post("/", addContact);
contact.put("/:id", editContact);
contact.delete("/:id", deleteContact);
contact.get("/", getAllContacts);

module.exports = contact;
