var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));

// these functions get called from routes/api_routes.js
var api = {
    // Where do request and reply come from?
    // request - object with details of end user's request (path, payload, auth info, . . .)
    // reply - method used to repond to the request
    // reply() is an interface that come from Hapi, and Hapi doesn't seem to provide
    // the implementation for it, we just have to know that it sends a reply
    // back to the frontend containing the data, so calling reply(data) will
    // send data as a JSON back to the frontend
    createClient: function (request, reply) {
        Service.createClient(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateClient(reply, err);
            } else {
                Respond.createdClient(reply, result);
            }
        });
    },

    getAllCaseManagers: function (request, reply) {
        // this is the getAllCaseManagers() one level deeper in service.js
        Service.getAllCaseManagers(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToGetAllCaseManagers(reply, err);
            } else {
                Respond.getAllCaseManagers(reply, result);
            }
        });
    },

    getClients: function (request, reply) {
        
    }
};

module.exports = api;
