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
                    dob: local.date_of_birth,
                    phone: local.phone_number,
                    email: local.email
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

    getClientCaseNotes: function (postgres, clientID, callback) {
        Query.getClientCaseNotes(postgres, clientID, function (err, result) {
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

    getUserByQuery: function (postgres, query, callback) {
        Query.getUserByQuery(postgres, query, function (err, result) {
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

    updateUser: function (postgres, userId, payload, callback) {
        Query.updateUser(postgres, userId, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
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

    getUsersNotifications: function (postgres, userId, callback) {
        Query.getUsersNotifications(postgres, userId, function (err, result) {
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
                    userId: local.user_id,
                    type: local.type,
                    comment: local.comment,
                    link: local.link,
                    checked: local.checked
                });
            }
            return callback(undefined, arr);
        });
    },

    createNotification: function (postgres, userId, payload, callback) {
        Query.createNotification(postgres, userId, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getNotificationById: function (postgres, noteId, callback) {
        Query.getNotificationById(postgres, noteId, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var local = result.rows[0];
            return callback(undefined, {
                id: local.id,
                userId: local.user_id,
                type: local.type,
                comment: local.comment,
                link: local.link,
                checked: local.checked
            });
        });
    },

    updateUsersNotification: function (postgres, noteId, payload, callback) {
        Query.updateUsersNotification(postgres, noteId, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            var local = result.rows[0];
            return callback(undefined, {
                id: local.id,
                userId: local.user_id,
                type: local.type,
                comment: local.comment,
                link: local.link,
                checked: local.checked
            });
        });
    },

    getNotificationTypes: function (postgres, callback) {
        Query.getNotificationTypes(postgres, function(err, result) {
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
                    name: local.name
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

    deleteUser: function (postgres, userId, callback) {
        Query.deleteUser(postgres, userId, callback);
    },

    getStatuses: function (postgres, callback) {
        Query.getStatuses(postgres, function (err, result) {
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
                    name: local.name,
                    color: local.color
                });
            }
            return callback(undefined, arr);
        });
    },

    createStatus: function (postgres, payload, callback) {
        Query.createStatus(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    uploadFile: function (postgres, payload, callback) {
        Query.uploadFile(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editStatus: function (postgres, statusID, payload, callback) {
        Query.editStatus(postgres, statusID, payload, function (err, result) {
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
                    name: local.name,
                    color: local.color
                });
            }
            callback(undefined, arr);
        });
    },

    getFlags: function (postgres, callback) {
        Query.getFlags(postgres, function (err, result) {
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
                    type: local.type,
                    color: local.color,
                    message: local.message,
                    note: local.note
                });
            }
            return callback(undefined, arr);
        });
    },

    createFlag: function (postgres, payload, callback) {
        Query.createFlag(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getClientFiles: function (postgres, clientID, callback) {
        Query.getClientFiles(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editFlag: function (postgres, flagID, payload, callback) {
        Query.editFlag(postgres, flagID, payload, function (err, result) {
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
                    type: local.type,
                    color: local.color,
                    message: local.message,
                    note: local.note
                });
            }
            callback(undefined, arr);
        });
    },

    getClientFlags: function (postgres, clientID, callback) {
        Query.getClientFlags(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            // var arr = [];
            // for (var i = 0; i < result.rows.length; i++) {
            //     var local = result.rows[i];
            //     arr.push({
            //         id: local.id,
            //         type: local.type,
            //         color: local.color,
            //         message: local.message,
            //         note: local.note
            //     });
            // }
            // callback(undefined, arr);
            callback(undefined, result);
        });
    },

    getProfilePicture: function (postgres, clientID, callback) {
        Query.getProfilePicture(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    }
};

module.exports = service;
