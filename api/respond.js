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
    }
};

module.exports = respond;
