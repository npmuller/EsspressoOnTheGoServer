var bookshelf = require('../database/database.js');
var models = require('./models.js');

// Coffee Types
var CoffeeTypes = bookshelf.Collection.extend({
    model: models.coffee_type
});

module.exports = {
    CoffeeTypes: CoffeeTypes
};