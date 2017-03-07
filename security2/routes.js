var Routes = [{
        method: 'GET',
        path: '/login',
        config: {
            auth: {
                mode: "try"
            },
            handler: function(req, reply) {
                if (req.cookieAuth.isAuthenticated == true) {
                    return reply.redirect('/home');
                } else {
                    let loginForm = `
                              <form method="post" action="/login">
                              Username: <input type="text" name="username" />
                              <br>
                              Password: <input type="password" name="password" />
                              <br>
                              <input type="submit" value="Login" />
                              </form>
                              `;

                    if (req.query.login == 'failed') {
                        loginForm += '<h2> Previous Login attempt failed. </h2>';
                    }
                    return reply(loginForm);
                }
            }
        }

    },

    {
        method: 'POST',
        path: '/login',
        config: {
            auth: {
                mode: "try"
            },
            handler: function(req, reply) {
                if (req.payload.username === 'admin' && req.payload.password === 'admin') {
                    req.cookieAuth.set({
                        username: 'admin',
                        lastLogin: new Date()
                    });
                    return reply.redirect('/home');
                } else {
                    if (req.cookieAuth)
                        req.cookieAuth.clear();
                    return reply.redirect('/login?login=failed');
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/home',
        config: {
            handler: function(req, reply) {
                return reply(req.auth);
            }
        }
    },

    {
        method: 'GET',
        path: '/public',
        config: {
            auth: {
                mode: 'try'
            },
            handler: function(req, reply) {
                return reply(req.auth);
            }
        }
    }
];


module.exports = Routes;
