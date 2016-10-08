var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));
var Schema = require(Path.join(__dirname, '../api/schema.js')); // eslint-disable-line

var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (req, res) {
            res({
                'hello': 'Welcome to the SPFY webapp!'
            }).code(200);
        }
    },
    {
        method: 'POST',
        path: '/client',
        handler: Api.createClient
    },
    {
        method: 'GET',
        path: '/casemanagers',
        handler: Api.getAllCaseManagers
    },

];

module.exports.register = function (server, options, next) {
    server.route(apiRoutes);
    next();
};

module.exports.register.attributes = {
    name: "api",
    version: "0.0.0"
};
