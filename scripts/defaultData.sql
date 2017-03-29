-- coffee types
insert into coffee_type values (1, 'Dark Roast', now(), now()),(2, 'Medium', now(), now()),(3, 'Blonde', now(), now());

-- device types
insert into device_type values (1, 'Espresso Machine', now(), now()), (2, 'Android Device', now(), now());
 
-- software versions
insert into software values (1, '0.0.1', '/software/android/0.0.1', now(), now()), (2, '0.0.1', '/software/eotgFirmware/0.0.1', now(), now());
 
-- brew setting types
insert into brew_setting_type values (1, 'Temperature', 2, now(), now()),(2, 'Pressure', 2, now(), now()),(3, 'Brew Schedule', 1, now(), now()),(4, 'Brew Length', 2, now(), now()), (5, 'Brew Time', 1, now(), now());
 
-- test devices
insert into device values (1, '34B26F2352522DE', 'FF:AF:33:FF:EA:98:4F:8A', 2, null, 1, now(), now()), (2, '00000', 'A3:AF:33:A4:5A:98:BF:88', 1, null, 2, now(), now());
 
-- test brew settings
insert into device_brew_setting values (1, 1, 3, 'M0655,W0630,Sa0800,Su0800', now(), now()), (2, 1, 1, '185', now(), now()), (3, 1, 5, '1490804235', now(), now());