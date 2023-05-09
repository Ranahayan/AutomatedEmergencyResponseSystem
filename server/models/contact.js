const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateEmail = function (email) {
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regEmail.test(email);
};

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: { type: String, minlength: 3, maxlength: 20, required: true },
  number: {
    type: String,
    minlength: 11,
    maxlength: 11,
    required: true,
    match: /^[0-9]+$/,
  },
  address: { type: String, minlength: 3, maxlength: 20, required: true },
  email: {
    type: String,
    trim: true,
    lowerCase: true,
    required: "Email is required",
    validate: {
      validator: validateEmail,
      message: "Please enter valid email",
    },
  },
});

const Contact = mongoose.model("contacts", contactSchema);

const validateContact = (user) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(3).max(20).required(),
    number: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required(),
    address: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  return schema.validate(user);
};

exports.Contact = Contact;
exports.validateContact = validateContact;
