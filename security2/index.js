var Hapi = require('hapi');
var Cookie = require('hapi-auth-cookie');
var Blipp = require('blipp');
var Routes = require('./routes');

var server = new Hapi.Server();
server.connection({
    port: 4000
});

server.register([
    Cookie,
    {
        register: Blipp,
        options: {
            showAuth: true
        }
    }

], (err) => {
    server.auth.strategy('cookieAuth', 'cookie', {
        cookie: 'PANKAJBHATTCK',
        password: 'PANKAJBHATTCKBHATPANKAJPANKAJBATTTHIRDTYOWO',
        isSecure: false,
        redirectTo: '/login',
        redirectOnTry: false
    });

    server.auth.default('cookieAuth');
    server.route(Routes);
    server.start((err) => {
        if (!err) console.log("Started at : -> ", server.info.uri);
        else console.log('Failed to start', err);
    });
});
