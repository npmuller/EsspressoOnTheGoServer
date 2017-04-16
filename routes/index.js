// Base Route
var express = require('express');
var router = express.Router();
// Model Routes
var brewSettingRoutes = require('./brewSettingTypes.js');
var coffeeTypeRoutes = require('./coffeeTypes.js');
var deviceRoutes = require('./devices.js');
var presetRoutes = require('./presets.js');
var statusRoutes = require('./status.js');
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
// Brew Settings
router.use('/brewSettingTypes', brewSettingRoutes);
// Coffee Types
router.use('/coffeeTypes', coffeeTypeRoutes);
// Devices
router.use('/devices', deviceRoutes);
// Presets
router.use('/presets', presetRoutes);
// Status
router.use('/status', statusRoutes);
// Users
router.use('/users', userRoutes);

module.exports = router;
