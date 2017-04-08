DELIMITER //
create procedure spEotgSetBrewEnable(in brewEnable int)
begin
     update device_brew_setting
     set brew_setting_value = convert(brewEnable, char(30))
     where brew_setting_type_id = 5;
end
//

DELIMITER ;
