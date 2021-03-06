# HapiTutorials

* node first.js  [FIrst hapi js program]
* node inert.js [ Static file viewing program]
* node routeEx.js [ Routing in hapijs program]
* node vision.js [ Vision for view templating thing in the UI]
* node simplePath.js [ for request lifecycle handling methods and decorated methods]
* node plugins.js [ For how to use to plugin]

* node dbPluginDepExp.js [ For plugin dependency and exposing a function]  
* node glue.js [ For configurting the plugins via GLUE ]

## Testing Related

* npm run test [ Running first test ]
* npm run testServer [ Testing a server in hapi ]
* npm run testServer1 [ Moving server.js in another file and using it to test the routes, with coverage]


## Authentication and Authorization
* node security1/basic.js  [ This will test the basic authentication ]
* node  security2/index.js [ This will test the COOKIE SESSION Based authentication]

## Joi validation
* node joi/routeValidation.js [ This will check the incoming GET/POST request for validation against Schema]

## Hapi Swagger Documentation.
* node documentation/index.js [ Hapi Swagger documentation generation ]




## Plugins that i found helpful
* https://github.com/shakefon/consistency  : Consitency plugin for API Versioning.
* https://www.npmjs.com/package/confidence  [ Confidence for writing the configuration ]


## HapiJS Plugins testing one by one.
* HAPI Authorization plugin : [ https://github.com/toymachiner62/hapi-authorization ] : node pluginsDemo/hapiAuthorization.js
* HAPI RBAC plugin : [ https://github.com/franciscogouveia/hapi-rbac/blob/master/API.md ] :
   1. node pluginsDemo/hapiRbacAuthorizationGlobal.js [For globally applying the authorization ]
   2. node pluginsDemo/hapiRbacAuthorization.js [For applying the authorization locally on the route thus bypassing the global authorization]

* HAPI TV Plugin { To show all request/response in the UI } : node pluginsDemo/hapiTv.js

## USEFUL LINKS
* https://github.com/glennjones/hapi-workshop
