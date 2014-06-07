
'use strict';

// var template = require('underscore').template;
var fs = require('fs');
var path = require('path');
var express = require('express');
var http = require('http');

// var redis = require('redis');
// var RedisStore = require('connect-redis')(express);
// var util = require('./util');
// var passport = require('passport');
// var socketio = require('socket.io');
// var marked = require('marked');

// var winston = require('winston');

// var instanceUtil = require('./instanceutil');
// var instanceMap = {};

// var logger = initLogger();
// logger.info('starting server');
console.log('starting server');
// create an express application
var app = express();
// var projectConf = null;

// // shutdown handling

// process.on('SIGTERM', function(){
//     console.log('terminating the ozarcs server (SIGTERM)');
//     process.exit(0);
// });

// process.on('SIGINT', function(){
//     console.log('terminating the ozarcs server (SIGINT)');
//     process.exit(0);
// });


// // var ozarcs_app_index_html = '/ozarcs-app.html';
// var ozarcs_instance_reserved_names = {
//     'api' : true,
//     'admin' : true
// };

// // Read system configuration
// var ozarcs_hosting_home = process.env.OZARCS_HOSTING_HOME;

// if(!ozarcs_hosting_home && !fs.existsSync(ozarcs_hosting_home)){
//     console.log('ERROR: hosting folder does not exist - ' + ozarcs_hosting_home);
//     process.exit(1);
// }

// var idservice = require('./services/identity');
// var jamservice = require('./services/jam');
// var searchservice = require('./services/search');
// var gitservice = require('./services/git');
// var adminservice = require('./services/admin');


// var sessionOptions = {secret: 'puioh89234890jkd890as'};

// var redisClient = redis.createClient();

// redisClient.on('error', function(error){
//     redisClient.end();
//     console.log(error);
//     configureExpress(app);
// });

// redisClient.on('connect', function(){
//     console.log('connected to redis');
//     sessionOptions.store = new RedisStore({
//     host: 'localhost',
//     port: 6379,
//     db: 1
//     });
//     configureExpress(app);
// });

    configureExpress(app);

/*  updateProjectList is the central function that reads all
    projects in the hosting folder that will be used for incomming requests.
    It also tells all connected web clients to refresh thier project list
*/
// function updateProjectList() {
//     adminservice.readProjects(ozarcs_hosting_home, function(projects){
//     for(var projectId in projects){
//         var project = projects[projectId];
//         if(project.instanceStatus === 'changed'){
//             project = project.deployedVersion;
//         }
//         if(project.instanceStatus === 'deployed'){
//             var instance = new instanceUtil.util(ozarcs_hosting_home, projects[projectId]);
//             instance.expressStatic = express.static(instance.contentPath());
//             instanceMap[instance.projectId] = instance;
//         }

//     }
//     watchContentChangesForAllInstances();
//     adminservice.emitProjectUpdateToSocketConnection();
//     });

// }


function configureExpress(app){

    app.use(express.bodyParser());
    // app.use(express.cookieParser('avy0pnkxu7dmxfShoXinq'));
    // app.use(express.cookieSession({secret: 'puioh89234890jkd890as'}));


    // app.use(express.session(sessionOptions));

    // if(process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'debug'){
    //     app.use(function(req, res, next){
    //       console.log(req.originalUrl);
    //       next();
    //      });
    // }

    // /* check of path contains a valid project id */

    // var adminUserIdList = [ ];

    // if(process.env.OZARCS_ADMIN_USERID_LIST && process.env.OZARCS_ADMIN_USERID_LIST.length > 0) {
    //     adminUserIdList = process.env.OZARCS_ADMIN_USERID_LIST.split(',');
    //     console.log('admin user list');
    //     console.log(adminUserIdList);
    // }

    // var ozarcsAdmin = { };
    // // if no admin user is specified, everybody is admin
    // ozarcsAdmin.isAllowedUserId =  (adminUserIdList.length > 0) ?
    //         function(userId){
    //             return (adminUserIdList.indexOf(userId.toLowerCase()) !== -1);
    //         } :
    //         function(userId){
    //             return true;
    //         };

    // // serve static content like css, images, libraries etc first
    // app.use('/static', express.static(path.resolve(__dirname, '../../', 'webui/app')));

    // /* check if first part of path is a valid project */
    // app.use(function(req, res, next){
    //     // console.log('project check of path');
    //     req.ozarcsAdmin = ozarcsAdmin;
    //     var indexOfSecondSlash = req.url.indexOf('/', 1);
    //     if(indexOfSecondSlash === -1 || indexOfSecondSlash === req.url.length ) {
    //         return next();
    //     }

    //     var projectId = req.url.substring(1, indexOfSecondSlash);
    //     if(!ozarcs_instance_reserved_names[projectId] && instanceMap[projectId]){
    //           req.url = req.url.replace('/' + projectId, '');
    //           req.ozarcsInstance = instanceMap[projectId];
    //           // console.log('after project check', req.url);
    //           if (req.url === '/'){
    //             req.url = '/ozarcs-app.html'; // default app for ozarcs instance
    //           }
    //           next();
    //       } else {
    //             // console.log('no valid project found');
    //             next();
    //     }
    // });


    //   app.use('/static/chrome/', function(req, res, next){
    //     console.log('before chrome');
    //     next();
    //     console.log(req.url.substr(req.url.length-4));
    //     if((req.url.length > 4) && (req.url.substr(req.url.length-4) === '.crx')){
    //         res.setHeader('Content-Type',  'application/x-chrome-extension');
    //         console.log('set header for chrome extention');
    //     }
    //     console.log('after chrome');
    //   });

      app.use(express.static(path.resolve(__dirname, '../')));


    // // SAP ID Service
    //  app.use(idservice.cleanupOldSessions());
    //   app.use(passport.initialize());
    //   app.use(passport.session());

    //   app.use('/identity/', idservice.app);

    //  // app.use(idservice.useDefaultAuthorization);

    // // Admin service
    //   adminservice.setHostingHome(ozarcs_hosting_home);
    //   adminservice.setUpdateProjectListFunction(updateProjectList);

    //   app.use('/' + 'admin' + '/', idservice.checkAuthorization);
    //   app.use('/' + 'admin' + '/', adminservice.app);

    // // Jam Service
    //   app.use('/' + 'jam' + '/', idservice.checkAuthorization);
    //   app.use('/' + 'jam' + '/', jamservice);

    // // Search Service
    //   app.use('/' + 'search' + '/', idservice.checkAuthorization);
    //   app.use('/' + 'search' + '/', searchservice);


    // // Git service
    //   app.use('/' + 'git' + '/', idservice.checkAuthorization);
    //   app.use('/' + 'git' + '/', gitservice);

    // // Content Handling

    app.get('/api/galleries', function(req, res){
        console.log('api galleries server');
        var filepath = path.join( __dirname, '..' ,'img','gallery');
        var data = toJson(filepath);

        if (data) {
            res.send(200, data);
        } else {
            res.send(400);
        }
    });


    function toJson(filepath){
        var array = [];

        var dirs = fs.readdirSync(filepath);
        dirs.forEach(function(dir){
            var gallery = {};
            gallery.name = dir;
            gallery.path = path.join(filepath, dir);
            if (fs.statSync(gallery.path).isDirectory()){
                gallery.number = fs.readdirSync(gallery.path).length;
                array.push(gallery);
            }
        });
        return JSON.stringify(array);
    };

    //   app.get('/raw/content/*', idservice.checkAuthorization, function(req, res){
    //     if (!req.ozarcsInstance){
    //         res.send(400, 'instance is missing');
    //         return;
    //     }

    //     req.url = req.url.replace('/raw/content', '');
    //     req.ozarcsInstance.expressStatic(req, res);

    //   });

    //   app.get('/md/content/*', idservice.checkAuthorization, function(req, res){
    //     if (!req.ozarcsInstance){
    //         res.send(400, 'instance is missing');
    //         return;
    //     }

    //     var filepath = path.join(req.ozarcsInstance.contentPath(),
    //         req.url.replace('/md/content', ''));
    //     var fileContent = fs.readFile(filepath, function(err, data){
    //         if(!err){
    //             var htmlcontent = marked(data.toString());

    //             var page = (template(fs.readFileSync(
    //                 path.join(__dirname, 'services/markdown/index.ejs'), 'utf8'))
    //                 )({title: req.url,
    //                    body: htmlcontent,
    //                    filename: filepath,
    //                    changedAt: Date() });

    //             res.send(200, page);
    //         } else {
    //             res.send(400, err);
    //         }
    //     });
    //   });


    // // here we go

    // var server = util.run(app);
    // var socketConnections = [];

    // initWebsocket(server, socketConnections);

    // jamservice.injectSocketConnections(socketConnections);
    // gitservice.injectSocketConnections(socketConnections);
    // adminservice.injectSocketConnections(socketConnections);

    // updateProjectList();

    var server = http.createServer(app);
    server.listen(3000, function () {
        console.log('server running on http://localhost:3000');
    });
}

// function watchContentChangesForAllInstances(){
//     for(var instanceId in instanceMap){
//         gitservice.watchContentChanges(instanceMap[instanceId]);
//     }

// }


// // logging
// function initLogger(){
//     var logFolder = path.resolve(__dirname, '..', 'logs');
//     var logFilename = path.join(logFolder, 'server.log');

//     if (!fs.existsSync(logFolder)) {
//         fs.mkdirSync(logFolder);
//     }

//     var logger = new (winston.Logger)({
//         transports: [
//             new (winston.transports.Console)({ timestamp:true}),
//             new (winston.transports.File)({ filename: logFilename })
//         ]
//       });
//     return logger;
// }


// // Socket IO connection

// function initWebsocket(server, connectionList){

//     // ---
//     // Socket IO Chat
//     // ---
//     var io = socketio.listen(server);
//     // io.set("transports", ["xhr-polling"]);
//     io.set('log level', 1);
//     io.on('connection', function (socket) {
//         connectionList.push(socket);
//         logger.info('new websocket connection with count: ' + connectionList.length );

//         socket.on('message', function (msg) {
//             // logger.info('Message Received: ' + msg);
//             // socket.broadcast.emit('message', msg);
//         });
//         socket.on('admin', function(){
//             // adminConnections.push(socket);
//         });
//         socket.on('disconnect', function(){
//             if(connectionList.indexOf(socket) != -1){
//                 connectionList.splice(connectionList.indexOf(socket),1);
//             }
//             logger.info('disconnect websocket, new count: ' + connectionList.length );
//           });
//         });
// }
