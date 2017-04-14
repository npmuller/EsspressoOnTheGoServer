var express = require('express');
var router = express.Router();
var collections = require('../models/collections.js');
var models = require('../models/models.js');

// Get All Coffee Types
router.route('/').get(function (req, res) {
    res.json({message: 'getCoffeeTypes is deprecated.  Please use preset methods instead.'});
});

// Get 1 coffee type
router.route('/:id').get(function(req, res) {
    res.json({message: 'getCoffeeTypes is deprecated.  Please use preset methods instead.'});
});

module.exports = router;
