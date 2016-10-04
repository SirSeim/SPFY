var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js')); // jshint ignore:line
var Respond = require(Path.join(__dirname, 'respond.js')); // jshint ignore:line

var api = {
    createClient: function (req, res) {
        Service.createClient(req.postgres, req.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateClient(res, err);
            } else {
                Respond.createdClient(res, result);
            }
        });
    }
};

module.exports = api;
