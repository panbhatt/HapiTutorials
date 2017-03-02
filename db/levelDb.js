
exports.register = function (server, options, next)  {
      let db ;

     server.dependency('hapi-level', function(server,after){
                 db = server.plugins['hapi-level'].db ;
           return after();
      });

      let getConnection = function() {
          return db;
      }

      server.expose({
        getConnection : getConnection
      });

      next();
};

exports.register.attributes = {
  name : "levelDb"
};
