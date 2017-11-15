const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const getContacts = require('../models/contactList');
const db = "mongodb://localhost:27017/contactListManagement";
mongoose.Promise = global.Promise;

mongoose.connect(db, (err) => {
  if (err) {
    console.log("Error connecting DB" + err);
  }
});

/*1. METHOD TO REGISTER A CONTACT(USER)*/
router.post('/registerContact', function (req, res) {
  console.log('Registering a Contact');
  var newContact = new getContacts();
  newContact.firstName = req.body.firstName;
  newContact.lastName = req.body.lastName;
  newContact.userName = req.body.userName;
  newContact.password = req.body.password;
  newContact.phoneNo = req.body.phoneNo;
  newContact.emailId = req.body.emailId;
  newContact.addressLine1 = req.body.address.addressLine1;
  newContact.addressLine2 = req.body.address.addressLine2;
  newContact.city = req.body.address.city;
  newContact.state = req.body.address.state;
  newContact.pincode = req.body.address.pincode;
  newContact.role = req.body.role;

  getContacts.find({
    'firstName': req.body.firstName,
    'lastName': req.body.lastName
  }, function (err, results) {
    if (err) {
      console.log("Err");
    } else {
      if (results.length == 0) {
        newContact.save(function (err, registeredContact) {
          if (err) {
            console.log('Error registering contact');
          } else {
            res.json(registeredContact);
          }
        });
      } else {
        console.log("User Already exists");
        // alert("User Already exists");
      }
    }
  });
});

/*2. METHOD TO GET ALL CONTACTS*/
router.get('/contacts', (req, res) => {
  console.log("Get the contacts from DB");
  getContacts.find({})
    .exec((err, contacts) => {
      if (err) {
        console.log("error retrieving contacts");
      } else {
        res.json(contacts);
      }
    });
});
/*3. METHOD TO GET DETAILS OF A SELECTED CONTACT*/
router.get('/contacts/:id', function (req, res) {
  console.log('Get request for a single contact');
  getContacts.findById(req.params.id)
    .exec(function (err, contacts) {
      if (err) {
        console.log("Error retrieving contacts");
      } else {
        res.json(contacts);
      }
    });
});

/*4. METHOD TO ADD A CONTACT*/
router.post('/contact', function (req, res) {
  console.log('Post a contact');
  var newContact = new getContacts();
  newContact.firstName = req.body.firstName;
  newContact.lastName = req.body.lastName;
  newContact.userName = req.body.userName;
  newContact.password = req.body.password;
  newContact.phoneNo = req.body.phoneNo;
  newContact.emailId = req.body.emailId;
  newContact.addressLine1 = req.body.addressLine1;
  newContact.addressLine2 = req.body.addressLine2;
  newContact.city = req.body.city;
  newContact.state = req.body.state;
  newContact.pincode = req.body.pincode;
  //newContact.role = req.body.role;
  newContact.save(function (err, insertedContact) {
    if (err) {
      console.log('Error saving contact');
    } else {
      res.json(insertedContact);
    }
  });
});
/*5. METHOD TO UPDATE A CONTACT*/
router.put('/contact/:id', function (req, res) {
  console.log('Update a contact');
  getContacts.findByIdAndUpdate(req.params.id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        emailId: req.body.emailId,
        addressLine1: req.body.addressLine1,
        addressLine1: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        //role: req.body.role
      }
    }, {
      new: true
    },
    function (err, updatedContact) {
      if (err) {
        res.send("Error updating contact");
      } else {
        res.json(updatedContact);
      }
    }
  );
});
/*6. METHOD TO DELETE A CONTACT*/
router.delete('/contact/:id', function (req, res) {
  console.log('Deleting a contact');
  getContacts.findByIdAndRemove(req.params.id, function (err, deletedContact) {
    if (err) {
      res.send("Error deleting contact");
    } else {
      res.json(deletedContact);
    }
  });
});
module.exports = router;
