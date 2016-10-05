var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Inert = require('inert');
var PostgreSQL = require('pg');

var setup = Config.get('Node');
var Api = require(Path.join(__dirname, 'routes/api_routes.js'));
var viewRoutes = require(Path.join(__dirname, 'routes/view_routes.js'));

var postgresqlPool = {
    register: function (server, options, next) {
        var dbconfig = Config.get('PostgreSQL');

        var pool = new PostgreSQL.Pool(dbconfig);

        server.decorate('server', 'postgres', pool);
        server.decorate('request', 'postgres', pool);

        pool.on('error', function (err, client) {
            server.log(['error', 'PostgreSQL'], err);
            server.log(['error', 'PostgreSQL'], client);
        });

        next();

        // var connection = MySQL.createConnection(dbconfig);
        // connection.connect(function (err) {
        //     if (err) {
        //         server.log(['MySQL', 'error'], err);
        //         return next(err);
        //     }
        //     server.log(['MySQL', 'info'], 'Connected to MySQL server at ' +
        //         dbconfig.host + ':' + dbconfig.port);

        //     server.decorate('server', 'mysql', connection);
        //     server.decorate('request', 'mysql', connection);
        //     server.on('stop', function () {
        //         connection.end(function (err) {
        //             if (err) {
        //                 server.log(['MySQL', 'error'], err);
        //             }
        //             server.log(['MySQL', 'info'], 'Graceful disconnect from MySQL');
        //         });
        //     });
        //     next();
        // });
    }
};
postgresqlPool.register.attributes = {
    name: "PostgreSQL",
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

SPFY.register(postgresqlPool, function () {});
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
            SPFY.log(['error', 'good'], err);
        }
    });
}

SPFY.start(function () {
    SPFY.log(['info', 'SPFY'], "Server started on " + setup.host + ":" + setup.port);
}); 

module.exports = SPFY;
