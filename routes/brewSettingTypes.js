var express = require('express');
var router = express.Router();
var collections = require('../models/collections.js');

// Get All Coffee Types
router.route('/').get(function (req, res) {
  console.log('got request for brew setting types!');
  collections.BrewSettingTypes.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .catch(function (err) {
    console.error('Error getting brew setting types! ' + err.message);
    res.status(500).json({error: true, data: {message: err.message}});
  });
});