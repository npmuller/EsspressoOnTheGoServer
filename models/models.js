var bookshelf = require('../database/database.js').bookshelf;
var _ = require('lodash');

var BrewPreset = bookshelf.Model.extend({
    tableName: 'brew_preset',
    deviceBrewSettings: function() {
      return this.hasMany(BrewPresetSetting);
    },
    orderBy: function (column, order) {
        return this.query(function (qb) {
            qb.orderBy(column, order);
        });
    },
    hasTimestamps: true
});

var BrewPresetSetting = bookshelf.Model.extend({
    tableName: 'brew_preset_setting',
    hasTimestamps: true
});

var BrewSettingType = bookshelf.Model.extend({
  tableName: 'brew_setting_type',
  deviceBrewSettings: function() {
    return this.hasMany(DeviceBrewSetting, 'id');
  },
  hasTimestamps: true
});

var CoffeeType = bookshelf.Model.extend({
  tableName: 'coffee_type',
  hasTimestamps: true
});

var Device = bookshelf.Model.extend({
  tableName: 'device',
  deviceBrewSettings: function() {
    return this.hasMany(DeviceBrewSetting, 'device_id');
  },
  geofences: function() {
    return this.hasMany(Geofence, 'device_id');
  },
  deviceNotificationSettings: function() {
    return this.hasMany(DeviceNotificationSetting, 'device_id');
  },
  deviceUsers: function() {
    return this.hasMany(DeviceUser, 'device_id');
  },
  initialize: function() {
    this.on('saving', this._assertDeviceIdentifierUnique);
  },
  _assertDeviceIdentifierUnique: function(model, attributes, options) {
    if (this.hasChanged('device_identifier')) {
      return Device
        .query('where', 'device_identifier', this.get('device_identifier'))
        .fetch(_.pick(options || {}, 'transacting'))
        .then(function(existing) {
          if (existing) {
            console.info('Trying to register ' + existing.attributes.device_identifier + ', already exists!');
            throw new Error('deviceId ' + existing.attributes.id);
          }
        });
    }
  },
  hasTimestamps: true
});

var DeviceBrewSetting = bookshelf.Model.extend({
  tableName: 'device_brew_setting',
  setting_type: function() {
    return this.belongsTo(BrewSettingType, 'brew_setting_type_id');
  },
  device: function() {
    return this.belongsTo(Device, 'device_id');
  },
  hasTimestamps: true
});

var DeviceNotificationSetting = bookshelf.Model.extend({
  tableName: 'device_notification_setting',
  setting_type: function() {
    return this.belongsTo(NotificationType, 'notification_type_id');
  },
  hasTimestamps: true
});

var DeviceStatus = bookshelf.Model.extend({
    tableName: 'device_status',
    idAttribute: 'device_id',
    hasTimestamps: true
});

var DeviceSoftwareHistory = bookshelf.Model.extend({
  tableName: 'device_software_history',
  hasTimestamps: true
});

var DeviceType = bookshelf.Model.extend({
  tableName: 'device_type',
  hasTimestamps: true
});

var DeviceUser = bookshelf.Model.extend({
  tableName: 'device_user',
  users: function() {
    return this.belongsToMany(Users);
  },
  hasTimestamps: true
});

var Geofence = bookshelf.Model.extend({
  tableName: 'geofence',
  hasTimestamps: true
});

var LocationStatus = bookshelf.Model.extend({
  tableName: 'location_status',
  hasTimestamps: true
});

var LocationStatusType = bookshelf.Model.extend({
  tableName: 'location_status_type',
  hasTimestamps: true
});

var NotificationType = bookshelf.Model.extend({
  tableName: 'notification_type',
  hasTimestamps: true
});

var Software = bookshelf.Model.extend({
  tableName: 'software',
  hasTimestamps: true
});

// TODO : ensure unique-ness of users
var Users = bookshelf.Model.extend({
  tableName: 'users',
  devices: function() {
    return this.belongsToMany(Device);
  },
  hasTimestamps: true
});

var UserSession = bookshelf.Model.extend({
  tableName: 'user_session',
  user: function() {
    return this.belongsTo(Users, 'user_id');
  },
  hasTimestamps: true
});

module.exports = {
  brew_preset: BrewPreset,
  brew_preset_setting: BrewPresetSetting,
  brew_setting_type: BrewSettingType,
  coffee_type: CoffeeType,
  device: Device,
  device_setting: DeviceBrewSetting,
  device_software_history: DeviceSoftwareHistory,
  device_status: DeviceStatus,
  device_type: DeviceType,
  device_user: DeviceUser,
  geofence: Geofence,
  location_status: LocationStatus,
  location_status_type: LocationStatusType,
  notification_settings: DeviceNotificationSetting,
  notification_type: NotificationType,
  software: Software,
  users: Users,
  user_session: UserSession
};
