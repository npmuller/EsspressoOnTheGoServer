var express = require('express');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Get every user associated with a device
router.route('/getDeviceUsers/:deviceId').get(function (req, res) {
  console.log('got request for device users!');
  
});

module.exports = router;