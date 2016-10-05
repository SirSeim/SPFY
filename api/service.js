var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js')); // jshint ignore:line

var service = {
    createClient: function (postgres, payload, callback) {
        Query.createClient(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    }
};

module.exports = service;
