DELIMITER //
drop procedure spEotgSetBrewEnable;
create procedure spEotgSetBrewEnable(in brewEnable int)
begin
     if ((select current_state from device_status where device_id = 13) != 'background') and ((select ac_power_state from device_status where device_id = 13) != 0) then
         update device_brew_setting
         set brew_setting_value = convert(brewEnable, char(30))
         where brew_setting_type_id = 5;
     end if;
end
//

DELIMITER ;
