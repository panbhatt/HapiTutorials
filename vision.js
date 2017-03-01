var Hapi = require('hapi');
var vision = require('vision') ;
var path = require('path') ;
var blipp = require('blipp') ;
var server = new Hapi.Server();


server.connection({ port : 4000});
server.register(vision, (err) => {
    server.views({
      engines : {
        handlebars : {
          module : require('handlebars'),

        }
      },
      relativeTo : __dirname,
      path : 'templates'
    })
});

server.register(blipp,(err)=> {
   if(err){
     console.error("An Error occured, while registering blipp ") ;
   } else {
     console.log('Blipp Registered successfully ') ;
   }
})

// I talso add a decorator reply.file with the path of the file.

server.route({
  method : 'GET',
  path : '/',
  config : {
    handler : function(req,reply){

      let context = { name : "Pankaj Bhatt " , age : Math.random(40)};
      return reply.view('index', context ) ;
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
