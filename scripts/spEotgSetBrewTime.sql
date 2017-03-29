DELIMITER //
create procedure spEotgSetBrewTime()
begin
     update device_brew_setting
     set brew_setting_value = convert(UNIX_TIMESTAMP(), char(30))
     where brew_setting_type_id = 5;
end
//

DELIMITER ;