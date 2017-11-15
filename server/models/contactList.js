const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  phoneNo: Number,
  emailId: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  pincode: String,
  role: String,
});

module.exports = mongoose.model('contact', contactSchema, 'contactList');
