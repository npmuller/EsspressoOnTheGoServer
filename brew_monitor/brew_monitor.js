var _ = require('lodash');
var models = require('../models/models.js')
var collections = require('../models/collections.js')

var ish = true;
while(ish) {
    console.info('Running brew monitor.');
    // Get the brew schedule for all devices
    var scheduleSetting = models.device_setting.forge({
         brew_setting_type_id: 3
    });
    collections.DeviceBrewSettings.forge([scheduleSetting])
    .fetch()
    .then(function(settings) {
        _.each(settings, function(setting) {
            console.info(setting);
        });
    }).catch(function(ex) {
        console.error("Error getting brew schedules for scheduling.");
    });
    ish = false;
}

