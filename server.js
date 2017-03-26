"use strict";

var lodash = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

// Get config values
var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];

// Instantiate app
var app = express();

// Set up request parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up routing
app.use('/api/eotg', routes);

// Start the server
app.listen(config.port, function() {
  console.log('EOTG API listening on port %d', config.port);
});

module.exports = lodash;