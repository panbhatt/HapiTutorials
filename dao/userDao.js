var uuid = require('uuid') ;


exports.register = function(server, options,next) {

    let getDBConn;
  server.dependency('levelDb',function(server,after){

      console.log("LevelDB is registered as dependency to UserDAO") ;
      getDBConn = server.plugins['levelDb'].getConnection ;
      return after();

  });

  var insertUser = function(user, callback) {
      var id = uuid.v4();
      user._id = id ;
      (getDBConn()).put(id, user, (err) => {
        if(err)
        console.error("An Error occured, while adding the data to leveldb") ;
        callback(err,user);
      });
  };


  var getUser = function(userId, callback) {
    if(getDBConn) {
    (getDBConn()).get(userId, (err, user) => {
          callback(err,user);
        });
      }

    };

     server.expose({
       insertUser,
       getUser
     });

     next();

};

exports.register.attributes = {
  name : 'userDao'
};
