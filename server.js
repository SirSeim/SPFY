var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Inert = require('inert');

var setup = Config.get('Node-Server');
var Api = require(Path.join(__dirname, 'routes/api_routes.js'));
var viewRoutes = require(Path.join(__dirname, 'routes/view_routes.js'));

var SPFY = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'static')
            }
        }
    }
});
SPFY.connection({
    host: setup.host,
    port: setup.port
});

SPFY.register(Api, {
    routes: {
        prefix: '/api'
    }
});

SPFY.register(Inert, function () {});
SPFY.route(viewRoutes);

if (setup.logToConsole) {
    SPFY.register({
        register: require('good'),
        options: {
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
            }
        }
    }, function (err) {
        if (err) {
            console.error(err);
            throw err;
        }
    });
}

SPFY.start(function () {
    console.log("Server started on %s:%s", setup.host, setup.port);
}); 

module.exports = SPFY;
