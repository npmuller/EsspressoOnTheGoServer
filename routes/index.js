// Base Route
var express = require('express');
var router = express.Router();
// Model Routes
var coffeeTypeRoutes = require('./coffeeTypes.js');


// Log every incoming request
router.use(function(req, res, next) {
  console.log('method: %s, url: %s, path: %s', req.method, req.url, req.path);
  next();
});

// Coffee Types
router.use('/coffeeTypes', coffeeTypeRoutes);

module.exports = router;
