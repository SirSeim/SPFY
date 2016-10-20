var viewRoutes = [
    {
        path: '/static/{path*}',
        method: 'GET',
        handler: {
            file: function (req) {
                return req.params.path;
            }
        }
    },

    {
        path: '/',
        method: 'GET',
        handler: function (req, res) {
            res.view('index.html', {

            });
        }
    },

    {
        path: '/case_manager',
        method: 'GET',
        handler: function (req, res) {
            res.view('casemanagerhomepage.html', {

            });
        }
    },

    {
        path: '/case_notes',
        method: 'GET',
        handler: function (req, res) {
            res.view('casenotepage.html', {

            });
        }
    },

    {
        path: '/frontdesk',
        method: 'GET',
        handler: function (req, res) {
            res.view('frontdeskhomepage.html', {

            });
        }
    },

    {
        path: '/outreach',
        method: 'GET',
        handler: function (req, res) {
            res.view('outreachhomepage.html', {

            });
        }
    },

    {
        path: '/add_client',
        method: 'GET',
        handler: function (req, res) {
            res.view('addnewclient.html', {

            });
        }
    },

    {
        path: '/search',
        method: 'GET',
        handler: function (req, res) {
            res.view('search.html', {

            });
        }
    }
];

module.exports = viewRoutes;
