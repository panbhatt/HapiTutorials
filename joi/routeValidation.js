var Joi = require('joi');

var Hapi = require('hapi');
var Blipp = require('blipp');

var server = new Hapi.Server();

server.connection({
    port: 4000
});

server.register(Blipp);

server.route({
    method: 'GET',
    path: '/user/{userId}',
    config: {
        validate: {
            headers: true,
            params: {
                userId: Joi.string().min(5).max(10).required()
            },
            query: false
        },
        handler: function(req, reply) {
            return rpely("You successfully reached to the handler ");
        }
    }
});

server.start((err) => {
    if (err) console.log('error', "Unable to start the server ");
    else console.log('info', "Server Started at :-> ", server.info.uri);
})
