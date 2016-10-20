var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js'));

var service = {
    createClient: function (postgres, payload, callback) {
        Query.createClient(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    // This gets called in api.js by the Service module
    getAllCaseManagers: function (postgres, payload, callback) {
        Query.getAllCaseManagers(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getClient: function (postgres, clientID, callback) {
        Query.getClient(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    searchClient: function (postgres, firstName, lastName, callback) {
        Query.searchClient(postgres, firstName, lastName, function(err, result){
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    firstName: local.first_name,
                    lastName: local.last_name
                });
            }

            return callback(undefined, arr);
        });
    },

    getClients: function (postgres, callback) {
        Query.getClients(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    firstName: local.first_name,
                    lastName: local.last_name
                });
            }
            return callback(undefined, arr);
        });
    },

    getDropIns: function (postgres, callback) {
        Query.getDropIns(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    date: local.date
                });
            }
            return callback(undefined, arr);
        });
    },

    getDropIn: function (postgres, dropin, callback) {
        Query.getDropIn(postgres, dropin, function (err, result) {
            if (err) {
                return callback(err);
            }
            var local = result.rows[0];
            return callback(undefined, {
                id: local.id,
                date: local.date
            });
        });
    },

    getDropinActivities: function (postgres, dropin, callback) {
        Query.getDropinActivities(postgres, dropin, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },
    enroll: function (postgres, payload, callback) {
        Query.enroll(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    }
};

module.exports = service;
