var Hapi = require('hapi');
var Blipp = require('blipp');
var Basic = require('hapi-auth-basic');
var HapiRbac = require('hapi-rbac');
var Tv = require('tv');

var server = new Hapi.Server();

server.connection({
    port: 3000
});

server.route({
    method: 'GET',
    path: '/admin',
    config: {
        handler: function(req, reply) {
            return reply("U Got access, clever man");
        }
    }
});



server.register([
        Blipp,
        Basic,
        require('inert'),
        require('vision'),
        {
            register: Tv,
            options: {
                endpoint: '/awesome'
            }
        }
    ],
    (err) => {



        server.start((err) => {
            if (!err) console.log('Server starts at :-> ', server.info.uri);
            else console.log('An Error occured, while playing with the server  ', err);
        })


    });
