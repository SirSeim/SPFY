var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));

var query = {

    // *** use this as standard example ***
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

    // gets called in service.js by Query module
    getAllCaseManagers: function (postgres, payload, callback) {

        // generally, this function and everything in it acquires a client
        // runs a query on the client, and then returns the client to the pool
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err); // this is basically the function that is
                // carried all the way down the pipeline from api.js
                // it is now used at the very bottom
            }

            // retrieves the queryString from getAllCaseManagers function in queries.js
            // err and result are coming from the database response
            // this is where the database connects to the backend, but we don't know
            // what the database is returning
            // query is executed once connection is established and
            // PostgreSQL server is ready for a query
            client.query(Queries.getAllCaseManagers(), function (err, result) {
                done(); // releases the client back to the pool
                if (err) {
                    return callback(err);
                }
                // 'result' contains a property 'rows' which has the returned
                // table rows from the query
                return callback(undefined, result);
                // sending result all the way back up the pipeline
                // eventually gets to respond.js
            });

            /* the 'callback' function above is really

                    function (err, result) {
                        if (err) {
                            Respond.failedToGetAllCaseManagers(reply, err);
                        } else {
                            Respond.getAllCaseManagers(reply, result);
                        }
                    }

                from api.js
            */
        });
    },

    getClient: function (postgres, client, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getClient(client), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    
    searchClient: function (postgres, firstName, lastName, callback) {
        postgres.connect(function (err, client, done){
            if (err) {
                return callback(err);
            }
            client.query(Queries.searchClient(firstName, lastName), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    getClients: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getClients(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropIns: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropIns(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropIn: function (postgres, dropin, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            console.log(Queries.getDropIn(dropin));
            client.query(Queries.getDropIn(dropin), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropinActivities: function (postgres, dropin, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropinActivities(dropin), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getAllActivities: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getAllActivities(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getActivity: function (postgres, activity, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getActivity(activity), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    }
    // getClient: function (postgres, payload, callback) {
    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }

    //         client.query(Queries.getClient(payload), function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },


    // createProfile: function (postgres, payload, callback) {
    //     var queryString = 'CALL spfy.insert_profile(';

    //     queryString += parseProperty(payload.username) + ',';
    //     queryString += parseProperty(payload.password) + ',';
    //     queryString += parseProperty(payload.firstName) + ',';
    //     queryString += parseProperty(payload.lastName) + ',';
    //     queryString += parseProperty(payload.position);

    //     queryString += ')';

    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }

    //         client.query(Queries.createProfile(payload), function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },
    // getCaseManagerClients: function (postgres, payload, callback) {
    //     var queryString = 'CALL spfy.get_case_manager_clients(';

    //     queryString += parseProperty(payload.caseManagerID) + ')';

    //     mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
    //         if (err) {
    //             return callback(err);
    //         }
    //         callback(undefined, rows);
    //     });
    // },
    // searchCaseManagerClients: function (postgres, payload, callback) {
    //     var queryString = 'CALL spfy.search_case_manager_clients(';

    //     queryString += parseProperty(payload.caseManagerID) + ',';
    //     queryString += parseProperty(payload.clientID) + ')';

    //     mysql.query(queryString, function (err, rows, fields) { // eslint-disable-line
    //         if (err) {
    //             return callback(err);
    //         }
    //         callback(undefined, rows);
    //     });
    // }
};

module.exports = query;
