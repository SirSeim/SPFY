var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));

// these functions get called from routes/api_routes.js
var api = {
    createClient: function (req, res) {
        Service.createClient(req.postgres, req.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateClient(res, err);
            } else {
                Respond.createdClient(res, result);
            }
        });
    },

    getAllCaseManagers: function (req, res) {
        Service.getAllCaseManagers(req.postgres, req.payload, function (err, result) {
            if (err) {
                Respond.failedToGetAllCaseManagers(res, err);
            } else {
                Respond.getAllCaseManagers(res, result);
            }
        });
    }
};

module.exports = api;
