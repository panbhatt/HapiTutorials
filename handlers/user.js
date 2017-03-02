var Boom = require('boom') ;


exports.register = function(server,options, next) {

   let userGet, userInsert ;

   server.dependency(['userDao'], function(server,after){

      userGet = server.plugins['userDao'].getUser;
      userInsert = server.plugins['userDao'].insertUser;

      return after();
   });

   server.route({
       method : 'GET',
       path : '/user/{userId}',
       config : {
            description : "Retrive the user via its userID" ,
            handler : function(req, reply) {
              var userId = req.params['userId'] ;
                userGet(userId, function(err, user) {
                   console.log("Err = " , err , " User = " , user) ;
                  if(err) {

                    return reply(Boom.notFound("Erroroccured please try again. ")) ;
                  } else {
                    if(user) return reply(user);
                    else return reply(Boom.notFound("User not found")) ;
                  }
                });
            }
       }
   });


   server.route({
     method : 'POST',
     path : '/user',
     config : {
       description: "To Create an user",
       handler : function(req,reply) {
         var body = req.payload ;
         console.log("COMING HERE ") ;
         userInsert(body,function(err,user){
           if(!err) {
              return reply(user);
           } else {
             return reply(Boom.entityTooLarge('too big'));
           }
         })
       }
     }
   })

   next();

}

exports.register.attributes = {
  name : 'userRoute'
}
