var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js')); // jshint ignore:line

var query = {
    getEvent: function() {
        connection.query(Queries.getEvent(), function(err, rows, fields) {
            if (err) {
                throw err;
            }
        });
    },
    createClient: function (mysql, payload, callback) {
        mysql.query(Queries.createClient(payload), function (err, rows, fields) {
            if (err) {
                return callback(err);
            }
            callback(undefined, rows);
        });
    }
};

module.exports = query;