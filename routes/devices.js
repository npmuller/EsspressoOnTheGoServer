var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Get every user associated with a device
router.post('/registerDevice', bodyParser.urlencoded({extended: true}), function (req, res) {
    var deviceIdentifier = req.body.deviceIdentifier;
    var wifiMAC = req.body.macAddress;
    // TODO : get real device type
    console.debug("Registering device " + deviceIdentifier + ".");
    models.device.forge({
     device_identifier: deviceIdentifier,
     wifi_mac_address: wifiMAC,
     device_type_id: 2
   })
    .save()
    .then(function (device) {
      if (!device) {
        // TODO : better logging
        console.error("Error registering device.");
        // user not found
        res.status(500).json({error: true, data: {message: "Error registering device."}});
      }
      else {
        // success! return:
        //     json object containing session id, user id, and device id if
        //     applicable.
        console.log("Device " + device.device_identifier + " successfully registered!");
        res.json({deviceId: device.id})
      }
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;
