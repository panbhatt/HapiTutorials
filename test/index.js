var Code = require('code');
var Lab = require('lab') ;

const lab = exports.lab = Lab.script();

  lab.experiment('First Test', () => {
    lab.test('fails here', (done) => {
      Code.expect(false).to.be.true();
      return done();
    });

    lab.test('Pass here', (done) => {
      Code.expect(true).to.be.true();
      return done(); 
    })

  });
