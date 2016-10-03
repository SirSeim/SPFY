var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js')); // jshint ignore:line

var service = {
    createClient: function (mysql, payload, callback) {
        Query.createClient(mysql, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    }
};

module.exports = service;
