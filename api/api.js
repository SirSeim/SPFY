var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));
var Queries = require(Path.join(__dirname, 'queries.js'));

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
                var payload = JSON.parse(request.payload.expression);
                Respond.failedToCreateClient(reply, err, Queries.createClient(payload)); // for debugging SQL syntax
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

    getClient: function (request, reply) {
        Service.getClient(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetClient(reply, err);
            } else {
                Respond.getClient(reply, result);
            }
        });
    },

    getClients: function (request, reply) {
        if (request.query.firstName || request.query.lastName) {
            Service.searchClient(request.postgres, request.query.firstName, request.query.lastName, function (err, result) {
                if (err) {
                    Respond.failedToSearchClient(reply, err);
                } else {
                    Respond.searchClient(reply, result);
                }
            });
        } else {
            Service.getClients(request.postgres, function (err, result) {
                if (err) {
                    Respond.failedToGetClients(reply, err);
                } else {
                    Respond.gotClients(reply, result);
                }
            });
        }
    },

    getDropIns: function (request, reply) {
        Service.getDropIns(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetDropIns(reply, err);
            } else {
                Respond.gotDropIns(reply, result);
            }
        });
    },

    getDropIn: function (request, reply) {
        Service.getDropIn(request.postgres, request.params.dropin, function (err, result) {
            if (err) {
                Respond.failedToGetDropIn(reply, err);
            } else {
                Respond.gotDropIns(reply, result);
            }
        });
    },

    getDropinActivities: function (request, reply) {
        Service.getDropinActivities(request.postgres, request.params.dropin, function (err, result) {
            if (err) {
                Respond.failedToGetDropinActivities(reply, err);
            } else {
                Respond.gotDropinActivities(reply, result);
            }
        });
    },
    enroll: function (request, reply) {
        Service.enroll(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEnroll(reply, err);
            } else {
                Respond.enroll(reply, result);
            }
        });
    }
};

module.exports = api;
