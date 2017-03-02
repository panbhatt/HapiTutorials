var Hapi = require('hapi') ;
var Blipp = require('blipp') ;

var Server = new Hapi.Server();

Server.connection({ port : 4000}) ;

Server.register([
  Blipp,
  { register : require('hapi-level'), options: { config : { valueEncoding : 'json'}}},

  {register : require('./db/levelDb') },
   { register : require('./dao/userDao')},
  { register : require('./handlers/user')}
],  (err)=> {

    if(err){
      console.error("An Error occured, while loading all the plugins. ") ;
    } else {
      console.log("Starting the server ") ;
      Server.start((err)=> {
        if(err) {
          console.log("Error occured, while starting the server ", err ) ;
        } else {
          console.log("Server Started at " , Server.info.uri) ;
        }
      });
    }
});

//Server.register[]
