var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require('lodash');
var models = require('../models/models.js');

// Set a preset
router.post('/setDevicePreset/:deviceId/:presetId', bodyParser.json(), function (req, res) {
    var deviceId = req.params.deviceId;
    var presetId = req.params.presetId;
    var newPresetSettings = req.body.settings;
    if(!deviceId || !presetId) {
        console.error('No device identifier or preset given to change!');
        res.status(500).json({error: true, message: "Cannot change a preset for non-existent device or preset!"});
        return;
    }
    console.info('Changing preset for device ' + deviceId + ' to preset ' + presetId);
    // If there aren't any request parameters, that means we're simply editing the active preset.
    if(_.keys(newPresetSettings).length == 0) {
        models.device_status.forge({
            device_id: deviceId
        })
        .save({
            brew_preset_id: presetId
        })
        .catch(function (err) {
            console.error("Error setting brew preset for device " + deviceId + " and preset " + presetId + " with exception " + err.message);
            res.status(500).json({error: true, data: {message: err.message}});
        });
        res.json({message: 'ok'});
    }
    // otherwise, we are editing a currently existing preset's brew settings or adding a new preset.
    else {
        // New brew preset
        if(presetId == -1) {
            var setting = newPresetSettings.shift();
            models.brew_preset.forge({
                device_id: deviceId,
                dsc: setting.value
            })
            .save()
            .then(function(model) {
                console.log('new preset id is ' + model.attributes.id);
                presetId = model.attributes.id;
                // Add the new settings
                addPresetSettings(newPresetSettings, presetId);
                res.status(200).json({message: "ok"});
            });
        }
        else if(newPresetSettings && newPresetSettings.length > 0) { 
            addPresetSettings(newPresetSettings, presetId);
            // success! return json saying ok
            res.status(200).json({message: "ok"});
        } else {
            res.status(200).json({message: "no update occured because no new settings were supplied."});
        }
    }
});

// Get a device's presets
router.get('/getPresets/:deviceId', function (req, res) {
    var deviceId = req.params.deviceId;
    console.log("Getting brew presets for device " + deviceId + ".");
    models.brew_preset.forge()
    .where('device_id', '=', deviceId)
    .orderBy('dsc', 'ASC')
    .fetchAll({withRelated: ['deviceBrewSettings']})
    .then(function (brewPresets) {
        if (!brewPresets) {
            var errStr = "Error getting brew presets for device " + deviceId;
            console.error(errStr);
            res.status(500).json({error: true, data: {message: errStr}});
        }
        else {
            // success! return:
            //     json object containing device presets
            var resJson = [];
            _.forEach(brewPresets.models, function(brewPreset) {
                console.log(brewPreset);
                _.forEach(brewPreset.relations.deviceBrewSettings.models, function(brewPresetSetting) {
                    resJson = _.concat(resJson, {
                        preset_id: brewPreset.attributes.id,
                        preset_name: brewPreset.attributes.dsc,
                        setting_type_id: brewPresetSetting.attributes.preset_setting_type_id,
                        setting_value: brewPresetSetting.attributes.preset_setting_value
                    });
                });
            });
            res.status(200).json({brewPresets: resJson});
        }
    })
    .catch(function (err) {
      console.error("Error getting brew settings for device " + deviceId + " with exception " + err.message);
      res.status(500).json({error: true, data: {message: err.message}});
    });
  }
);

function addPresetSetting(presetId, settingId, settingValue) {
    models.brew_preset_setting.forge({
        brew_preset_id: presetId,
        preset_setting_type_id: settingId,
        preset_setting_value: settingValue
    })
    .save();
}


function addPresetSettings(newPresetSettings, presetId) {
    _.forEach(newPresetSettings, function(setting) {
        //console.log('necessary info: preset id = ' + presetId + ', preset setting type = ' + setting.id);
        models.brew_preset_setting
        .where('brew_preset_id', '=', presetId)
        .where('preset_setting_type_id', '=', setting.id)
        .fetch()
        .then(function(brewSetting) {
            if(!brewSetting) {
                // New setting for device
                addPresetSetting(presetId, setting.id, setting.value)
            } else {
                // Setting already exists for device, update its value
                models.brew_preset_setting.forge({
                    id: brewSetting.attributes.id
                })
                .save({
                    preset_setting_value: setting.value
                });
            }
        })
        .catch(function (err) {
            console.error("Error setting brew preset settings for device " + deviceId + " and preset " + presetId + " with exception " + err.message);
            res.status(500).json({error: false, data: {message: err.message}});
        });
    });
}

module.exports = router;

