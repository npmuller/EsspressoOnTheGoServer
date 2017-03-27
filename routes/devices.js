var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Register a device
router.post('/registerDevice', bodyParser.urlencoded({extended: true}), function (req, res) {
    var deviceIdentifier = req.body.deviceIdentifier;
    var wifiMAC = req.body.macAddress;
    console.log("Attempting to register device " + deviceIdentifier + ".");
    models.device.forge({
     device_identifier: deviceIdentifier,
     wifi_mac_address: wifiMAC,
     device_type_id: getDeviceTypeId(deviceIdentifier)
   })
    .save()
    .then(function (device) {
      if (!device) {
        console.error("Error registering device.");
        res.status(500).json({error: true, data: {message: "Error registering device."}});
      }
      else {
        // success! return:
        //     json object containing device id
        console.log("Device " + device.attributes.device_identifier + " successfully registered!");
        res.json({deviceId: device.attributes.id})
      }
  })
  .catch(function (err) {
    console.error("Device registration error with exception " + err.message);
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

function getDeviceTypeId(deviceIdentifier) {
  var imei = RegExp('[A-Fa-f0-9]{14,14}');
  if(imei.exec(deviceIdentifier)) {
    return 2;
  } else {
    return 1;
  }
};

module.exports = router;
