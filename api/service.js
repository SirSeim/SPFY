var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js'));
var bcrypt = require('bcrypt');
var JWT = require('jsonwebtoken');

var saltRounds = 10;
var jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '1 day'
};

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
            if (!result.rows[0]) {
                return callback();
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
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    firstName: local.first_name,
                    nickname: local.nickname,
                    lastName: local.last_name,
                    status: local.status,
                    dob: local.date_of_birth
                });
            }
            return callback(undefined, arr);
        });
    },

    createDropIn: function (postgres, payload, callback) {
        Query.createDropIn(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getDropIns: function (postgres, callback) {
        Query.getDropIns(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
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
            if (!local) {
                return callback();
            }
            return callback(undefined, {
                id: local.id,
                date: local.date
            });
        });
    },

    createDropinActivities: function (postgres, payload, callback) {
        Query.createDropinActivities(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getDropinActivities: function (postgres, dropin, callback) {
        Query.getDropinActivities(postgres, dropin, function (err, result) {
            if (err) {
                return callback(err);
            }

            // possible for a dropin to not have activities
            // Should we have default activities?
            if (!result.rows[0]) {
                return callback();
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    name: local.activity_name,
                    room: local.room,
                    comments: local.comments,
                    startTime: local.start_time,
                    endTime: local.end_time
                });
            }
            return callback(undefined, arr);
        });
    },

    getDropinEnrollment: function (postgres, dropinID, callback) {
        Query.getDropinEnrollment(postgres, dropinID, function (err, result) {
            if (err) {
                return callback(err);
            }

            return callback(undefined, result);
        });
    },

    getAllActivities: function (postgres, callback) {
        Query.getAllActivities(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    name: local.activity_name
                });
            }
            return callback(undefined, arr);
        });
    },

    getActivity: function (postgres, activity, callback) {
        Query.getActivity(postgres, activity, function (err, result) {
            if (err) {
                return callback(err);
            }
            var local = result.rows[0];
            if (!local) {
                return callback();
            }
            return callback(undefined, {
                id: local.id,
                name: local.activity_name
            });
        });
    },

    getActivityDropIns: function (postgres, activity, callback) {
        Query.getActivityDropIns(postgres, activity, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    date: local.date,
                    room: local.room,
                    comments: local.comments,
                    startTime: local.start_time,
                    endTime: local.end_time
                });
            }
            return callback(undefined, arr);
        });
    },

    editClient: function (postgres, payload, callback) {
        Query.editClient(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    createActivity: function (postgres, payload, callback) {
        Query.createActivity(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editActivity: function (postgres, payload, callback) {
        Query.editActivity(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    enroll: function (postgres, payload, callback) {
        Query.enroll(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getEnrollmentByActivity: function (postgres, activityID, callback) {
        Query.getEnrollmentByActivity(postgres, activityID, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    checkin: function (postgres, payload, callback) {
        Query.checkin(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getCheckIn: function (postgres, callback) {
        Query.getCheckIn(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    dropin: local.drop_in_id,
                    client: local.client_id,
                    date: local.date
                });
            }
            return callback(undefined, arr);
        });
    },

    dataBrowserGetClients: function (postgres, callback) {
        Query.dataBrowserGetClients(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    dataBrowserSearchClients: function (postgres, data, callback) {
        Query.dataBrowserSearchClients(postgres, data, function (err, result) {
            if (err) {
                return callback(err);
            }
            // var local = result.rows[0];
            return callback(undefined, result);
        });
    },

    createCaseNote: function (postgres, data, callback) {
        Query.createCaseNote(postgres, data, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getClientCaseNotes: function (postgres, data, callback) {
        Query.getClientCaseNotes(postgres, data, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    clientID: local.client_id,
                    caseManagerID: local.case_manager_id,
                    date: local.date,
                    category: local.category,
                    caseManager: local.first_name + ' ' + local.last_name,
                    note: local.note,
                    followUpNeeded: local.follow_up_needed,
                    dueDate: local.due_date,
                    reminderDate: local.reminder_date
                });
            }
            return callback(undefined, arr);
        });
    },

    editCaseNote: function (postgres, data, callback) {
        Query.editCaseNote(postgres, data, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getUserList: function (postgres, callback) {
        Query.getUserList(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }

            var users = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];

                users.push({
                    id: local.id,
                    username: local.username
                });
            }
            return callback(undefined, users);
        });
    },

    getUserByUsername: function (postgres, username, callback) {
        Query.getUserByUsername(postgres, username, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows.length) {
                return callback();
            }

            var local = result.rows[0];
            return callback(undefined, {
                id: local.id,
                username: local.username,
                hashedPassword: local.hashed_password
            });
        });
    },

    getUserById: function (postgres, userId, callback) {
        Query.getUserById(postgres, userId, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows.length) {
                return callback();
            }

            var local = result.rows[0];
            return callback(undefined, {
                id: local.id,
                username: local.username,
                hashedPassword: local.hashed_password
            });
        });
    },

    createUser: function (postgres, payload, callback) {
        bcrypt.hash(payload.password, saltRounds, function (err, hash) {
            if (err) {
                return callback(err);
            }
            Query.createUser(postgres, {
                username: payload.username,
                password: hash
            }, callback);
        });
    },

    matchPasswords: function (password, hashedPassword, callback) {
        bcrypt.compare(password, hashedPassword, function (err, res) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, res);
        });
    },

    genToken: function (session, callback) {
        JWT.sign(session, process.env.SPFY_KEY, jwtOptions, callback);
    },

    getUsersNotifications: function (postgres, credentials, callback) {
        Query.getUsersNotifications(postgres, credentials, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows.length) {
                return callback();
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    id: local.id,
                    user: credentials.username,
                    type: local.type,
                    comment: local.comment,
                    link: local.link
                });
            }
            return callback(undefined, arr);
        });
    },

    changeUserPassword: function (postgres, userId, password, callback) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                return callback(err);
            }
            Query.changeUserPassword(postgres, userId, hash, callback);
        });
    },

    uploadFiles: function (postgres, payload, callback) {
        Query.uploadFiles(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },
};

module.exports = service;
