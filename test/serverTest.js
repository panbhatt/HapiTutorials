var Code = require('code') ;
var Lab = require('lab') ;
var Hapi = require('hapi') ;

var lab = exports.lab = Lab.script();

lab.experiment('starting server ' , ()=> {

  var server = new Hapi.Server();
  server.connection();
  server.route({
    method : 'GET',
    path : '/',
    config : {
      handler : function(req,reply) {
        return reply('Hello World') ;
      }
    }
  });


  lab.test('Check Base path', (done) => {
      server.inject('/',(res)=>{
        Code.expect(res.statusCode).to.be.equal(200);
        Code.expect(res.result).to.be.equal('Hello World') ;
        return done();

      }) ;

  })

});
