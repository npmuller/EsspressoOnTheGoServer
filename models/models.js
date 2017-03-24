var CoffeeType = bookshelf.Model.Extend({
  tableName: 'coffee_type'
});

var BrewSettingType = bookshelf.Model.Extend({
  tableName: 'brew_setting_type'
});

var Device = bookshelf.Model.Extend({
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

var DeviceBrewSetting = bookshelf.Model.Extend({
  tableName: 'device_brew_setting',
  setting_type: function() {
    return this.belongsTo(BrewSettingType, 'brew_setting_type_id');
  }
});

var DeviceNotificationSetting = bookshelf.Model.Extend({
  tableName: 'device_notification_setting',
  setting_type: function() {
    return this.belongsTo(NotificationType, 'notification_type_id');
  }
});

var DeviceUser = bookshelf.Model.Extend({
  tableName: 'device_user',
  users: function() {
    return this.belongsToMany(Users);
  }
});

var Geofence = bookshelf.Model.Extend({
  tableName: 'geofence'
});

var LocationStatus = bookshelf.Model.Extend({
  tableName: 'location_status'
});

var NotificationType = bookshelf.Model.Extend({
  tableName: 'notification_type'
});

var Users = bookshelf.Model.Extend({
  tableName: 'users',
  devices: function() {
    return this.belongsToMany(Device);
  }
});

var UserSession = bookshelf.Model.Extend({
  tableName: 'user_session',
  user: function() {
    return this.belongsTo(User, 'user_id');
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
