var bookshelf = require('../database/database.js');
var models = require('./models.js');

// Coffee Types
var CoffeeTypes = bookshelf.Collection.extend({
    model: models.coffee_type
});

// Device brew settings
var DeviceBrewSettings = bookshelf.Collection.extend({
    model: models.device_setting
});

module.exports = {
    CoffeeTypes: CoffeeTypes,
    DeviceBrewSettings: DeviceBrewSettings
};