var Hapi = require('hapi') ;

var server = new Hapi.Server();

server.connection({ port: 4000}) ;

server.route({
  method : 'GET',
  path : '/json',
  handler : function(req,reply) {
    return reply('Pankaj Bhatt') ;
  }
});

module.exports = server ; 
