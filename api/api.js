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

    getClient: function (request, reply) {
        Service.getClient(request.postgres, request.params.client, function (err, result) {
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
    },
    checkin: function (request, reply) {
        Service.checkin(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCheckIn(reply, err);
            } else {
                Respond.checkin(reply, result);
            }
        });
    },
    dataBrowserGetClients: function (request, reply) {
        Service.dataBrowserGetClients(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetClients(reply, err);
            } else {
                Respond.dataBrowserGetClients(reply, result);
            }
        });
    },
    dataBrowserSearchClients: function (request, reply) {
        var data = JSON.parse(request.params.data);
        console.log(data);
        Service.dataBrowserSearchClients(request.postgres, data, function (err, result) {
            if (err) {
                Respond.failedToGetClient(reply, err);
            } else {
                Respond.dataBrowserSearchClients(reply, result);
            }
        });
    },

    editClient: function (request, reply) {
        Service.editClient(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEditClient(reply, err);
            } else {
                Respond.editClient(reply, result);
            }
        });
    },

    dataBrowserGetClients: function (request, reply) {
        Service.dataBrowserGetClients(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetClients(reply, err);
            } else {
                Respond.dataBrowserGetClients(reply, result);
            }
        });
    },
    dataBrowserSearchClients: function (request, reply) {
        var data = JSON.parse(request.params.data);
        console.log(data);
        Service.dataBrowserSearchClients(request.postgres, data, function (err, result) {
            if (err) {
                Respond.failedToGetClient(reply, err);
            } else {
                Respond.dataBrowserSearchClients(reply, result);
            }
        });
    }
 };


module.exports = api;
