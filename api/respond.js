var respond = {
    failedToCreateClient: function (res, err) {
        res({
            statusCode: 500,
            message: "Unable to create client!",
            error: err
        }).code(500);
    },
    createdClient: function (res, result) {
        res({
            statusCode: 200,
            message: "Success creating client!",
            result: result
        }).code(200);
    },
    failedToGetAllCaseManagers: function (res, err) {
        res({
            statusCode: 500,
            message: "Unable to get case managers!",
            error: err
        }).code(500);
    },
    getAllCaseManagers: function (res, result) {
        res({
            statusCode: 200,
            message: "Success getting case managers!",
            result: result
        }).code(200);
    }
};

module.exports = respond;
