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
        if (request.query.latest) {
            if (parseInt(request.query.latest)) {
                Service.getLatestDropIns(request.postgres, parseInt(request.query.latest), function (err, result) {
                    if (err) {
                        Respond.failedToGetDropIns(reply, err);
                    } else {
                        Respond.gotDropIns(reply, result);
                    }
                });
            } else {
                Respond.badGetDropIns(reply, "invalid latest number");
            }
        } else {
            Service.getDropIns(request.postgres, function (err, result) {
                if (err) {
                    Respond.failedToGetDropIns(reply, err);
                } else {
                    Respond.gotDropIns(reply, result);
                }
            });
        }
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

    getAllActivities: function (request, reply) {
        Service.getAllActivities(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetAllActivities(reply, err);
            } else {
                Respond.getAllActivities(reply, result);
            }
        });
    },

    getActivity: function (request, reply) {
        Service.getActivity(request.postgres, request.params.activityID, function (err, result) {
            if (err) {
                Respond.failedToGetActivity(reply, err);
            } else {
                Respond.getActivity(reply, result);
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

    addActivitiesToDropIn: function (request, reply) {
        Service.addActivitiesToDropIn(request.postgres, request.params.dropin, request.payload, function (err, result) {
            if (err) {
                Respond.failedToAddActivitiesToDropIn(reply, err);
            } else {
                Respond.gotAddActivitiesToDropIn(reply, result);
            }
        });
    },

    removeActivitiesFromDropin: function (request, reply) {
        Service.removeActivitiesFromDropin(request.postgres, request.params.dropinID, request.payload, function (err, result) {
            if (err) {
                Respond.failedToRemoveActivitiesFromDropin(reply, err);
            } else {
                Respond.removeActivitiesFromDropin(reply, result);
            }
        });
    },

    getDropinActivity: function (request, reply) {
        Service.getDropinActivity(request.postgres, request.params.dropinID, request.params.activityID, function (err, result) {
            if (err) {
                Respond.failedToGetDropinActivity(reply, err);
            } else {
                Respond.getDropinActivity(reply, result);
            }
        });
    },

    getDropinActivityEnrollment: function (request, reply) {
        Service.getDropinActivityEnrollment(request.postgres,
        request.params.dropinID, request.params.activityID, function (err, result) {
            if (err) {
                Respond.failedToGetDropinActivityEnrollment(reply, err);
            } else {
                Respond.getDropinActivityEnrollment(reply, result);
            }
        });
    },

    addEnrollmentToDropinActivity: function (request, reply) {
        Service.addEnrollmentToDropinActivity(request.postgres,
        request.params.dropinID, request.params.activityID, request.payload, function (err, result) {
            if (err) {
                Respond.failedToAddEnrollmentToDropinActivity(reply, err);
            } else {
                Respond.addEnrollmentToDropinActivity(reply, result);
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
    removeEnrollmentToDropinActivity: function (request, reply) {
        Service.removeEnrollmentToDropinActivity(request.postgres, request.params.dropinID, request.params.activityID,
        request.payload, function (err, result) {
            if (err) {
                Respond.failedToRemoveEnrollmentToDropinActivity(reply, err);
            } else {
                Respond.removeEnrollmentToDropinActivity(reply, result);
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

    addCheckinForDropin: function (request, reply) {
        Service.addCheckinForDropin(request.postgres, request.params.dropinID, request.payload, function (err, result) {
            if (err) {
                Respond.failedToAddCheckinForDropin(reply, err);
            } else {
                Respond.addCheckinForDropin(reply, result);
            }
        });
    },
    removeCheckinForDropin: function (request, reply) {
        Service.removeCheckinForDropin(request.postgres, request.params.dropinID, request.payload, function (err, result) {
            if (err) {
                Respond.failedToRemoveCheckinForDropin(reply, err);
            } else {
                Respond.removeCheckinForDropin(reply, result);
            }
        });
    },
    getCheckInForDropin: function (request, reply) {
        Service.getCheckInForDropin(request.postgres, request.params.dropinID, function (err, result) {
            if (err) {
                Respond.failedToGetCheckInForDropin(reply, err);
            } else {
                Respond.getCheckInForDropin(reply, result);
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

    getCaseNote: function (request, reply) {
        Service.getCaseNote(request.postgres, request.params.noteID, function (err, result) {
            if (err) {
                Respond.failedToGetCaseNote(reply, err);
            } else {
                Respond.getCaseNote(reply, result);
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
        if (request.query.username || request.query.id) {
            Service.getUserByQuery(request.postgres, {
                id: request.query.id,
                username: request.query.username
            }, function (err, user) {
                if (err) {
                    Respond.failedToGetUserByQuery(reply, err);
                } else if (user) {
                    Respond.gotUserByQuery(reply, {
                        id: user.id,
                        username: user.username
                    });
                } else {
                    Respond.noUserByQueryFound(reply);
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
        Service.getUserByQuery(request.postgres, {
            username: request.payload.username
        }, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
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

    getUser: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.userDoesNotExist(reply);
            } else {
                Respond.getUser(reply, {
                    id: user.id,
                    username: user.username
                });
            }
        });
    },

    updateUser: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.userDoesNotExist(reply);
            } else {
                Service.updateUser(request.postgres, userQuery.id, request.payload, function (err, result) {
                    if (err) {
                        Respond.failedToUpdateUser(reply, err);
                    } else {
                        Service.genToken({
                            id: userQuery.id,
                            username: request.payload.username
                        }, function (err, token) {
                            if (err) {
                                Respond.failedToGenToken(reply, err);
                            } else {
                                Respond.updateUser(reply, result, token);
                            }
                        });
                    }
                });
            }
        });
    },

    login: function (request, reply) {
        Service.getUserByQuery(request.postgres, {
            username: request.payload.username
        }, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
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
                                Respond.loggedIn(reply, token, user.id);
                            }
                        });
                    }
                });
            }
        });
    },

    changeCurrentUserPassword: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
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

    deleteUser: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.noSuchUserExists(reply);
            } else {
                Service.deleteUser(request.postgres, user.id, function (err, result) {
                    if (err) {
                        Respond.failedToDeleteUser(reply, err);
                    } else {
                        Respond.deleteUser(reply, result);
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
            userId = parseInt(request.params.userId);
        }
        Service.getUsersNotifications(request.postgres, userId, function (err, result) {
            if (err) {
                Respond.failedToGetUsersNotifications(reply, err);
            } else {
                Respond.getUsersNotifications(reply, result);
            }
        });
    },

    createCasePlan: function (request, reply) {
        Service.createCasePlan(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateCasePlan(reply, err);
            } else {
                Respond.createCasePlan(reply, result);
            }
        });
    },
    createNotification: function (request, reply) {
        var userId;
        if (request.params.userId === 'self') {
            userId = request.auth.credentials.id;
        } else {
            userId = parseInt(request.params.userId);
        }
        Service.createNotification(request.postgres, userId, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateNotification(reply, err);
            } else {
                Respond.createNotification(reply, result);
            }
        });
    },

    getUsersNotificationsById: function (request, reply) {
        var userId;
        if (request.params.userId === 'self') {
            userId = request.auth.credentials.id;
        } else {
            userId = parseInt(request.params.userId);
        }
        Service.getNotificationById(request.postgres, request.params.noteId, function (err, note) {
            if (err) {
                Respond.failedToGetNotificationById(reply, err);
            } else if (!note || note.userId !== userId) {
                Respond.noSuchNotificationExists(reply);
            } else {
                Respond.getUsersNotificationsById(reply, note);
            }
        });
    },

    updateUsersNotification: function (request, reply) {
        var userId;
        if (request.params.userId === 'self') {
            userId = request.auth.credentials.id;
        } else {
            userId = parseInt(request.params.userId);
        }
        Service.getNotificationById(request.postgres, request.params.noteId, function (err, note) {
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
    },

    uploadFile: function (request, reply) {
        Service.uploadFile(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToUploadFile(reply, err);
            } else {
                Respond.uploadFile(reply, result);
            }
        });
    },

    getUserSettings: function (request, reply) {
        Service.getUserSettings(request.postgres, request.params.userId, function (err, result) {
            if (err) {
                Respond.failedGetUserSettings(reply, err);
            } else {
                Respond.getUserSettings(reply, result);
            }
        });
    },

    deleteFile: function (request, reply) {
        Service.deleteFile(request.postgres, request.params.fileID, function (err, result) {
            if (err) {
                Respond.failedToDeleteFile(reply, err);
            } else {
                Respond.deleteFile(reply, result);
            }
        });
    },

    getNotificationTypes: function (request, reply) {
        Service.getNotificationTypes(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetNotificationTypes(reply, err);
            } else {
                Respond.getNotificationTypes(reply, result);
            }
        });
    },
    getCasePlan: function (request, reply) {
        Service.getCasePlan(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetCasePlan(reply, err);
            } else {
                Respond.getCasePlan(reply, result);
            }
        });

    },

    editCasePlan: function (request, reply) {
        Service.editCasePlan(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEditCasePlan(reply, err);
            } else {
                Respond.editCasePlan(reply, result);
            }
        });
    },

    getClientFiles: function (request, reply) {
        Service.getClientFiles(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetClientFiles(reply, err);
            } else {
                Respond.getClientFiles(reply, result);
            }
        });
    },

    // getStatuses: function (request, reply) {
    //     Service.getStatuses(request.postgres, function (err, result) {
    //         if (err) {
    //             Respond.failedToGetStatuses(reply, err);
    //         } else {
    //             Respond.getStatuses(reply, result);
    //         }
    //     });
    // },

    // createStatus: function (request, reply) {
    //     Service.createStatus(request.postgres, request.payload, function (err, result) {
    //         if (err) {
    //             Respond.failedToCreateStatus(reply, err);
    //         } else {
    //             Respond.createStatus(reply, result);
    //         }
    //     });
    // },

    // editStatus: function (request, reply) {
    //     Service.editStatus(request.postgres, request.params.statusID, request.payload, function (err, result) {
    //         if (err) {
    //             Respond.failedToEditStatus(reply, err);
    //         } else {
    //             Respond.editStatus(reply, result);
    //         }
    //     });
    // },

    getFlagTypes: function (request, reply) {
        Service.getFlagTypes(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetFlagTypes(reply, err);
            } else {
                Respond.getFlagTypes(reply, result);
            }
        });
    },
    getFlags: function (request, reply) {
        Service.getFlags(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetFlags(reply, err);
            } else {
                Respond.getFlags(reply, result);
            }
        });
    },

    createFlagType: function (request, reply) {
        Service.createFlagType(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateFlagType(reply, err);
            } else {
                Respond.createFlagType(reply, result);
            }
        });
    },

    editFlagType: function (request, reply) {
        Service.editFlagType(request.postgres, request.params.flagtypeID, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEditFlagType(reply, err);
            } else {
                Respond.editFlagType(reply, result);
            }
        });
    },

    getClientFlags: function (request, reply) {
        Service.getClientFlags(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetClientFlags(reply, err);
            } else {
                Respond.getClientFlags(reply, result);
            }
        });
    },
    setClientFlag: function (request, reply) {
        request.payload.clientID = request.params.clientID;
        Service.setClientFlag(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToSetClientFlag(reply, err);
            } else {
                Respond.setClientFlag(reply, result);
            }
        });
    },
    editClientFlag: function (request, reply) {
        Service.editClientFlag(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEditClientFlag(reply, err);
            } else {
                Respond.editClientFlag(reply, result);
            }
        });
    },
    getProfilePicture: function (request, reply) {
        Service.getProfilePicture(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetProfilePicture(reply, err);
            } else {
                Respond.getProfilePicture(reply, result);
            }
        });
    },

    getPrograms: function (request, reply) {
        Service.getPrograms(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetPrograms(reply, err);
            } else {
                Respond.getPrograms(reply, result);
            }
        });
    },

    getAllFollowUps: function (request, reply) {
        Service.getAllFollowUps(request.postgres, function (err, result) {
            if (err) {
                Respond.failedToGetAllFollowUps(reply, err);
            } else {
                Respond.getAllFollowUps(reply, result);
            }
        });
    },

    getFollowUp: function (request, reply) {
        Service.getFollowUp(request.postgres, request.params.id, function (err, result) {
            if (err) {
                Respond.failedToGetFollowUp(reply, err);
            } else {
                Respond.getFollowUp(reply, result);
            }
        });
    },

    getCaseManagerFollowUps: function (request, reply) {
        Service.getCaseManagerFollowUps(request.postgres, request.params.casemanagerID, function (err, result) {
            if (err) {
                Respond.failedToGetCaseManagerFollowUps(reply, err);
            } else {
                Respond.getCaseManagerFollowUps(reply, result);
            }
        });
    },

    editFollowUp: function (request, reply) {
        Service.editFollowUp(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToEditFollowUp(reply, err);
            } else {
                Respond.editFollowUp(reply, result);
            }
        });
    },

    createFollowUp: function (request, reply) {
        Service.createFollowUp(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateFollowUp(reply, err);
            } else {
                Respond.createFollowUp(reply, result);
            }
        });
    },

    deleteFollowUp: function (request, reply) {
        Service.deleteFollowUp(request.postgres, request.params.id, function (err, result) {
            if (err) {
                Respond.failedToDeleteFollowUp(reply, err);
            } else {
                Respond.deleteFollowUp(reply, result);
            }
        });
    },

    uploadSpreadsheet: function (request, reply) {
        Service.uploadSpreadsheet(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToUploadSpreadsheet(reply, err);
            } else {
                Respond.uploadSpreadsheet(reply, result);
            }
        });
    },
};


module.exports = api;
