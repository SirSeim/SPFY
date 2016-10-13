var respond = {
    failedToCreateClient: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create client!",
            error: err
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
            message: "Unable to get clients!",
            error: err
        }).code(500);
    },
    getClient: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting clients!",
            result: result
        }).code(200);
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
    }
};

module.exports = respond;
