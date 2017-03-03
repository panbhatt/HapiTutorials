/// See https://github.com/hapijs/glue/blob/master/API.md  

var Glue = require('glue') ;
var Blipp = require('blipp') ;

var Hapi = require('hapi') ;
var Server = new Hapi.Server();

var manifest = {
     server : {},
     connections : [ {
        port: 4000
     }],
     registrations : [
       { plugin : { register : 'hapi-level', config : {valueEncoding : 'json'}}},
       { plugin :  { register : 'Blipp'}},
       { plugin :  { register : './db/levelDb'}},
       { plugin :  { register : './dao/userDao'}},
       { plugin :  { register : './handlers/user'}},
     ]
};

Glue.compose(manifest, { relativeTo : __dirname }, (err, server) => {
    server.start((err)=> {
        if(!err) {
          console.log("Server is running at " , server.info.uri) ;
        } else {
          console.log("AN Error occured, while strating the server " , err ) ;
        }
    });
});
