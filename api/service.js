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
            var local = result.rows[0];
            callback(undefined, {
                id: local.id,
                date: local.date
            });
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

    getLatestDropIns: function (postgres, latest, callback) {
        Query.getLatestDropIns(postgres, latest, function (err, result) {
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
                    endTime: local.end_time,
                    programId: local.program_id,
                    programName: local.program_name
                });
            }
            return callback(undefined, arr);
        });
    },

    addActivitiesToDropIn: function (postgres, dropinID, payload, callback) {
        Query.addActivitiesToDropIn(postgres, dropinID, payload, function (err, result) {
            if (err) {
                return callback(err);
            }

            return callback(undefined, result);
        });
    },

    removeActivitiesFromDropin: function (postgres, dropinID, payload, callback) {
        Query.removeActivitiesFromDropin(postgres, dropinID, payload, function (err, result) {
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push(local.activity_id);
            }
            return callback(undefined, {
                activities: arr
            });
        });
    },

    getDropinActivity: function (postgres, dropinID, activityID, callback) {
        Query.getDropinActivity(postgres, dropinID, activityID, function (err, result) {
            if (err) {
                return callback(err);
            }

            var local = result.rows[0];
            if (!local) {
                return callback();
            }
            return callback(undefined, {
                id: local.id,
                name: local.activity_name,
                room: local.room,
                comments: local.comments,
                startTime: local.start_time,
                endTime: local.end_time,
                programId: local.program_id,
                programName: local.program_name
            });
        });
    },

    getDropinActivityEnrollment: function (postgres, dropinID, activityID, callback) {
        Query.getDropinActivityEnrollment(postgres, dropinID, activityID, function (err, result) {
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

    addEnrollmentToDropinActivity: function (postgres, dropinID, activityID, payload, callback) {
        Query.addEnrollmentToDropinActivity(postgres, dropinID, activityID, payload, function (err, result) {
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push(local.client_id);
            }
            return callback(undefined, {
                dropin: parseInt(dropinID),
                activity: parseInt(activityID),
                clients: arr
            });
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
                    name: local.activity_name,
                    ongoing: local.ongoing,
                    startDate: local.start_date,
                    endDate: local.end_date,
                    programId: local.program_id,
                    programName: local.program_name
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
                name: local.activity_name,
                ongoing: local.ongoing,
                startDate: local.start_date,
                endDate: local.end_date,
                programId: local.program_id,
                programName: local.program_name
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

    removeEnrollmentToDropinActivity: function (postgres, dropinID, activityID, payload, callback) {
        Query.removeEnrollmentToDropinActivity(postgres, dropinID, activityID, payload, function (err, result) {
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push(local.client_id);
            }
            return callback(undefined, {
                dropin: parseInt(dropinID),
                activity: parseInt(activityID),
                clients: arr
            });
        });
    },

    addCheckinForDropin: function (postgres, dropinID, payload, callback) {
        Query.addCheckinForDropin(postgres, dropinID, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push(local.client_id);
            }
            return callback(undefined, {
                dropin: parseInt(dropinID),
                clients: arr
            });
        });
    },

    removeCheckinForDropin: function (postgres, dropinID, payload, callback) {
        Query.removeCheckinForDropin(postgres, dropinID, payload, function (err, result) {
            if (err) {
                return callback(err);
            }

            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push(local.client_id);
            }
            return callback(undefined, {
                dropin: parseInt(dropinID),
                clients: arr
            });
        });
    },

    getCheckInForDropin: function (postgres, dropinID, callback) {
        Query.getCheckInForDropin(postgres, dropinID, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push(local.client_id);
            }
            return callback(undefined, {
                dropin: parseInt(dropinID),
                clients: arr
            });
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

    getCaseNote: function (postgres, noteID, callback) {
        Query.getCaseNote(postgres, noteID, function (err, result) {
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

    getUserSettings: function (postgres, userId, callback) {
        Query.getUserSettings(postgres, userId, function(err, result) {
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
                    userID: local.user_id,
                    settingsData: local.settings_data
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

    createCasePlan: function (postgres, data, callback) {
        Query.createCasePlan(postgres, data, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getCasePlan: function (postgres, data, callback) {
        Query.getCasePlan(postgres, data, function (err, result) {
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
                    caseplan: local.caseplan
                });
            }
            return callback(undefined, arr);
        });
    },

    deleteUser: function (postgres, userId, callback) {
        Query.deleteUser(postgres, userId, callback);
    },

    // getStatuses: function (postgres, callback) {
    //     Query.getStatuses(postgres, function (err, result) {
    //         if (err) {
    //             return callback(err);
    //         }
    //         if (!result.rows[0]) {
    //             return callback();
    //         }
    //         var arr = [];
    //         for (var i = 0; i < result.rows.length; i++) {
    //             var local = result.rows[i];
    //             arr.push({
    //                 id: local.id,
    //                 name: local.name,
    //                 color: local.color
    //             });
    //         }
    //         return callback(undefined, arr);
    //     });
    // },

    // createStatus: function (postgres, payload, callback) {
    //     Query.createStatus(postgres, payload, function (err, result) {
    //         if (err) {
    //             return callback(err);
    //         }
    //         callback(undefined, result);
    //     });
    // },

    // editStatus: function (postgres, statusID, payload, callback) {
    //     Query.editStatus(postgres, statusID, payload, function (err, result) {
    //         if (err) {
    //             return callback(err);
    //         }
    //         if (!result.rows[0]) {
    //             return callback();
    //         }
    //         var arr = [];
    //         for (var i = 0; i < result.rows.length; i++) {
    //             var local = result.rows[i];
    //             arr.push({
    //                 id: local.id,
    //                 name: local.name,
    //                 color: local.color
    //             });
    //         }
    //         callback(undefined, arr);
    //     });
    // },

    getFlagTypes: function (postgres, callback) {
        Query.getFlagTypes(postgres, function (err, result) {
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
                    color: local.color,
                    settings: local.settings
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
                    clientID: local.client_id,
                    type: local.type,
                    message: local.message,
                    note: local.note,
                    settings: local.settings
                });
            }
            callback(undefined, arr);
        });
    },

    createFlagType: function (postgres, payload, callback) {
        Query.createFlagType(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editFlagType: function (postgres, flagtypeID, payload, callback) {
        Query.editFlagType(postgres, flagtypeID, payload, function (err, result) {
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
                    color: local.color,
                    settings: local.settings
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
    setClientFlag: function (postgres, payload, callback) {
        Query.setClientFlag(postgres, payload, function (err, result) {
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
    editClientFlag: function (postgres, payload, callback) {
        Query.editClientFlag(postgres, payload, function (err, result) {
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
    uploadFile: function (postgres, payload, callback) {
        Query.uploadFile(postgres, payload, function (err, result) {
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

    editCasePlan: function (postgres, data, callback) {
        Query.editCasePlan(postgres, data, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    getProfilePicture: function (postgres, clientID, callback) {
        Query.getProfilePicture(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    deleteFile: function (postgres, fileID, callback) {
        Query.deleteFile(postgres, fileID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getPrograms: function (postgres, callback) {
        Query.getPrograms(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getAllFollowUps: function (postgres, callback) {
        Query.getAllFollowUps(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getFollowUp: function (postgres, id, callback) {
        Query.geFollowUp(postgres, id, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getCaseManagerFollowUps: function (postgres, casemanagerID, callback) {
        Query.getCaseManagerFollowUps(postgres, casemanagerID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editFollowUp: function (postgres, payload, callback) {
        Query.editFollowUp(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    createFollowUp: function (postgres, payload, callback) {
        Query.createFollowUp(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    deleteFollowUp: function (postgres, id, callback) {
        Query.deleteFollowUp(postgres, id, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    uploadSpreadsheet: function (postgres, formdata, callback) {
        Query.uploadSpreadsheet(postgres, formdata, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    }
};

module.exports = service;
