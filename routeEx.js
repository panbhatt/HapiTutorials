'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port : 4000}) ;


const func1 = function(request,reply) {
  reply("Function 1 ") ;
};

const func2 = function(request, reply){
  reply("Function 2") ;
}

const func3 = function(request, reply) {
  reply(' Reply ' + request.pre.msg1 + " : " + request.pre.msg2 + " / " + request.pre.func)
}

server.method('func', function(request, reply) {
    reply(' Bind Method') ;
})


server.route({
    method : ['GET', 'POST'],
    path : '/',
    handler : function(request, reply) {
       reply({ 'msg' : "hello world " + request.pre.msg3});
    },
    config : {
      // the first array on is going to be executed parallel and func3 is going to be executed
      pre : [ [{
          method : func1,
          assign : 'msg1'
      },
      {
        method : func2,
        assign : 'msg2'
      },
      {
        method : 'func'
      }
    ], {
      method : func3,
      assign : 'msg3'
    }]
    }
});


server.start((err) => {
  if(err) {
    console.log("Error occured");
  } else {
    console.log("Server started at " , server.info.uri ) ;
  }
})
