var _ = require('lodash');
var models = require('../models/models.js');
var knex = require('../database/database.js').knex;

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
            //console.log('looping thru settings!!');
            var currentDateTime = new Date();
            var currentDayOfWeek = currentDateTime.getDay();
            var currentHours = currentDateTime.getHours().toString();
            var currentMin = currentDateTime.getMinutes().toString();
            if(currentHours.length < 2) {
                currentHours = '0' + currentHours;
            }
            if(currentMin.length < 2) {
                currentMin = '0' + currentMin;
            }
            var currentTime = currentHours + currentMin;
            var scheduleFormat = currentDayOfWeek + ':' + currentTime;
            if(!settings[0]) { var tmp = settings; settings = [tmp]; }
            var shouldLoop = true;
            _.forEach(settings, function(setting) {
                var brewSchedule = setting.attributes.brew_setting_value;
                _.each(brewSchedule.split(','), function(item) {
                    // {0-6}:{TTTT}
                    if(item == scheduleFormat) {
                        // Set the brew bit to true
                        knex.raw('call spEotgSetBrewEnable(1);').then(function() {
                            console.info('successfully enabled brew on schedule!');
                            shouldLoop = false;
                            return false;
                        })
                        .catch(function(ex) {
                            console.error('Error running brew monitor when trying to set shouldBrew bit: ' + ex.message);
                        });
                    }
                });
                if(!shouldLoop) { return false; }  
            });
        }).catch(function(ex) {
            console.error("Error getting brew schedules for scheduling: " + ex);
        });
        console.info('Sleeping for ' + BREW_SCHEDULE_MONITOR_INTERVAL/1000 + ' seconds.');
        await sleep(BREW_SCHEDULE_MONITOR_INTERVAL); 
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

runMonitor();
//shouldRun = false;

