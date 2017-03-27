-- coffee types
insert into coffee_type values (1, 'Dark Roast', now()),(2, 'Medium', now()),(3, 'Blonde', now());

-- device types
 insert into device_type values (1, 'Espresso Machine', now()), (2, 'Android Device', now());
 
 -- software versions
 insert into software values (1, '0.0.1', '/software/android/0.0.1', now());
 
 -- brew setting types
 insert into brew_setting_type values (1,'Temperature',2,now(),now()),(2,'Pressure',2,now(),now()),(3,'Brew Time',1,now(),now());