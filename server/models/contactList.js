const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
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

//HASH THE PASSWORD
contactSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
contactSchema.methods.validPassword = function(password) {
  console.log(password);
  return bcrypt.compareSync(password, this.password);
};

// Method to compare password for login
contactSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('contact', contactSchema, 'contactList');
