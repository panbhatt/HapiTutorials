var Hapi = require('hapi');
var Blipp = require('blipp');
var Basic = require('hapi-auth-basic');
var HapiRbac = require('hapi-rbac');

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
        {
            register: HapiRbac,
            options: {
                policy: {
                    target: {
                        'credentials:group': 'writer'
                    },
                    apply: 'deny-overrides',
                    rules: [{
                            target: {
                                'credentials:username': 'owner'
                            },
                            effect: 'deny'
                        },
                        {
                            effect: 'permit'
                        }
                    ]
                }
            }
        }
    ],
    (err) => {

        var basicConfig = {
            validateFunc: function(req, userName, pwd, callback) {
                if (userName == 'admin' && pwd == 'admin') {
                    return callback(null, true, {
                        username: 'admin',
                        role: ['ADMIN', 'MANAGER'],
                        group: 'writer'
                    });
                } else if (userName == 'owner' && pwd == 'owner') {
                    return callback(null, true, {
                        username: 'owner',
                        role: ['OWNER'],
                        group: 'writer'
                    });
                } else {
                    return callback(null, false);
                }
            }
        };


        server.auth.strategy('BasicAuth', 'basic', basicConfig);
        server.auth.default('BasicAuth');
        server.start((err) => {
            if (!err) console.log('Server starts at :-> ', server.info.uri);
            else console.log('An Error occured, while playing with the server  ', err);
        })


    });
