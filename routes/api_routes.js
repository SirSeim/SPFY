var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));
var Schema = require(Path.join(__dirname, '../api/schema.js'));

/* ajax calls from frontend js files use the path properties
    Example:
    $.ajax({
        url: "api/casemanagers",
        data: data,
        method: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
*/
// details of route format of method, path, handler
// can found in Hapi Routing documentation
var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) { // request and reply come from Hapi package
            reply({
                'hello': 'Welcome to the SPFY webapp!'
            }).code(200);
        }
    },
    {
        method: 'POST',
        path: '/clients',
        handler: Api.createClient
    },
    {
        method: 'GET',
        path: '/casemanagers',
        handler: Api.getAllCaseManagers // this goes to api/api.js
    },
    {
        method: 'GET',
        path: '/clients/{client}',
        handler: Api.getClient
    },
    {
        method: 'POST',
        path: '/clients/{clientID}',
        handler: Api.editClient
    },
    {
        method: 'GET',
        path: '/clients',
        handler: Api.getClients
    },
    {
        method: 'POST',
        path: '/dropins',
        handler: Api.createDropIn
    },
    {
        method: 'GET',
        path: '/dropins',
        handler: Api.getDropIns
    },
    {
        method: 'GET',
        path: '/dropins/{dropin}',
        handler: Api.getDropIn
    },
    {
        method: 'GET',
        path: '/dropins/{dropin}/activities',
        handler: Api.getDropinActivities
    },
    {
        method: 'GET',
        path: '/dropins/{dropinID}/enrollment',
        handler: Api.getDropinEnrollment
    },
    {
        method: 'GET',
        path: '/enroll/{activityID}',
        handler: Api.getEnrollmentByActivity
    },
    {
        method: 'POST',
        path: '/enroll',
        handler: Api.enroll
    },
    {
        method: 'GET',
        path: '/checkin',
        handler: Api.getCheckIn
    },
    {
        method: 'POST',
        path: '/checkin',
        handler: Api.checkin
    },
    {
        method: 'GET',
        path: '/intake',
        handler: Api.getIntake
    },
    {
        method: 'POST',
        path: '/intake',
        handler: Api.intakeCompleted
    },
    {
        method: 'POST',
        path: '/activities',
        handler: Api.createDropinActivities
    },
    {
        method: 'GET',
        path: '/clients/search',
        handler: Api.dataBrowserGetClients
    },
    {
        method: 'GET',
        path: '/clients/search/{data}',
        handler: Api.dataBrowserSearchClients
    },
    {
        method: 'POST',
        path: "/activity",
        handler: Api.createActivity
    },
    {
        method: 'POST',
        path: "/editactivity",
        handler: Api.editActivity
    },
    {
        method: 'POST',
        path: '/case_notes',
        handler: Api.createCaseNote
    },
    {
        method: 'GET',
        path: '/case_notes/{clientID}',
        handler: Api.getClientCaseNotes
    },
    {
        method: 'POST',
        path: '/case_notes/{caseNoteID}',
        handler: Api.editCaseNote
    },
    {
        method: 'GET',
        path: '/users',
        handler: Api.getUserList
    },
    {
        method: 'POST',
        path: '/users',
        config: {
            validate: {
                payload: Schema.newUser
            }
        },
        handler: Api.createUser
    },
    {
        method: 'POST',
        path: '/sessions',
        config: {
            auth: false,
            validate: {
                payload: Schema.login
            }
        },
        handler: Api.login
    },
    {
        method: 'GET',
        path: '/users/notifications',
        handler: Api.getUsersNotifications
    },
    {
        method: 'GET',
        path: '/users/{userId}/notifications',
        handler: Api.getUsersNotificationsById
    },
    {
        method: 'POST',
        path: '/users/{userId}/notifications',
        handler: Api.createNotificationById
    },
    // {
    //     method: 'PUT',
    //     path: '/users/{userId}/notifications/{noteId}',
    //     config: {
    //         validate: {
    //             payload: Schema.updateUsersNotificationsById
    //         }
    //     },
    //     handler: Api.updateUsersNotificationsByID
    // },
    {
        method: 'GET',
        path: '/users/self/notifications',
        handler: Api.getUsersNotificationsByToken
    },
    {
        method: 'POST',
        path: '/users/self/notifications',
        handler: Api.createNotificationByToken
    },
    // {
    //     method: 'PUT',
    //     path: '/users/self/notifications/{noteId}',
    //     config: {
    //         validate: {
    //             payload: Schema.updateUsersNotificationsByToken
    //         }
    //     },
    //     handler: Api.updateUsersNotificationsByToken
    // },
    {
        method: 'PUT',
        path: '/users/password',
        config: {
            validate: {
                payload: Schema.changeCurrentUserPassword
            }
        },
        handler: Api.changeCurrentUserPassword
    }
];

// api in this case is a plugin run by the Hapi node package
// each plugin has a register method
module.exports.register = function (server, options, next) {
    server.route(apiRoutes);
    next(); // method called when plugin has completed steps
};


module.exports.register.attributes = {
    name: "api",
    version: "0.0.0"
};
