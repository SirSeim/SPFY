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
        method: 'POST',
        path: '/activities',
        handler: Api.createDropinActivities
    },
    {
        method: 'GET',
        path: '/search/clients',
        handler: Api.dataBrowserGetClients
    },
    {
        method: 'GET',
        path: '/search/clients/{data}',
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
        path: '/statuses',
        handler: Api.getStatuses
    },
    {
        method: 'POST',
        path: '/statuses',
        handler: Api.createStatus
    },
    {
        method: 'PUT',
        path: '/statuses/{statusID}',
        handler: Api.editStatus
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
        method: 'GET',
        path: '/users/{userId}',
        handler: Api.getUser
    },
    {
        method: 'PUT',
        path: '/users/{userId}',
        handler: Api.updateUser
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
        path: '/users/{userId}/notifications',
        handler: Api.getUsersNotifications
    },
    {
        method: 'POST',
        path: '/users/{userId}/notifications',
        config: {
            validate: {
                payload: Schema.notification
            }
        },
        handler: Api.createNotification
    },
    {
        method: 'GET',
        path: '/users/{userId}/notifications/{noteId}',
        handler: Api.getUsersNotificationsById
    },
    {
        method: 'PUT',
        path: '/users/{userId}/notifications/{noteId}',
        config: {
            validate: {
                payload: Schema.updateNotification
            }
        },
        handler: Api.updateUsersNotification
    },
    {
        method: 'GET',
        path: '/notifications/types',
        handler: Api.getNotificationTypes
    },
    {
        method: 'PUT',
        path: '/users/{userId}/password',
        config: {
            validate: {
                payload: Schema.changeCurrentUserPassword
            }
        },
        handler: Api.changeCurrentUserPassword
    },
    {
        method: 'POST',
        path: '/clients/{clientID}/case_plan',
        handler: Api.createCasePlan
    },
    {
        method: 'GET',
        path: '/clients/{clientID}/case_plan',
        handler: Api.getCasePlan
    },
    {
        method: 'PUT',
        path: '/clients/{clientID}/case_plan',
        handler: Api.editCasePlan
    },
    {
        method: 'Delete',
        path: '/users/{userId}',
        handler: Api.deleteUser
    },
    {
        method: 'GET',
        path: '/flags',
        handler: Api.getFlags
    },
    {
        method: 'POST',
        path: '/flags',
        handler: Api.createFlag
    },
    {
        method: 'PUT',
        path: '/flags/{flagID}',
        handler: Api.editFlag
    },
    {
        method: 'GET',
        path: '/flags/{clientID}',
        handler: Api.getClientFlags
    },
    {
        method: 'POST',
        path: '/files',
        config: {
            payload: {
                maxBytes: 209715200,
                //output: 'stream',
                //parse: false
            }
        },
        handler: Api.uploadFile
    },
    {
        method: 'GET',
        path: '/files/{clientID}',
        handler: Api.getClientFiles
    },
    {
        method: 'GET',
        path: '/files/profile_picture/{clientID}',
        handler: Api.getProfilePicture
    },
    {
        method: 'GET',
        path: '/programs',
        handler: Api.getPrograms
    },
    {
        method: 'POST',
        path: '/uploadSpreadsheet',
        handler: Api.uploadSpreadsheet
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
