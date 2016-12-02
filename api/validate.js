module.exports = function (decoded, request, callback) {
    console.log(decoded);
    // console.log(request);
    // TODO: Look into what is in decoded & request
    // query the database for the user
    return callback(null, true);
};
