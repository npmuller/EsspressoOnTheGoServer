var _ = require('lodash');
var models = require('../models/models.js')

var shouldRun = true;
// TODO : make this work for more than one device
while(shouldRun) {
    console.info('Running brew monitor.');
    // Get the brew schedule for all devices
    models.device_setting.forge().where({brew_setting_type_id: '3'})
    .fetch()
    .then(function(settings) {
        console.log(settings);
        var currentDateTime = 
        var brewSchedule = settings.attributes.brew_setting_value;
        _.each(brewSchedule.split(','), function(item) {
            // {0-6}:{TTTT}
            
        });
    }).catch(function(ex) {
        console.error("Error getting brew schedules for scheduling: " + ex);
    });
    shouldRun = false;
}

