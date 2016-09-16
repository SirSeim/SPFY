var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Inert = require('inert');

var setup = Config.get('Node-Server');
var apiRoutes = require(Path.join(__dirname, 'routes/api_routes.js'));
var viewRoutes = require(Path.join(__dirname, 'routes/view_routes.js'));

var routes = [].concat(apiRoutes, viewRoutes);

var showServerRunInfo = function () {
    console.log("Server started on %s:%s", setup.host, setup.port);
};

var options = {
    ops: {
        interval: 1000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout']
    },
};

var registerCallback = function (err) {
    if (err) {
        console.error(err);
        throw err; // something bad happened loading the plugin
    }
};

var server = function (setup, routes, options, registerCallback) {
    var hapi = new Hapi.Server({
        connections: {
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, 'static')
                }
            }
        }
    });
    
    hapi.connection({
        host: setup.host,
        port: setup.port
    });

    hapi.register(Inert, function () {});

    hapi.route(routes);

    if (setup.logToConsole) {
        hapi.register({
            register: require('good'),
            options: options
        }, registerCallback);
    }

    return hapi;
};

var SPFY = server(setup, routes, options, registerCallback);
SPFY.start(showServerRunInfo); 

module.exports = SPFY;
