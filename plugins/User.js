
exports.register = function(server,options, next){
    server.route({
      method : 'GET',
      path : '/hello',
      config : {
        handler : function(request, reply) {
          return reply({ "hello" : "Message User" + Math.random() * 100}) ;
        }
      }
    });

    next();

};

exports.register.attributes = {
  name : 'user'
}
