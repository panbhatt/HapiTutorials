var Hapi = require('hapi');
var Blipp = require('blipp') ;
var UserPlugin = require('./plugins/User');

var server = new Hapi.Server();

server.connection({ port : 4000}) ;

server.route({
  method : 'GET',
  path : '/',
  handler : function(req,reply) {
    reply({ msg : 'First Mssage '}) ;
  }
});

server.register([Blipp,
     { register: UserPlugin, options : {}}]
      , (err) => {
         if(err) {

         }
      });


server.start((err)=> {
  if(err) {
    console.error("AN Error occured, while starting ") ;
  } else {
    console.log("Server Started :-> ", server.info.uri);
  }
})
