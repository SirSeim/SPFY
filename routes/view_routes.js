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
        path: '/dropin',
        method: 'GET',
        handler: function (req, res) {
            res.view('dropin.html', {

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
            res.view('modals/addnewclient.html', {

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
    },

    {
        path: '/edit_client',
        method: 'GET',
        handler: function (req, res) {
            res.view('editclient.html', {
                
            });
        }
    },

    {
        path: '/edit_client',
        method: 'POST',
        handler: function (req, res) {
            res.view('editclient.html', {

            });
        }
    },

    {
        path: '/login',
        method: 'GET',
        handler: function (req, res) {
            res.view('login.html', {

            });
        }
    }
];

module.exports = viewRoutes;
