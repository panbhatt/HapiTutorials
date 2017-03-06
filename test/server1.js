var Code = require('code') ;
var Lab = require('lab') ;

const server = require('./../lib/server1');

var lab = exports.lab = Lab.script() ;

lab.experiment('Test Server /json path ', () => {

  lab.test('/json base path ', (done) => {
    server.inject('/json', (res) => {
      Code.expect(res.result).to.be.equal('Pankaj Bhatt') ;
      Code.expect(res.statusCode).to.be.equal(200);
      return done();
    })
  })

 lab.test('/ path ', (done) => {
   server.inject('/',(res) => {
      Code.expect(res.statusCode).to.be.equal(404);
      return done(); 
   })
 })

})
