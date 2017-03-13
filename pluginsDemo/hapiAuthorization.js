var Hapi = require('hapi');
var Blipp = require('blipp');
var Basic = require('hapi-auth-basic');
var HapiAuthorization = require('hapi-authorization');

var server = new Hapi.Server();

server.connection({
    port: 4000
});

server.route({
    method: 'GET',
    path: '/admin',
    config: {
        plugins: {
            'hapiAuthorization': {
                role: 'ADMIN'
            }
        },
        handler: function(req, reply) {
            return reply({
                'msg': 'Only Admin is being allowed to acccess this role '
            });
        }
    }
});

server.route({
    method: 'GET',
    path: '/owner',
    config: {
        plugins: {
            'hapiAuthorization': {
                roles: ['OWNER']
            }
        },
        handler: function(req, reply) {
            return reply({
                'msg': 'Only OWNER is being allowed to acccess this role '
            });
        }
    }
});

server.register([
    Basic,
    {
        register: Blipp,
        options: {
            showAuth: true
        }
    }, {
        register: HapiAuthorization,
        options: {
            roles: ['ADMIN', 'MANAGER', 'EMPLOYEE', 'CUSTOMER']
        }
    }
], (err) => {

    var basicConfig = {
        validateFunc: function(req, userName, pwd, callback) {
            if (userName == 'admin' && pwd == 'admin') {
                return callback(null, true, {
                    username: 'admin',
                    role: ['ADMIN', 'MANAGER']
                });
            } else if (userName == 'owner' && pwd == 'owner') {
                return callback(null, true, {
                    username: 'owner',
                    role: ['OWNER']
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
