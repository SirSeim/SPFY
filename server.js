var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Inert = require('inert');
var Bcrypt = require('bcrypt');
var BasicAuth = require('hapi-auth-basic');
var Vision = require('vision');
var PostgreSQL = require('pg');

var setup = Config.get('Node');
var Api = require(Path.join(__dirname, 'routes/api_routes.js'));
var viewRoutes = require(Path.join(__dirname, 'routes/view_routes.js'));
var loginRoutes = require(Path.join(__dirname, 'routes/login_routes.js'));

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
    }
};
postgresqlPool.register.attributes = {
    name: "PostgreSQL",
    version: "0.0.0"
};

var users = {
    SPFY: {
        id: '1',
        username: 'SPFYstaff',
        password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG'
    }
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

SPFY.register(BasicAuth, function(err){
    if (err) {
        throw err;
    }

    var basicValidation = function (request, username, password, callback) {
        var user = users[ username ];

        if (!user) {
            return callback(null, false);
        }

        Bcrypt.compare(password, user.password, function (err, isValid) {
            callback(err, isValid, {id: user.id, name: user.name});
        });
    };

    SPFY.auth.strategy('basic','basic', { validateFunc: basicValidation });

    SPFY.route(loginRoutes);
});

SPFY.register(postgresqlPool, function () {});
SPFY.register(Api, {
    routes: {
        prefix: '/api'
    }
});

SPFY.register(Inert, function () {});
SPFY.register(Vision, function (err) {
    SPFY.views({
        engines: {
            html: require('nunjucks-hapi')
        },
        path: Path.join(__dirname, 'templates')
    });
    SPFY.route(viewRoutes);
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
            SPFY.log(['error', 'good'], err);
        }
    });
}

SPFY.start(function () {
    SPFY.log(['info', 'SPFY'], "Server started on " + setup.host + ":" + setup.port);
});

module.exports = SPFY;
