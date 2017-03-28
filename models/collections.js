var bookshelf = require('../database/database.js');
var models = require('./models.js');

// Brew Setting Types
var BrewSettingTypes = bookshelf.Collection.extend({
  model: models.brew_setting_type
});

// Coffee Types
var CoffeeTypes = bookshelf.Collection.extend({
  model: models.coffee_type
});

// Device brew settings
var DeviceBrewSettings = bookshelf.Collection.extend({
  model: models.device_setting
});

module.exports = {
  BrewSettingTypes: BrewSettingTypes,
  CoffeeTypes: CoffeeTypes,
  DeviceBrewSettings: DeviceBrewSettings
};