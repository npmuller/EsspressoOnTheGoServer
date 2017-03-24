var Schema = {
  brew_setting_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 255, nullable: false},
    device_type_id: {type: 'integer', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  coffee_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  device: {
    id: {type: 'increments', nullable: false, primary: true},
    device_identifier: {type: 'string', maxLength: 30, nullable: false},
    wifi_mac_address: {type: 'string', maxLength: 20, nullable: false},
    device_type_id: {type: 'integer', nullable: false},
    user_id: {type: 'integer', nullable: true},
    firmware_version_id: {type: 'integer', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  device_brew_setting: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id:  {type: 'integer', nullable: false},
    brew_setting_type_id: {type: 'integer', nullable: false},
    brew_setting_value: {type: 'string', maxLength: 30, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  device_firmware_history: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id: {type: 'integer', nullable: false},
    firmware_id: {type: 'integer', nullable: false},
    device_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  device_notification_setting: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id: {type: 'integer', nullable: false},
    notification_type_id: {type: 'integer', nullable: false},
    enabled: {type: 'bit', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  device_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  device_user: {
    device_id: {type: 'integer', nullable: false},
    user_id: {type: 'integer', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  firmware: {
    id: {type: 'increments', nullable: false, primary: true},
    version_number: {type: 'string', maxLength: 10, nullable: false},
    file_path: {type: 'string', maxLength: 45, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  geofence: {
    id: {type: 'increments', nullable: false, primary: true},
    center_lat: {type: 'double', nullable: false},
    center_lon: {type: 'double', nullable: false},
    radius_ft: {type: 'integer', nullable: false},
    device_id: {type: 'integer', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  location_status: {
    device_id: {type: 'integer', nullable: false, primary: true},
    latitude: {type: 'double', nullable: false},
    longitude: {type: 'double', nullable: false},
    status_id: {type: 'integer', nullable: false},
    report_ts: {type: 'dateTime', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  location_status_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  notification_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  setting: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 40, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    first_name: {type: 'string', maxLength: 50, nullable: false},
    last_name: {type: 'string', maxLength: 50, nullable: false},
    username: {type: 'string', maxLength: 50, unique: true, nullable: false},
    password: {type: 'string', maxLength: 300, nullable: false},
    email_address: {type: 'string', maxLength: 100, unique: true, nullable: false},
    user_session_active: {type: 'bit', nullable: true},
    user_created_ts: {type: 'dateTime', nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  },
  
  user_session: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false},
    session_key: {type: 'string', maxLength: 255, nullable: false},
    last_updated_ts: {type: 'dateTime', nullable: false}
  }
};

module.exports = Schema;