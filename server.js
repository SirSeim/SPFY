var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Inert = require('inert');
var Vision = require('vision');
var MySQL = require('mysql');

var setup = Config.get('Node-Server');
var Api = require(Path.join(__dirname, 'routes/api_routes.js'));
var viewRoutes = require(Path.join(__dirname, 'routes/view_routes.js'));

var mysqlConnection = {
    register: function (server, options, next) {
        var dbconfig = Config.get('MySQL-Server');
        var connection = MySQL.createConnection(dbconfig);
        connection.connect(function (err) {
            if (err) {
                server.log(['MySQL', 'error'], err);
                return next(err);
            }
            server.log(['MySQL', 'info'], 'Connected to MySQL server at ' +
                dbconfig.host + ':' + dbconfig.port);

            server.decorate('server', 'mysql', connection);
            server.decorate('request', 'mysql', connection);
            server.on('stop', function () {
                connection.end(function (err) {
                    if (err) {
                        server.log(['MySQL', 'error'], err);
                    }
                    server.log(['MySQL', 'info'], 'Graceful disconnect from MySQL');
                });
            });
            next();
        });
    }
};
mysqlConnection.register.attributes = {
    name: "MySQL-Connection",
    version: "0.0.0"
};



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

SPFY.register(mysqlConnection, function () {});
SPFY.register(Api, {
    routes: {
        prefix: '/api'
    }
});

SPFY.register(Inert, function () {});
Service_App.register(Vision, function (err) {
    Service_App.views({
        engines: {
            html: require('nunjucks-hapi')
        },
        path: Path.join(__dirname, 'templates')
    });
    Service_App.route(viewRoutes);
});

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
