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
        path: '/casemanagerhomepage',
        method: 'GET',
        handler: function (req, res) {
            res.view('casemanagerhomepage.html', {

            });
        }
    },

    {
        path: '/casenotepage',
        method: 'GET',
        handler: function (req, res) {
            res.view('casenotepage.html', {

            });
        }
    },

    {
        path: '/frontdeskhomepage',
        method: 'GET',
        handler: function (req, res) {
            res.view('frontdeskhomepage.html', {

            });
        }
    },

    {
        path: '/outreachhomepage',
        method: 'GET',
        handler: function (req, res) {
            res.view('outreachhomepage.html', {

            });
        }
    },

    {
        path: '/addnewclient',
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
