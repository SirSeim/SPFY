var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));
var Schema = require(Path.join(__dirname, '../api/schema.js'));

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
        path: '/clients',
        handler: Api.createClient
    },
    {
        method: 'GET',
        path: '/casemanagers',
        handler: Api.getAllCaseManagers // this goes to api/api.js
    },
    {
        method: 'GET',
        path: '/clients/{client}',
        handler: Api.getClient
    },
    {
        method: 'GET',
        path: '/clients',
        handler: Api.getClients
    },
    {
        method: 'POST',
        path: '/dropins',
        handler: Api.createDropIn
    },
    {
        method: 'GET',
        path: '/dropins',
        handler: Api.getDropIns
    },
    {
        method: 'GET',
        path: '/dropins/{dropin}',
        handler: Api.getDropIn
    },
    {
        method: 'GET',
        path: '/dropins/{dropin}/activities',
        handler: Api.getDropinActivities
    },
    {
        method: 'POST',
        path: '/enroll',
        handler: Api.enroll
    },
    {
        method: 'POST',
        path: '/checkin',
        handler: Api.checkin
    },
    {
        method: 'POST',
        path: '/activities',
        handler: Api.createDropinActivities
    },
    {
        method: 'GET',
        path: '/clients/search',
        handler: Api.dataBrowserGetClients
    },
    {
        method: 'GET',
        path: '/clients/search/{data}',
        handler: Api.dataBrowserSearchClients
    },
    {
        method: 'POST',
        path: "/activity",
        handler: Api.createActivity
    },
    {
        method: 'POST',
        path: "/editactivity",
        handler: Api.editActivity
    },
    {
        method: 'POST',
        path: '/clients/{clientID}',
        handler: Api.editClient
    },
    {
        method: 'GET',
        path: '/users',
        handler: Api.getUserList
    },
    {
        method: 'POST',
        path: '/users',
        config: {
            validate: {
                payload: Schema.newUser
            }
        },
        handler: Api.createUser
    },
    {
        method: 'POST',
        path: '/sessions',
        config: {
            auth: false,
            validate: {
                payload: Schema.login
            }
        },
        handler: Api.login
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
