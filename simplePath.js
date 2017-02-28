var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({port: 4000}) ;

// Addingmethod to server
server.ext('onRequest', function(req,reply) {
  console.log("Request received ") ;
  return reply.continue();
});

const hello = function(name) { return this.response({name})} ;
server.decorate('reply', 'hello', hello);

server.route({
  method : "GET",
  path : '/',
  handler : function(request,reply) {

    //return reply({ msg : "Successfully"}) ;
    return reply(new Error("Some Error occured")) ;
  }
});

server.route({
  method : "GET",
  path : '/decorate',
  handler : function(request,reply) {

    //return reply({ msg : "Successfully"}) ;
    return reply.hello(Math.random());
  }
});

server.start((err)=> {
     if(err) {
       console.log("Error strating hapi") ;
     } else {
       console.log("Serer Info URI -> " , server.info.uri) ;
     }
})
