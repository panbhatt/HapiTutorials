var Hapi = require('hapi');
var Blipp = require('blipp') ;
var Basic = require('hapi-auth-basic') ;
var Routes = require('./routes') ;

var server = new Hapi.Server();

server.connection({ port : 4000}) ;
server.register([
  Basic,
  { register : Blipp, options: { showAuth : true } }
],(err) => {

    var basicConfig = {
      validateFunc : function(req,userName, pwd, callback){
        if(userName == 'admin' && pwd == 'admin') {
          return callback(null,true, {username : 'admin'}) ;
        } else {
          return callback(null,false);
        }
      }
    };


    server.auth.strategy('BasicAuth', 'basic', basicConfig);
    server.auth.default('BasicAuth') ;
    server.route(Routes);
    server.start((err)=> {
        if(!err) console.log('Server starts at :-> ' , server.info.uri);
        else console.log('An Error occured, while playing with the server  ');
    })


} );
