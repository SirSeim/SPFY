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

    createDropIn: function (request, reply) {
        Service.createDropIn(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateDropIn(reply, err);
            } else {
                Respond.createDropIn(reply, result);
            }
        });
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

    createDropinActivities: function (request, reply) {
        Service.createDropinActivities(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedTocreateDropinActivities(reply, err);
            } else {
                Respond.createDropinActivities(reply, result);
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

    getDropinEnrollment: function (request, reply) {
        Service.getDropinEnrollment(request.postgres, request.params.dropinID, function (err, result) {
            if (err) {
                Respond.failedToGetDropinEnrollment(reply, err);
            } else {
                Respond.getDropinEnrollment(reply, result);
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

    getEnrollmentByActivity: function (request, reply) {
        Service.getEnrollmentByActivity(request.postgres, request.params.activityID, function (err, result) {
            if (err) {
                Respond.failedToGetEnrollmentByActivity(reply, err);
            } else {
                Respond.getEnrollmentByActivity(reply, result);
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
    getCheckIn: function (request, reply) {
        Service.getCheckIn(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetCheckIn(reply, err);
            } else {
                Respond.gotCheckIn(reply, result);
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
        Service.dataBrowserSearchClients(request.postgres, data, function (err, result) {
            if (err) {
                Respond.failedToGetClient(reply, err);
            } else {
                Respond.dataBrowserSearchClients(reply, result);
            }
        });
    },

    createActivity: function (request, reply){
        Service.createActivity(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateActivity(reply, err);
            } else {
                Respond.createActivity(reply, result);
            }
        });
    },

    editActivity: function (request, reply) {
        Service.editActivity(request.postgres, request.params.activity, function (err, result) {
            if (err) {
                Respond.failedToEditActivity(reply, err);
            } else {
                Respond.gotEditActivity(reply, result);
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

    createCaseNote: function (request, reply) {
        Service.createCaseNote(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateCaseNote(reply, err);
            } else {
                Respond.createCaseNote(reply, result);
            }
        });
    },


    getClientCaseNotes: function (request, reply) {
        Service.getClientCaseNotes(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetClientCaseNotes(reply, err);
            } else {
                Respond.getClientCaseNotes(reply, result);
            }
        });
    },

    editCaseNote: function (request, reply) {
        Service.editCaseNote(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEditCaseNote(reply, err);
            } else {
                Respond.editCaseNote(reply, result);
            }
        });
    },

    getUserList: function (request, reply) {
        if (request.query.username) {
            Service.getUserByUsername(request.postgres, request.query.username, function (err, user) {
                if (err) {
                    Respond.failedToGetUserByUsername(reply, err);
                } else if (user) {
                    Respond.gotUserByUsername(reply, {
                        id: user.id,
                        username: user.username
                    });
                } else {
                    Respond.noUserByUsernameFound(reply);
                }
            });
        } else {
            Service.getUserList(request.postgres, function (err, result) {
                if (err) {
                    Respond.failedToGetUsers(reply, err);
                } else {
                    Respond.gotUsers(reply, result);
                }
            });
        }
    },

    createUser: function (request, reply) {
        Service.getUserByUsername(request.postgres, request.payload.username, function (err, user) {
            if (err) {
                Respond.failedToGetUserByUsername(reply, err);
            } else if (user) {
                Respond.usernameAlreadyExists(reply);
            } else {
                Service.createUser(request.postgres, request.payload, function (err, result) {
                    if (err) {
                        Respond.failedToCreateUser(reply, err);
                    } else {
                        Respond.createdUser(reply, result);
                    }
                });
            }
        });
    },

    login: function (request, reply) {
        Service.getUserByUsername(request.postgres, request.payload.username, function (err, user) {
            if (err) {
                Respond.failedToGetUserByUsername(reply, err);
            } else if (!user) {
                Respond.userPassNoMatch(reply);
            } else {
                Service.matchPasswords(request.payload.password, user.hashedPassword, function (err, match) {
                    if (err) {
                        Respond.failedToComparePasswords(reply, err);
                    } else if (!match) {
                        Respond.userPassNoMatch(reply);
                    } else {
                        Service.genToken({
                            id: user.id,
                            username: user.username
                        }, function (err, token) {
                            if (err) {
                                Respond.failedToGenToken(reply, err);
                            } else {
                                Respond.loggedIn(reply, token);
                            }
                        });
                    }
                });
            }
        });
    },

    changeCurrentUserPassword: function (request, reply) {
        Service.getUserById(request.postgres, request.auth.credentials.id, function (err, user) {
            if (err) {
                Respond.failedToGetUserById(reply, err);
            } else if (!user) {
                Respond.noSuchUserExists(reply);
            } else {
                Service.matchPasswords(request.payload.password, user.hashedPassword, function (err, match) {
                    if (err) {
                        Respond.failedToComparePasswords(reply, err);
                    } else if (!match) {
                        Respond.passNoMatch(reply);
                    } else {
                        var newPassword = request.payload.newPassword;
                        Service.changeUserPassword(request.postgres, user.id, newPassword, function (err, result) {
                            if (err) {
                                Respond.failedToChangeUserPassword(reply, err);
                            } else {
                                Service.genToken({
                                    id: user.id,
                                    username: user.username
                                }, function (err, token) {
                                    if (err) {
                                        Respond.failedToGenToken(reply, err);
                                    } else {
                                        Respond.changeCurrentUserPassword(reply, result, token);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    getUsersNotifications: function (request, reply) {
        var userId;
        if (request.params.userId === 'self') {
            userId = request.auth.credentials.id;
        } else {
            userId = request.params.userId;
        }
        Service.getUsersNotifications(request.postgres, userId, function (err, result) {
            if (err) {
                Respond.failedToGetUsersNotifications(reply, err);
            } else {
                Respond.getUsersNotifications(reply, result);
            }
        });
    },

    createNotification: function (request, reply) {
        var userId;
        if (request.params.userId === 'self') {
            userId = request.auth.credentials.id;
        } else {
            userId = request.params.userId;
        }
        Service.createNotification(request.postgres, userId, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateNotification(reply, err);
            } else {
                Respond.createNotification(reply, result);
            }
        });
    },

    updateUsersNotification: function (request, reply) {
        var userId;
        if (request.params.userId === 'self') {
            userId = request.auth.credentials.id;
        } else {
            userId = request.params.userId;
        }
        Service.getNotificationById(request.postgres, request.params.noteId, function (err, note) {
            console.log(note);
            if (err) {
                Respond.failedToGetNotificationById(reply, err);
            } else if (!note || note.userId !== userId) {
                Respond.noSuchNotificationExists(reply);
            } else {
                Service.updateUsersNotification(request.postgres, note.id, request.payload, function (err, result) {
                    if (err) {
                        Respond.failedToUpdateUsersNotification(reply, err);
                    } else {
                        Respond.updateUsersNotification(reply, result);
                    }
                });
            }
        });
    }
};


module.exports = api;
