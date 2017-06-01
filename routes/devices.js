var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var _ = require('lodash');
var models = require('../models/models.js');
var knex = require('../database/database.js').knex;

// TODO : Do code review of whole project, make sure everything is as efficient as it can be.
// TODO : Standardize return json structure, get rid of "error/data" convention.
// Register a device
router.post('/registerDevice', bodyParser.urlencoded({extended: true}),
  function (req, res) {
    console.info(req.body.deviceIdentifier + ', ' + req.body.macAddress);
    var deviceIdentifier = req.body.deviceIdentifier;
    var wifiMAC = req.body.macAddress;
    if(!deviceIdentifier || !wifiMAC) {
        console.error('No device identifier or MAC given to register!');
        res.status(500).json({error: true, message: "Cannot register a device with blank serial number or MAC address!"});
        return;
    }
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
      // Insert a status record for the device
      models.device_status.forge({
          device_id: device.attributes.id,
          battery_level: '',
          water_level: '',
          ac_power_state: 0,
          brew_preset_id: -1
      })
      .save(null, {method: 'insert'});
      // success! return:
      //     json object containing device id
      console.info("Device " + device.attributes.device_identifier + " successfully registered!");
      res.json({deviceId: device.attributes.id})
    }
  })
  .catch(function (err) {
    if(err.message.includes("deviceId")) {
        var deviceData = err.message.split(' ');
        var devId = deviceData[1];
        res.status(200).json({deviceId: devId});
    } else {
        console.error("Device registration error with exception " + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
    }
  });
});

// Get a device's brew settings
router.get('/getBrewSettings/:deviceId', bodyParser.json(), function(req, res) {
    var deviceId = req.params.deviceId;
    var settingsModel;
    console.log("Getting brew settings for device " + deviceId + ".");
    models.device_status.forge({
        device_id: deviceId
    })
    .fetch()
    .then(function(devStatus) {
        var currentDevicePreset = devStatus.attributes.brew_preset_id;
        console.log('current brew preset is ' + currentDevicePreset);
        // custom preset being used
        if(currentDevicePreset > 0) {
            settingsModel = models.brew_preset.forge({
                id: currentDevicePreset
            });
        }
        // manual settings are in use
        else { 
            settingsModel = models.device.forge({
                id: deviceId
            });
        }
        settingsModel.fetch({
            withRelated: ['deviceBrewSettings']
        })
        .then(function (device) {
            if (!device) {
                var errStr = "Error getting brew settings for device " + deviceId;
                console.error(errStr);
                res.status(500).json({error: true, data: {message: errStr}});
            } else {
                // success! return:
                //     json object containing device settings
                var resJson = [];
                _.forEach(device.related('deviceBrewSettings').models, function(brewSetting) {
                    resJson = _.concat(resJson, brewSetting.attributes);
                });
                res.status(200).json({brewSettings: resJson});
            }
        })
        .catch(function (err) {
            console.error("Error getting brew settings for device " + deviceId + " with exception " + err.message);
            res.status(500).json({error: false, data: {message: err.message}});
        });
    })
    .catch(function(ex) {
        var msg = 'Error getting device status in settings request for device id ' + deviceId + ': ' + ex.message;
        console.error(msg);
        res.status(500).json({error: true, message: msg})
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

// Should my device be brewing?
router.get('/shouldBrew/:deviceId',
  function (req, res) {
    console.log("Got poll request for brew enable.");
    var devId = req.params.deviceId;
    models.device.forge({
      id: devId
  })
  .fetch({withRelated: ['deviceBrewSettings']})
  .then(function (device) {
    if (!device) {
      var errStr = "Error getting brew enable";
      console.error(errStr);
      res.status(500).json({error: true, data: {message: errStr}});
    }
    else {
      // success! return:
      //     json object containing device settings
      var resJson = {};
      _.forEach(device.related('deviceBrewSettings').models, function(brewSetting) {
        if(brewSetting.attributes.brew_setting_type_id == 5) {
          resJson = {shouldBrew: brewSetting.attributes.brew_setting_value};
        }
      })
      res.status(200).json(resJson);
    }
  })
  .catch(function (err) {
    console.error("Error getting brew enable with exception " + err.message);
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// Set next brew times for all devices (TODO : need to make this a per-device setting)
// TODO : make this less obvious to the outside world
router.post('/setBrewEnable/:brewEnable', function (req, res) {
  try {
    var brewEnable = req.params.brewEnable;
    console.info('brew enable = ' + brewEnable)
    knex.raw('call spEotgSetBrewEnable(' + brewEnable + ');').then(function() {});
    knex.raw('select brew_setting_value from device_brew_setting where brew_setting_type_id = 5 limit 1;').then(function(resp) {
        r = resp[0]
        if(((r[0].brew_setting_value)) == brewEnable) {
            res.status(200).json({error: false, message: 'ok'});
        } else {
            res.status(500).json({error: true, message: 'Device must be on and plugged in before a brew can begin!'});
        }
    });
  } catch(err) {
    res.status(500).json({error: true, message: err.message});
  }
});

function getDeviceTypeId(deviceIdentifier) {
  // Device type 1 = Esspresso Machine, Device type 2 = Android device
  // Since Espresso Machine serial number format hasn't been decided on yet,
  // just check if the device identifier is an IMEI, which is garuanteed to be
  // a phone/tablet.
  var imei = RegExp('[A-Fa-f0-9]{14,14}');
  if(imei.exec(deviceIdentifier)) {
    return 2;
  } else {
    return 1;
  }
};

module.exports = router;
