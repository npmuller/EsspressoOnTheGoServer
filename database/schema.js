var Schema = {
  
  brew_preset: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id: {type: 'integer', nullable: false},
    dsc: {type: 'string', nullable: false},
    enabled: {type: 'bit', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },

  brew_preset_setting: {
    id: {type: 'increments', nullable: false, primary: true},
    brew_preset_id: {type: 'integer', nullable: false},
    preset_setting_type_id: {type: 'integer', nullable: false},
    preset_setting_value: {type: 'string', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },

  brew_setting_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 255, nullable: false},
    device_type_id: {type: 'integer', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  coffee_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device: {
    id: {type: 'increments', nullable: false, primary: true},
    device_identifier: {type: 'string', maxLength: 30, nullable: false},
    wifi_mac_address: {type: 'string', maxLength: 20, nullable: false},
    device_type_id: {type: 'integer', nullable: false},
    user_id: {type: 'integer', nullable: true},
    software_version_id: {type: 'integer', defaultTo: 1, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device_brew_setting: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id:  {type: 'integer', nullable: false},
    brew_setting_type_id: {type: 'integer', nullable: false},
    brew_setting_value: {type: 'string', maxLength: 30, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device_notification_setting: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id: {type: 'integer', nullable: false},
    notification_type_id: {type: 'integer', nullable: false},
    enabled: {type: 'bit', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device_software_history: {
    id: {type: 'increments', nullable: false, primary: true},
    device_id: {type: 'integer', nullable: false},
    software_id: {type: 'integer', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device_status: {
    device_id: {type: 'integer', nullable: false, primary: true},
    battery_level: {type: 'string', nullable: false},
    water_level: {type: 'string', nullable: false},
    current_state: {type: 'string', nullable: true},
    ac_power_state: {type: 'tinyint', nullable: false},
    brew_preset_id: {type: 'integer', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  device_user: {
    device_id: {type: 'integer', nullable: false},
    user_id: {type: 'integer', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  geofence: {
    id: {type: 'increments', nullable: false, primary: true},
    center_lat: {type: 'double', nullable: false},
    center_lon: {type: 'double', nullable: false},
    radius_ft: {type: 'integer', nullable: false},
    device_id: {type: 'integer', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  location_status: {
    device_id: {type: 'integer', nullable: false, primary: true},
    latitude: {type: 'double', nullable: false},
    longitude: {type: 'double', nullable: false},
    status_id: {type: 'integer', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  location_status_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  notification_type: {
    id: {type: 'increments', nullable: false, primary: true},
    dsc: {type: 'string', maxLength: 50, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  software: {
    id: {type: 'increments', nullable: false, primary: true},
    version_number: {type: 'string', maxLength: 10, nullable: false},
    file_path: {type: 'string', maxLength: 45, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    first_name: {type: 'string', maxLength: 50, nullable: false},
    last_name: {type: 'string', maxLength: 50, nullable: false},
    username: {type: 'string', maxLength: 50, unique: true, nullable: false},
    password: {type: 'string', maxLength: 300, nullable: false},
    email_address: {type: 'string', maxLength: 100, unique: true, nullable: false},
    user_session_active: {type: 'bit', nullable: true},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  
  user_session: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false},
    session_key: {type: 'string', maxLength: 255, nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  }
};

module.exports = Schema;
