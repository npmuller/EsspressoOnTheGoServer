// Set up connection
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : config.dburl,
    user     : config.username,
    password : config.password,
    database : config.database,
    charset  : 'utf8'
  }
});

// Instantiate Bookshelf using connection
var bookshelf = require('bookshelf')(knex);

// Export connection
module.exports = {
  bookshelf: bookshelf,
  knex: knex
};
