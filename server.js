"use strict";

var lodash = require('lodash');
var express = require('express');
var routes = require('./routes/index.js');

// Get config values
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];

// Instantiate app
var app = express();

// Set up routing
app.use('/eotg/api', routes);

// Disable the x-powered-by header for security
app.disable('x-powered-by');

// Start the server
app.listen(config.port, function() {
  console.log('EOTG API listening on port %d', config.port);
});

module.exports = lodash;
