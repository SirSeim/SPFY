var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));

var query = {

    // *** use this as standard example ***
    createClient: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            payload = JSON.parse(payload.expression);
            var data = Queries.createClient(payload);
            // unstringify the data passed in
            client.query(data.string, data.params, function (err, result) {
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


    getClient: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getClient(clientID), function (err, result) {
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

    getLatestDropIns: function (postgres, latest, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getLatestDropIns(latest), function (err, result) {
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
            client.query(Queries.getDropIn(dropin), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createDropIn: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.createDropIn(payload), function (err, result) {
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

    addActivitiesToDropIn: function (postgres, dropinID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.addActivitiesToDropIn(dropinID, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    removeActivitiesFromDropin: function (postgres, dropinID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.removeActivitiesFromDropin(dropinID, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropinActivity: function (postgres, dropinID, activityID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropinActivity(dropinID, activityID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropinActivityEnrollment: function (postgres, dropinID, activityID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropinActivityEnrollment(dropinID, activityID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    addEnrollmentToDropinActivity: function (postgres, dropinID, activityID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.addEnrollmentToDropinActivity(dropinID, activityID, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getDropinEnrollment: function (postgres, dropinID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getDropinEnrollment(dropinID), function (err, result) {
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
    },

    createDropInActivities: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createDropInActivities(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getActivityDropIns: function (postgres, activity, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getActivityDropIns(activity), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createActivity: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            // payload = JSON.parse(payload.expression);
            var data = Queries.createActivity(payload);

            client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editActivity: function(postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editActivity(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    enroll: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            var parsedPayload = JSON.parse(payload.expression);
            client.query(Queries.enroll(parsedPayload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getEnrollmentByActivity: function (postgres, activityID, callback) {
        postgres.connect(function (err, client, done) {
            client.query(Queries.getEnrollmentByActivity(activityID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    removeEnrollmentToDropinActivity: function (postgres, dropinID, activityID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.removeEnrollmentToDropinActivity(dropinID, activityID, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editClient: function(postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.editClient(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    dataBrowserGetClients: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.dataBrowserGetClients(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    dataBrowserSearchClients: function (postgres, data, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.dataBrowserSearchClients(data), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    addCheckinForDropin: function (postgres, dropinID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.addCheckinForDropin(dropinID, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    removeCheckinForDropin: function (postgres, dropinID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.removeCheckinForDropin(dropinID, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createCaseNote: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createCaseNote(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getCheckInForDropin: function (postgres, dropinID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getCheckInForDropin(dropinID), function (err, result) {

                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getClientCaseNotes: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getClientCaseNotes(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getCaseNote: function (postgres, noteID, callback) {
        postgres.connect(function (err, note, done) {
            if (err) {
                return callback(err);
            }

            note.query(Queries.getCaseNote(noteID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editCaseNote: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editCaseNote(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserList: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserList(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserByQuery: function (postgres, query, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserByQuery(query), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createUser: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createUser(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    updateUser: function (postgres, userId, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.updateUser(userId, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUsersNotifications: function (postgres, userId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUsersNotifications(userId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createNotification: function (postgres, userId, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createNotification(userId, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getNotificationById: function (postgres, noteId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getNotificationById(noteId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    updateUsersNotification: function (postgres, noteId, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.updateUsersNotification(noteId, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getNotificationTypes: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getNotificationTypes(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserSettings: function (postgres, userId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserSettings(userId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    changeUserPassword: function (postgres, userId, hashedPassword, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.changeUserPassword(userId, hashedPassword), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    createCasePlan: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.createCasePlan(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    deleteUser: function (postgres, userId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteUser(userId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    uploadFile: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            // if you get a huge printout of base64
            // text in your terminal window, it means the image made it through
            // down to this level and is about to go into postgres

            // uncommenting this console log is useful to see if it makes it
            // but it might crash your dev console because the string is so big
            // console.log(payload.fileString);
            client.query(Queries.uploadFile(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    // getStatuses: function (postgres, callback) {
    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }
    //         client.query(Queries.getStatuses(), function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },

    // createStatus: function (postgres, payload, callback) {
    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }

    //         // var data = Queries.createStatus(payload);
    //         // // unstringify the data passed in
    //         client.query(Queries.createStatus(payload), function (err, result) {
    //         // client.query(data.string, data.params, function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },

    // editStatus: function (postgres, statusID, payload, callback) {
    //     postgres.connect(function (err, client, done) {
    //         if (err) {
    //             return callback(err);
    //         }
    //         client.query(Queries.editStatus(statusID, payload), function (err, result) {
    //             done();
    //             if (err) {
    //                 return callback(err);
    //             }

    //             return callback(undefined, result);
    //         });
    //     });
    // },

    getCasePlan: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getCasePlan(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getFlagTypes: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getFlagTypes(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getFlags: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getFlags(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createFlagType: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.createFlagType(payload), function (err, result) {
            // client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editFlagType: function (postgres, flagtypeID, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            // var data = Queries.editFlagType(flagtypeID);
            // // unstringify the data passed in
            client.query(Queries.editFlagType(flagtypeID, payload), function (err, result) {
            // client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getClientFlags: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            // var data = Queries.editFlag(clientID);
            // // unstringify the data passed in
            client.query(Queries.getClientFlags(clientID), function (err, result) {
            // client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    setClientFlag: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            // var data = Queries.editFlag(clientID);
            // // unstringify the data passed in
            client.query(Queries.setClientFlag(payload), function (err, result) {
            // client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    editClientFlag: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            // var data = Queries.editFlag(clientID);
            // // unstringify the data passed in
            client.query(Queries.editClientFlag(payload), function (err, result) {
            // client.query(data.string, data.params, function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    editCasePlan: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.editCasePlan(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getClientFiles: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getClientFiles(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getProfilePicture: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getProfilePicture(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    deleteFile: function (postgres, fileID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteFile(fileID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getPrograms: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getPrograms(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    getAllFollowUps: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getAllFollowUps(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    getFollowUp: function (postgres, id, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getFollowUp(id), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    getCaseManagerFollowUps: function (postgres, casemanagerID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getCaseManagerFollowUps(casemanagerID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    editFollowUp: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editFollowUp(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    createFollowUp: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createFollowUp(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    deleteFollowUp: function (postgres, id, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteFollowUp(id), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }
                return callback(undefined, result);
            });
        });
    },
    uploadSpreadsheet: function (postgres, formdata, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.uploadSpreadsheet(formdata), function (err, result) {
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
