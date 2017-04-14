var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models/models.js');
var knex = require('../database/database.js').knex;

// Set a preset
router.post('/setDevicePreset/:deviceId/:presetId', function (req, res) {
    var deviceId = req.params.deviceId;
    var presetId = req.params.presetId; 
    if(!deviceId || !presetId) {
        console.error('No device identifier or preset given to change!');
        res.status(500).json({error: true, message: "Cannot change a preset for non-existent device or preset!"});
        return;
    }
    console.log('Changing preset for device ' + deviceId + ' to preset ' + presetId);
    models.brew_preset.forge({
      device_id: deviceId,
      id: presetId,
  })
  .save()
  .then(function (preset) {
    if (!preset) {
      console.error("Error updating preset.");
      res.status(500).json({error: true, data: {message: "Error updating preset."}});
    }
    else {
      // success! return:
      //     json object containing an ok message
      res.json({message: "ok"});
    }
  })
  .catch(function (err) {
        console.error("Change preset error with exception " + err.message);
        res.status(500).json({error: true, data: {message: err.message}});
  });
});


