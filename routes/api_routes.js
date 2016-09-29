var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js')); // jshint ignore:line
var Schema = require(Path.join(__dirname, '../api/schema.js')); // jshint ignore:line

var apiRoutes = [
    {
        method: 'GET',
        path: '/api/hello',
        handler: function (req, res) {
            res({
                'hello': 'Welcome to the SPFY webapp!'
            }).code(200);
        }
    }
];

module.exports.register = function (server, options, next) {
    server.route(apiRoutes);
    next();
};

module.exports.register.attributes = {
    name: "api",
    version: "0.0.0"
};
