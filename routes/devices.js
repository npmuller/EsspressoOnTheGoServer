var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var _ = require('lodash');
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

// Get a device's brew settings
router.get('/getBrewSettings/:id', function (req, res) {
    var deviceId = req.params.id;
    console.log("Getting brew settings for device " + deviceId + ".");
    models.device.forge({
     id: deviceId
   })
    .fetch({withRelated: ['deviceBrewSettings']})
    .then(function (device) {
      if (!device) {
        var errStr = "Error getting brew settins for device " + deviceId;
        console.error(errStr);
        res.status(500).json({error: true, data: {message: errStr}});
      }
      else {
        // success! return:
        //     json object containing device settings
        var resJson = [];
        _.forEach(device.related('deviceBrewSettings').models, function(brewSetting) {
          resJson = _.concat(resJson, brewSetting.attributes);
        })
        res.status(200).json({error: false, data: resJson});
      }
  })
  .catch(function (err) {
    console.error("Error getting brew settings for device " + deviceId + " with exception " + err.message);
    res.status(500).json({error: false, data: {message: err.message}});
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
