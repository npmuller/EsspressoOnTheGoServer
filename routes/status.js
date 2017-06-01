var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require('lodash');
var models = require('../models/models.js');

// Set a status item
router.post('/setDeviceStatus/:deviceId', bodyParser.json(), function (req, res) {
    var deviceId = req.params.deviceId;
    var newStatusItems = req.body.newStatusItems;
    if(!deviceId) {
        console.error('No device id given to change!');
        res.status(500).json({error: true, message: "Cannot change a status for non-existent device!"});
        return;
    }
    // insert or update a device's status
    if(newStatusItems && newStatusItems.length > 0) { 
        _.forEach(newStatusItems, function(statusItem) {
            models.device_status.forge({
                device_id: deviceId
            })
            //.where(statusItem.statusType, '=', statusItem.statusValue)
            .fetch()
            .then(function(deviceStatus) {
                if(!deviceStatus) {
                    // There currently exists no status entry for this device, create one
                    console.info('Adding new status entry for device ' + deviceId);
                    models.device_status.forge({
                        device_id: deviceId,
                        battery_level: '',
                        water_level: '',
                        ac_power_state: 0,
                        brew_preset_state: -1
                    })
                    .save();
                } else {
                    // Setting already exists for device, update its value
                    var statusType = statusItem.statusType;
                    var statusValue = statusItem.statusValue;
                    console.log('Updating status type ' + statusType + ' for device ' + deviceId + ' to be ' + statusValue);
                    if(statusType == 'battery_level') { models.device_status.forge({device_id: deviceId}).save({battery_level: statusValue}); }
                    else if(statusType == 'water_level') { models.device_status.forge({device_id: deviceId}).save({water_level: statusValue}); }
                    else if(statusType == 'current_state') { models.device_status.forge({device_id: deviceId}).save({current_state: statusValue}); }
                    else if(statusType == 'ac_power_state') { models.device_status.forge({device_id: deviceId}).save({ac_power_state: statusValue}); }
                }
            })
            .catch(function (err) {
                console.error("Error setting brew preset settings for device " + deviceId + " and preset " + presetId + " with exception " + err.message);
                res.status(500).json({error: false, data: {message: err.message}});
            });
        });
        // success! return json saying ok
        res.status(200).json({message: "ok"});
    } else {
        res.status(200).json({message: "no update occured because no new status items were supplied."});
    }
});

// Get a device's presets
router.get('/getDeviceStatus/:deviceId', function (req, res) {
    var deviceId = req.params.deviceId;
    console.log("Getting status for device " + deviceId + ".");
    models.device_status.forge({
        device_id: deviceId
    })
    .fetch()
    .then(function (devStatus) {
        if (!devStatus) {
            var errStr = "Error getting device status for device " + deviceId;
            console.error(errStr);
            res.status(500).json({error: true, message: errStr});
        }
        else {
            // success! return:
            //     json object containing device status
            res.status(200).json(devStatus.toJSON());
        }
    })
    .catch(function (err) {
        console.error("Error getting device status for device " + deviceId + " with exception " + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

module.exports = router;
