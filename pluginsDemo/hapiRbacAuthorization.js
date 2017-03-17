var Hapi = require('hapi');
var Blipp = require('blipp');
var Basic = require('hapi-auth-basic');
var HapiRbac = require('hapi-rbac');

var server = new Hapi.Server();

server.connection({
    port: 3000
});

// Only ADMIN will allow to access this url and  user name 'READER' will be returned with 403.
server.route({
    method: 'GET',
    path: '/admin',
    config: {
        handler: function(req, reply) {
            return reply("U Got access, clever man");
        },
        plugins: {
            rbac: {
                target: {
                    'credentials:group': 'reader'
                },
                apply: 'deny-overrides',
                rules: [{
                        target: {
                            'credentials:username': 'reader'
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
});

server.route({
    method: 'GET',
    path: '/public',
    config: {
        handler: function(req, reply) {
            return reply("This can be available to anyone");
        },
        plugins: {
            rbac: 'none'
        }
    }
})



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
                },
                responseCode: {
                    onDeny: 403,
                    onUndetermined: 403
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
                        group: 'reader'
                    });
                } else if (userName == 'reader' && pwd == 'reader') {

                    return callback(null, true, {
                        username: 'reader',
                        role: ['OWNER'],
                        group: 'reader'
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
