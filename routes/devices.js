var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Get every user associated with a device
router.post('/registerDevice', bodyParser.urlencoded({extended: true}), function (req, res) {
    var deviceIdentifier = req.body.deviceIdentifier;
    console.debug("Registering device " + deviceIdentifier + ".");
    models.device.forge({
     device_identifier: deviceIdentifier
   })
    .save()
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
