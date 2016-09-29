var loginRoutes = [
    {
        path: '/login',
        method: 'GET',
        config: {
            auth: 'simple',
            handler: function(req ,reply){
                reply('Yeah! This message is only available for authenticated users!');
            }
        }
    },
];

module.exports = loginRoutes;
