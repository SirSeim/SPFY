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
    gotAllCaseManagers: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Success getting case managers!",
            result: result
        }).code(200);
    }
};

module.exports = respond;
