const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Contact, validateContact } = require("../models/contact");

const contact = require("../routes/contactRoutes");

const addContact = async (req, res) => {
  const { error } = validateContact(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { userId, name, number, address, email } = req.body;
  let newContact = await Contact.findOne({ email: req.body.email });
  if (newContact) return res.status(400).send("Contact already exists");
  newContact = new Contact({ userId, name, number, address, email });

  try {
    await newContact.save();
  } catch (err) {
    return res.status(400).send(err.message);
  }
  res.send(newContact);
};

const editContact = async (req, res) => {
  console.log("edit contact is called");
  const { error } = validateContact(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, number, location, email } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      name,
      number,
      location,
      email,
    },
    { new: true }
  );
  if (!contact) return res.status(404).send("Given contact does not exit");
  res.send(contact);
  // res.send(_.pick(newContact, ["_id", "name", "number"]));
};
const deleteContact = async (req, res) => {
  const deletedcContact = await Contact.findByIdAndDelete(req.params.id);
  if (!deletedcContact)
    return res.status(400).send("Given contact does not exist");

  res.send(deleteContact);
};

const getAllContacts = async (req, res) => {
  const userId = req.params.id;
  const contacts = await Contact.find({ userId: userId });
  res.send(contacts);
};

module.exports = {
  addContact,
  editContact,
  deleteContact,
  getAllContacts,
};
