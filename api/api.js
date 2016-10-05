var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));

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
