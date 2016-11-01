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
    failedToGetActivities: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get activities!",
            error: err
        }).code(500);
    },
    gotActivities: function (reply, result) {
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
    gotActivity: function (reply, result) {
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
    editActivity: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success editing activity!",
            result: result
        }).code(200);
    },
    failedToCheckIn: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to check-in!",
            error: err
        }).code(500);
    },
    checkin: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success checking in!",
            result: result
        }).code(200);
    },
    failedToGetCheckIn: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get checkin!",
            error: err
        }).code(500);
    },
    gotCheckIn: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting checkin!",
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
            message: "Successfully got client's case notes.",
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
    }

};

module.exports = respond;
