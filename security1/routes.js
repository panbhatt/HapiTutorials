var routes = [
  {
    method : 'GET',
    path : '/public',
    config : {
      auth : false,
      handler : function(req,reply) {
        return reply(req.auth);
      }
    }
  },

  {
    method : 'GET',
    path : '/private',
    config : {
      handler : function(req,reply) {
        return reply(req.auth);
      }
    }
  }
];

module.exports = routes ;
