var Joi = require('joi');

var Hapi = require('hapi');
var Blipp = require('blipp');
var HapiSwagger = require('hapi-swagger');
var Inert = require('inert');
var Vision = require('vision');

var server = new Hapi.Server();

server.connection({
    port: 4000
});

server.register([
    Inert,
    Blipp,
    Vision,
    HapiSwagger
], (err) => {
    if (err) console.log(" An Error occured, while registering the plugins. ", err);

});

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
            return reply("You successfully reached to the handler ");
        },
        description: 'This will return a JSON based description of a User by UserID',
        tags: ['api']
    }
});

// Schema to be validated for the incoming request.
var userSchema = Joi.object().keys({
    username: Joi.string().min(4).max(10),
    password: Joi.string().min(8).required(),
    email: Joi.string().email(),
    meta: Joi.object()
}).xor('username', 'email').unknown();

// post method to accept user schema based object.
server.route({
    method: "POST",
    path: '/user',
    config: {
        validate: {
            headers: true,
            query: false,
            payload: userSchema
        },
        handler: function(req, reply) {
            var obj = {};
            obj.payload = req.payload;
            obj.status = 'success';
            return reply(obj);
        },
        description: 'This will create a new user in the system. ',
        tags: ['api']
    }
})

server.start((err) => {
    if (err) console.log('error', "Unable to start the server ");
    else console.log('info', "Server Started at :-> ", server.info.uri);
})
