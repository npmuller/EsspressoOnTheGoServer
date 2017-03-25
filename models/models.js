var bookshelf = require('../database/database.js');

var BrewSettingType = bookshelf.Model.extend({
  tableName: 'brew_setting_type'
});

var CoffeeType = bookshelf.Model.extend({
  tableName: 'coffee_type'
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
  }
});

var DeviceBrewSetting = bookshelf.Model.extend({
  tableName: 'device_brew_setting',
  setting_type: function() {
    return this.belongsTo(BrewSettingType, 'brew_setting_type_id');
  }
});

var DeviceNotificationSetting = bookshelf.Model.extend({
  tableName: 'device_notification_setting',
  setting_type: function() {
    return this.belongsTo(NotificationType, 'notification_type_id');
  }
});

var DeviceUser = bookshelf.Model.extend({
  tableName: 'device_user',
  users: function() {
    return this.belongsToMany(Users);
  }
});

var Geofence = bookshelf.Model.extend({
  tableName: 'geofence'
});

var LocationStatus = bookshelf.Model.extend({
  tableName: 'location_status'
});

var NotificationType = bookshelf.Model.extend({
  tableName: 'notification_type'
});

var Users = bookshelf.Model.extend({
  tableName: 'users',
  devices: function() {
    return this.belongsToMany(Device);
  }
});

var UserSession = bookshelf.Model.extend({
  tableName: 'user_session',
  user: function() {
    return this.belongsTo(Users, 'user_id');
  }
});

module.exports = {
  coffee_type: CoffeeType,
  device: Device,
  device_setting: DeviceBrewSetting,
  device_user: DeviceUser,
  geofence: Geofence,
  location_status: LocationStatus,
  notification_settings: DeviceNotificationSetting,
  notification_type: NotificationType,
  users: Users,
  user_session: UserSession
};
