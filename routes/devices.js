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
    console.info("Device registration error with exception " + err.message);
    // TODO : this isn't really an error but I'm too tired to deal with it right now
    if(err.message.startsWith('Duplicated device identifier')) {
      res.json({deviceId: device.attributes.id})
    } else {
      res.status(500).json({error: true, data: {message: err.message}});
    }
  });
});

// Get a device's brew settings
router.get('/getBrewSettings/:deviceId', function (req, res) {
    var deviceId = req.params.deviceId;
    console.log("Getting brew settings for device " + deviceId + ".");
    models.device.forge({
     id: deviceId
   })
    .fetch({withRelated: ['deviceBrewSettings']})
    .then(function (device) {
      if (!device) {
        var errStr = "Error getting brew settings for device " + deviceId;
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
        res.status(200).json({brewSettings: resJson});
      }
  })
  .catch(function (err) {
    console.error("Error getting brew settings for device " + deviceId + " with exception " + err.message);
    res.status(500).json({error: false, data: {message: err.message}});
  });
});

// Set a device's brew settings
router.post('/setBrewSettings/:deviceId', bodyParser.json(), function (req, res) {
  var deviceId = req.params.deviceId;
  var newSettings = req.body.settings;
  console.log("Setting brew settings for device " + deviceId + ".");
  // TODO : Is there a less bullshit way to do this?  There's gotta be.
  _.forEach(newSettings, function(setting) {
    models.device_setting
    .where('device_id', '=', deviceId)
    .where('brew_setting_type_id', '=', setting.id)
    .fetch()
    .then(function(brewSetting) {
      if(!brewSetting) {
        // New setting for device
        models.device_setting.forge({
          device_id: deviceId,
          brew_setting_type_id: setting.id,
          brew_setting_value: setting.value
        })
        .save();
      } else {
        // Setting already exists for device, update its value
        models.device_setting.forge({
          id: brewSetting.attributes.id
        })
        .save({brew_setting_value: setting.value});
      }
    })
    .catch(function (err) {
      console.error("Error setting brew settings for device " + deviceId + " with exception " + err.message);
      res.status(500).json({error: false, data: {message: err.message}});
    })
  })
  // success! return:
  //     json object containing brewSettingsUpdateTs: timestamp
  res.status(200).json({error: false, data: {brewSettingsUpdateTs: _.now()}});
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
