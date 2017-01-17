var viewRoutes = [
    {
        path: '/static/{path*}',
        method: 'GET',
        config: {
            auth: false
        },
        handler: {
            file: function (req) {
                return req.params.path;
            }
        }
    },

    {
        path: '/',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('index.html', {

            });
        }
    },

    {
        path: '/case_manager',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('casemanagerhomepage.html', {

            });
        }
    },

    {
        path: '/case_notes',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('casenotepage.html', {

            });
        }
    },

    {
        path: '/frontdesk',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('frontdeskhomepage.html', {

            });
        }
    },

    {
        path: '/dropin',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('dropin.html', {

            });
        }
    },

    {
        path: '/outreach',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('outreachhomepage.html', {

            });
        }
    },

    {
        path: '/add_client',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('modals/addnewclient.html', {

            });
        }
    },

    {
        path: '/search',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('search.html', {

            });
        }
    },

    {
        path: '/edit_client',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('editclient.html', {

            });
        }
    },

    {
        path: '/edit_client',
        method: 'POST',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('editclient.html', {

            });
        }
    },

    {
        path: '/login',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('login.html', {

            });
        }
    },

    {
        path: '/settings',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('settings.html', {

            });
        }
    },

    {
        path: '/profile',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('profile.html', {
                
            });
        }
    }
];

module.exports = viewRoutes;
