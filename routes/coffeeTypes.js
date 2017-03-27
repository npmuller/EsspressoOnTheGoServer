var express = require('express');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Get All Coffee Types
router.route('/').get(function (req, res) {
  console.log('got request for coffee types!');
  collections.CoffeeTypes.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .catch(function (err) {
    console.error('Error getting coffee types! ' + err.message);
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// Get 1 coffee type
router.route('/:id').get(function(req, res) {
  var coffeeTypeId = req.params.id;
  console.log('got request for coffee type id ' + coffeeTypeId);
  models.coffee_type.forge({id: coffeeTypeId})
  .fetch()
  .then(function (coffeeType) {
    if (!coffeeType) {
      console.error('Error getting coffee type ' + coffeeTypeId);
      res.status(404).json({error: true, data: {}});
    }
    else {
      res.json({error: false, data: coffeeType.toJSON()});
    }
  })
  .catch(function (err) {
    console.error('Error getting coffee type ' + coffeeTypeId + ', ' + err.message);
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;