var _ = require('lodash');
var models = require('../models/models.js')

var BREW_SCHEDULE_MONITOR_INTERVAL = 60000; 

// TODO : make this work for more than one device
async function runMonitor() {
    var shouldRun = true;
    while(shouldRun) {
        console.info('Running brew monitor.');
        // Get the brew schedule for all devices
        models.device_setting.forge().where({brew_setting_type_id: '3'})
        .fetch()
        .then(function(settings) {
            console.info('looping thru settings!!');
            var currentDateTime = new Date();
            var currentDayOfWeek = currentDateTime.getDay();
            var currentHours = currentDateTime.getHours();
            var currentMin = currentDateTime.getMinutes();
            var currentTime = currentHours + currentMin;
            var currentTimeStr = currentTime.toString();
            while(currentTimeStr.length < 4) {
                currentTimeStr = '0' + currentTimeStr;
            }
            var scheduleFormat = currentDayOfWeek + ':' + currentTimeStr;
            if(!settings[0]) { var tmp = settings; settings = [tmp]; }
            _.forEach(settings, function(setting) {
                var brewSchedule = setting.attributes.brew_setting_value;
                _.each(brewSchedule.split(','), function(item) {
                    // {0-6}:{TTTT}
                    if(item == scheduleFormat) {
                        // Set the brew bit to true
                        knex.raw('call spEotgSetBrewEnable(1);').then(function() {
                            console.info('successfully enabled brew on schedule!');
                        })
                        .catch(function(ex) {
                            console.error('Error running brew monitor when trying to set shouldBrew bit: ' + ex.message);
                        });
                    }
                });  
            });
        }).catch(function(ex) {
            console.error("Error getting brew schedules for scheduling: " + ex);
        });
        
        await sleep(BREW_SCHEDULE_MONITOR_INTERVAL); 
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

runMonitor();
//shouldRun = false;

