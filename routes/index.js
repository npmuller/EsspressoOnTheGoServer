// Base Route
var express = require('express');
var router = express.Router();
// Model Routes
var brewSettingRoutes = require('./brewSettingTypes.js');
var coffeeTypeRoutes = require('./coffeeTypes.js');
var deviceRoutes = require('./devices.js');
var userRoutes = require('./users.js');


// Log every incoming request
router.use(function(req, res, next) {
  console.log('method: %s, url: %s, path: %s', req.method, req.url, req.path);
  next();
});

/********************************************************
 * 
 * Route Definitions
 * 
 *******************************************************/ 
   // TODO : slim down all responses to ONLY necessary data
// Brew Settings
router.use('/brewSettingTypes', brewSettingRoutes);
// Coffee Types
router.use('/coffeeTypes', coffeeTypeRoutes);
// Users
router.use('/users', userRoutes);
// Devices
router.use('/devices', deviceRoutes);

module.exports = router;
