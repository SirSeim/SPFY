var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));
var Schema = require(Path.join(__dirname, '../api/schema.js')); // eslint-disable-line
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'spfyuser',
    password: 'E77PyP8P9LwwpPuB6pPixCw73vf3amVV',
    host: 'localhost',
    port: '5432',
    database: 'spfy',
    ssl: false,
    max: 20,
    min: 4
});
/* ajax calls from frontend js files use the path properties
    Example:
    $.ajax({
        url: "api/casemanagers",
        data: data,
        method: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
*/
// details of route format of method, path, handler
// can found in Hapi Routing documentation
var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) { // request and reply come from Hapi package
            reply({
                'hello': 'Welcome to the SPFY webapp!'
            }).code(200);
        }
    },
    {
        method: 'POST',
        path: '/createclient',
        handler: Api.createClient
    },
    {
        method: 'GET',
        path: '/casemanagers',
        handler: Api.getAllCaseManagers // this goes to api/api.js
    },

    {
        method: 'POST',
        path: '/getclient',
        handler: Api.getClient
    }
];

// api in this case is a plugin run by the Hapi node package
// each plugin has a register method
module.exports.register = function (server, options, next) {
    server.route(apiRoutes);
    next(); // method called when plugin has completed steps
};


module.exports.register.attributes = {
    name: "api",
    version: "0.0.0"
};
