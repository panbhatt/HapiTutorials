'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection( {
        port : 4000
});

server.route({
     method : 'GET',
     path : '/',
     handler : function(req, reply) {
       reply(" Hello, I am back again.  ") ;
     }
});


server.route({
     method : 'GET',
     path : '/json',
     handler : function(req, reply) {
       reply({
         name : 'PANKAJ BHATT',
         salary : Math.random() * 100000000
       }) ;
     }
});



// PLUGINS for registrations.

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./awesome_log']
        }] 
    }
};


server.register( {
    register : require('good'),
    options
}, (err) => {
     if(err) {
       console.error('There is an error while registering the Good plugin. ');
     } else {
       console.log("GOOD Plugin register");
     }
})










server.start((err)=> {
    if(err) {
      console.log("Unable to strat the server ") ;
    } else {
      console.log("Server has been started at : " , server.info) ;
    }
});
