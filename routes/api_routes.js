var apiRoutes = [
    {
        method: 'GET',
        path: '/api/hello',
        handler: function (req, res) {
            res({
                'hello': 'Welcome to the SPFY webapp!'
            }).code(200);
        }
    }
];

module.exports = apiRoutes;
