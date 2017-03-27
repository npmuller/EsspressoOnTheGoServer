var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Get every user associated with a device
router.post('/signInUser', bodyParser.urlencoded({extended: true}), function (req, res) {
    var un = req.body.username;
    var pw = req.body.password;
    console.log("User " + un + " is attempting to sign in.");
    models.users.forge({
     username: un,
     password: pw
   })
    .fetch()
    .then(function (user) {
      if (!user) {
        console.log("User " + un + " does not exist, or some other error has occured.");
        // user not found
        res.status(500).json({error: true, data: {message: "User not found or internal server error."}});
      }
      else {
        // success! return:
        //     json object containing session id, user id, and device id if
        //     applicable.
        console.log("User " + un + " successfully signed in!");
        res.json({message: "signed in!"})
      }
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;
