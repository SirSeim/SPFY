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
    failedToGetUserByUsername: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get User!",
            error: err
        }).code(500);
    },
    gotUserByUsername: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got User!",
            result: result
        }).code(200);
    },
    noUserByUsernameFound: function (reply) {
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
    failedToComparePasswords: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to compare passwords!",
            error: err
        }).code(500);
    },
    userPassNoMatch: function (reply) {
        res({
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
    loggedIn: function (reply, token) {
        reply({
            statusCode: 200,
            message: "Successfully logged in!"
        }).code(200).header("Authorization", token);
    }

};

module.exports = respond;
