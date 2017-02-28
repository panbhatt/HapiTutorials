var Hapi = require('hapi');
var inert = require('inert') ;
var path = require('path') ;
var server = new Hapi.Server();


server.connection({ port : 4000});
server.register(inert, (err) => {
    server.route({
       method : "GET",
       path : '/files/{f*}',
       handler : {
         directory : {
           path : './',
           listing : true
         }
       }
    });
});

// I talso add a decorator reply.file with the path of the file. 

server.route({
  method : 'GET',
  path : '/',
  config : {
    handler : function(req,reply){
      return reply({ msg : "Successful"}) ;
    }
  }
});

server.start((err) => {
  if(err) {
    console.error("Error occured. ") ;
  } else {
    console.log("Start successfully -> ", server.info.uri);
  }
})
