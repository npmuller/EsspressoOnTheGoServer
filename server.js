"use strict";

var lodash = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

// Set up connection
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env];
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : config.username,
    password : config.password,
    database : config.database,
    charset  : 'utf8'
  }
});

// Instantiate Bookshelf using connection
var bookshelf = require('bookshelf')(knex);

// Instantiate router
var app = express();
var router = express.Router();

// Set up request parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up base route
app.use('/api/eotg', router);

// Start the server
app.listen(config.port, function() {
  console.log('EOTG API listening on port %d', config.port);
});

module.exports = {
  app: app,
  router: router,
  bookshelf: bookshelf,
  lodash: lodash
}