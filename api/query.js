var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js')); // eslint-disable-line

var parseProperty = function(property) {
    if (typeof property === 'boolean') {
        property = property === true ? '1' : '0';
    }
    if (property === undefined) {
        property = 'null';
    }
    property = mysql.escape(property); // eslint-disable-line
    return property;
};

var query = {
    createClient: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createClient(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    createProfile: function (postgres, payload, callback) {
        var queryString = 'CALL spfy.insert_profile(';

        queryString += parseProperty(payload.username) + ',';
        queryString += parseProperty(payload.password) + ',';
        queryString += parseProperty(payload.firstName) + ',';
        queryString += parseProperty(payload.lastName) + ',';
        queryString += parseProperty(payload.position);

        queryString += ')';

        mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
            if (err) {
                return callback(err);
            }
            callback(undefined, rows);
        }); 
    },
    getCaseManagerClients: function (postgres, payload, callback) {
        var queryString = 'CALL spfy.get_case_manager_clients(';

        queryString += parseProperty(payload.caseManagerID) + ')';

        mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
            if (err) {
                return callback(err);
            }
            callback(undefined, rows);
        });
    },
    searchCaseManagerClients: function (postgres, payload, callback) {
        var queryString = 'CALL spfy.search_case_manager_clients(';

        queryString += parseProperty(payload.caseManagerID) + ',';
        queryString += parseProperty(payload.clientID) + ')';

        mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
            if (err) {
                return callback(err);
            }
            callback(undefined, rows);
        });
    }
};

module.exports = query;
