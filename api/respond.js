var respond = {
    failedToCreateClient: function (reply, err, string) {
        reply({
            statusCode: 500,
            message: "Unable to create client!",
            error: err,
            queryString: string
        }).code(500);
    },
    createdClient: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success creating client!",
            result: result
        }).code(200);
    },
    failedToGetAllCaseManagers: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get case managers!",
            error: err
        }).code(500);
    },
    getAllCaseManagers: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting case managers!",
            result: result
        }).code(200);
    },
    failedToGetClient: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client!",
            error: err
        }).code(500);
    },
    getClient: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting client!",
            result: result
        }).code(200);
    },
    searchClient: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success searching clients",
            result: result
        }).code(200);
    },
    failedToSearchClient: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to search client!",
            error: err
        }).code(500);
    },

    failedToGetClients: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get clients!",
            error: err
        }).code(500);
    },

    gotClients: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting clients!",
            result: result
        }).code(200);
    },
    failedToCreateDropIn: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create dropin!",
            error: err
        }).code(500);
    },
    createDropIn: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success creating dropin!",
            result: result
        }).code(200);
    },
    failedToGetDropIns: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get dropins!",
            error: err
        }).code(500);
    },
    gotDropIns: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting dropins!",
            result: result
        }).code(200);
    },
    badGetDropIns: function (reply, reason) {
        reply({
            statusCode: 400,
            message: "Bad request for getting dropins!",
            error: reason
        }).code(400);
    },
    failedTocreateDropIns: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get dropins!",
            error: err
        }).code(500);
    },
    createDropIns: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting dropins!",
            result: result
        }).code(200);
    },
    failedToGetDropinActivities: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get activities!",
            error: err
        }).code(500);
    },
    gotDropinActivities: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting activities!",
            result: result
        }).code(200);
    },
    failedToAddActivitiesToDropIn: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to add activities to dropin!",
            error: err
        }).code(500);
    },
    gotAddActivitiesToDropIn: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully added activities to dropin!",
            result: result
        }).code(200);
    },
    failedToRemoveActivitiesFromDropin: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to remove activities from dropin!",
            error: err
        }).code(500);
    },
    removeActivitiesFromDropin: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully removed activities from dropin!",
            result: result
        }).code(200);
    },
    failedToGetDropinActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get activity for dropin!",
            error: err
        }).code(500);
    },
    getDropinActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got activity for dropin!",
            result: result
        }).code(200);
    },
    failedToGetDropinActivityEnrollment: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get enrollment for activity for dropin!",
            error: err
        }).code(500);
    },
    getDropinActivityEnrollment: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got enrollment for activity for dropin!",
            result: result
        }).code(200);
    },
    failedToAddEnrollmentToDropinActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to add enrollment for activity for dropin!",
            error: err
        }).code(500);
    },
    addEnrollmentToDropinActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully added enrollment for activity for dropin!",
            result: result
        }).code(200);
    },
    failedToGetDropinEnrollment: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get dropin enrollment!",
            error: err
        }).code(500);
    },
    getDropinEnrollment: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting dropin enrollment!",
            result: result
        }).code(200);
    },
    failedToGetAllActivities: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get activities!",
            error: err
        }).code(500);
    },
    getAllActivities: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting activities!",
            result: result
        }).code(200);
    },
    failedToGetActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get activity!",
            error: err
        }).code(500);
    },
    getActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting activity!",
            result: result
        }).code(200);
    },
    failedToGetActivityDropIns: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get activity dropins!",
            error: err
        }).code(500);
    },
    gotActivityDropIns: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting activity dropins!",
            result: result
        }).code(200);
    },
    failedToEditClient: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit client!",
            error: err
        }).code(500);
    },
    editClient: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success editing client!",
            result: result
        }).code(200);
    },
    failedToCreateActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create activity!",
            error: err,
        }).code(500);
    },
    createActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success creating activity!",
            result: result
        }).code(200);
    },
    editActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success editing activity!",
            result: result
        }).code(200);
    },
    failedToEditActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit activity!",
            error: err
        }).code(500);
    },
    enroll: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success enrolling!",
            result: result
        });
    },
    failedToGetEnrollmentByActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get enrollment by activity!",
            error: err
        }).code(500);
    },
    getEnrollmentByActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting enrollment by activity!",
            result: result
        }).code(200);
    },
    failedToEnroll: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to enroll!",
            error: err
        }).code(500);
    },
    failedToRemoveEnrollmentToDropinActivity: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to checkout clients from dropin!",
            error: err
        }).code(500);
    },
    removeEnrollmentToDropinActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success removing enrollment!",
            result: result
        }).code(200);
    },
    failedToAddCheckinForDropin: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to check-in!",
            error: err
        }).code(500);
    },
    addCheckinForDropin: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success checking in!",
            result: result
        }).code(200);
    },
    failedToGetCheckInForDropin: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get checkin!",
            error: err
        }).code(500);
    },
    getCheckInForDropin: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting checkin!",
            result: result
        }).code(200);
    },
    failedToRemoveCheckinForDropin: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to checkout clients from dropin!",
            error: err
        }).code(500);
    },
    removeCheckinForDropin: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success checking out clients from dropin!",
            result: result
        }).code(200);
    },
    dataBrowserGetClients: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got all clients.",
            result: result
        }).code(200);
    },
    dataBrowserSearchClients: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client.",
            result: result
        }).code(200);
    },
    failedToCreateCaseNote: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create case note!",
            error: err
        }).code(500);
    },
    createCaseNote: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created case note.",
            result: result
        }).code(200);
    },
    failedToGetClientCaseNotes: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client's case notes!",
            error: err
        }).code(500);
    },
    getClientCaseNotes: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client's case notes!",
            result: result
        }).code(200);
    },
    failedToGetCaseNote: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get case note!",
            error: err
        }).code(500);
    },
    getCaseNote: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got case note!",
            result: result
        }).code(200);
    },
    failedToEditCaseNote: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit case note!",
            error: err
        }).code(500);
    },
    editCaseNote: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited case note.",
            result: result
        }).code(200);
    },
    failedToGetUsers: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get Users!",
            error: err
        }).code(500);
    },
    gotUsers: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got Users!",
            result: result
        }).code(200);
    },
    failedToGetUserByQuery: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get User!",
            error: err
        }).code(500);
    },
    gotUserByQuery: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got User!",
            result: result
        }).code(200);
    },
    noUserByQueryFound: function (reply) {
        reply({
            statusCode: 404,
            message: "No such User found!"
        }).code(404);
    },
    failedToCreateUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create User!",
            error: err
        }).code(500);
    },
    usernameAlreadyExists: function (reply) {
        reply({
            statusCode: 401,
            message: "Username already exists!"
        }).code(401);
    },
    createdUser: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created User!",
            result: result
        }).code(200);
    },
    userDoesNotExist: function (reply) {
        reply({
            statusCode: 404,
            message: "Username does not exist!"
        }).code(404);
    },
    getUser: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got User!",
            result: result
        }).code(200);
    },
    failedToUpdateUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to update User!",
            error: err
        }).code(500);
    },
    updateUser: function (reply, result, token) {
        reply({
            statusCode: 200,
            message: "Successfully updated User!",
            result: result
        }).code(200).header("Authorization", token);
    },
    failedToComparePasswords: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to compare passwords!",
            error: err
        }).code(500);
    },
    userPassNoMatch: function (reply) {
        reply({
            statusCode: 401,
            message: "Username or Password do not match!"
        }).code(401);
    },
    failedToGenToken: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to generate token!",
            error: err
        }).code(500);
    },
    loggedIn: function (reply, token, userID) {
        reply({
            statusCode: 200,
            message: "Successfully logged in!",
            result: userID
        }).code(200).header("Authorization", token);
    },
    failedToGetUsersNotifications: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get user notifications!",
            error: err
        }).code(500);
    },
    getUsersNotifications: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got user notifications!",
            result: result
        }).code(200);
    },
    failedToCreateNotification: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create a new notification for a user",
            error: err
        }).code(500);
    },
    createNotification: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created a new notification for a user!",
            result: result
        }).code(200);
    },
    noSuchUserExists: function (reply) {
        reply({
            statusCode: 404,
            message: "User does not exist!"
        }).code(404);
    },
    passNoMatch: function (reply) {
        reply({
            statusCode: 401,
            message: "Passwords do not match!"
        }).code(401);
    },
    failedToGetNotificationById: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get the notification!",
            error: err
        }).code(500);
    },
    noSuchNotificationExists: function (reply) {
        reply({
            statusCode: 404,
            message: "No such notification for that user!"
        }).code(404);
    },
    getUsersNotificationsById: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got notification!",
            result: result
        }).code(200);
    },
    failedToUpdateUsersNotification: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to update the notification!",
            error: err
        }).code(500);
    },
    updateUsersNotification: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully updated notification for user!",
            result: result
        }).code(200);
    },
    failedToGetNotificationTypes: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get notification types!",
            error: err
        }).code(500);
    },
    getNotificationTypes: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got notification types!",
            result: result
        }).code(200);
    },
    failedGetUserSettings: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get user settings!",
            error: err
        }).code(500);
    },
    getUserSettings: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got user settings!",
            result: result
        }).code(200);
    },
    failedToChangeUserPassword: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to change User password!",
            error: err
        }).code(500);
    },
    changeCurrentUserPassword: function (reply, result, token) {
        reply({
            statusCode: 200,
            message: "Successfully changed User password!",
            result: result
        }).code(200).header("Authorization", token);
    },
    failedToGetCasePlan: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client's case plan!",
            error: err
        }).code(500);
    },
    getCasePlan: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client's case plan.",
            result: result
        }).code(200);
    },
    failedToEditCasePlan: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit case plan!",
            error: err
        }).code(500);
    },
    editCasePlan: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited case plan.",
            result: result
        }).code(200);
    },
    failedToCreateCasePlan: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create case plan!",
            error: err
        }).code(500);
    },
    createCasePlan: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created case plan.",
            result: result
        }).code(200);
    },
    failedToDeleteUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete User!",
            error: err
        }).code(500);
    },
    deleteUser: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted User!",
            result: result
        }).code(200);
    },
    // failedToGetStatuses: function (reply, err) {
    //     reply({
    //         statusCode: 500,
    //         message: "Unable to get statuses!",
    //         error: err
    //     }).code(500);
    // },
    // getStatuses: function (reply, result) {
    //     reply({
    //         statusCode: 200,
    //         message: "Successfully got statuses!",
    //         result: result
    //     }).code(200);
    // },
    // failedToCreateStatus: function (reply, err) {
    //     reply({
    //         statusCode: 500,
    //         message: "Unable to create status!",
    //         error: err,
    //     }).code(500);
    // },
    // createStatus: function (reply, result) {
    //     reply({
    //         statusCode: 200,
    //         message: "Success creating status!",
    //         result: result
    //     }).code(200);
    // },
    // failedToEditStatus: function (reply, err) {
    //     reply({
    //         statusCode: 500,
    //         message: "Unable to edit status!",
    //         error: err,
    //     }).code(500);
    // },
    // editStatus: function (reply, result) {
    //     reply({
    //         statusCode: 200,
    //         message: "Success editing status!",
    //         result: result
    //     }).code(200);
    // },
    failedToGetFlagTypes: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get flag types!",
            error: err
        }).code(500);
    },
    getFlagTypes: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got flag types!",
            result: result
        }).code(200);
    },
    failedToGetFlags: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get flags!",
            error: err
        }).code(500);
    },
    getFlags: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got flags!",
            result: result
        }).code(200);
    },
    failedToCreateFlagType: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create flag type!",
            error: err,
        }).code(500);
    },
    createFlagType: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success creating flag type!",
            result: result
        }).code(200);
    },
    failedToEditFlagType: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit flag type!",
            error: err,
        }).code(500);
    },
    editFlagType: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success editing flag type!",
            result: result
        }).code(200);
    },
    failedToGetClientFlags: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client flags!",
            error: err,
        }).code(500);
    },
    getClientFlags: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting client flags!",
            result: result
        }).code(200);
    },
    failedToSetClientFlag: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to set client flag!",
            error: err,
        }).code(500);
    },
    setClientFlag: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success setting client flag!",
            result: result
        }).code(200);
    },
    failedToEditClientFlag: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit client flag!",
            error: err,
        }).code(500);
    },
    editClientFlag: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success editing client flag!",
            result: result
        }).code(200);
    },
    failedToUploadFile: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to upload file",
            error: err
        }).code(500);
    },
    uploadFile: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully uploaded file",
            result: result
        }).code(200);
    },
    failedToGetClientFiles: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client's files",
            error: err
        }).code(500);
    },
    getClientFiles: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client's files",
            result: result
        }).code(200);
    },
    failedToGetProfilePicture: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client's profile picture",
            error: err
        }).code(500);
    },
    getProfilePicture: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client's profile picture",
            result: result
        }).code(200);
    },
    failedToDeleteFile: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete file",
            error: err
        }).code(500);
    },
    deleteFile: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted file",
            result: result
        }).code(200);
    },
    failedToGetPrograms: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get programs",
            error: err
        }).code(500);
    },
    getPrograms: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got programs",
            result: result
        }).code(200);
    },
    failedToGetAllFollowUps: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get all followups",
            error: err
        }).code(500);
    },
    getAllFollowUps: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got all followups",
            result: result
        }).code(200);
    },
    failedToGetFollowUp: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get followup",
            error: err
        }).code(500);
    },
    getFollowUp: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got followup",
            result: result
        }).code(200);
    },
    failedToGetCaseManagerFollowUps: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get case manager followups",
            error: err
        }).code(500);
    },
    getCaseManagerFollowUps: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got case manager followups",
            result: result
        }).code(200);
    },
    failedToEditFollowUp: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit follow up",
            error: err
        }).code(500);
    },
    editFollowUp: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited follow up",
            result: result
        }).code(200);
    },
    failedToCreateFollowUp: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create follow up",
            error: err
        }).code(500);
    },
    createFollowUp: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created follow up",
            result: result
        }).code(200);
    },
    failedToDeleteFollowUp: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete follow up",
            error: err
        }).code(500);
    },
    deleteFollowUp: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted follow up",
            result: result
        }).code(200);
    },
    failedToUploadSpreadsheet: function (reply, result) {
        reply({
            statusCode: 500,
            message: "Failed to upload spreadsheet",
            result: result
        }).code(500);
    },
    uploadSpreadsheet: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully uploaded spreadsheet",
            result: result
        }).code(200);
    }
};

module.exports = respond;
