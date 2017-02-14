//Using express 4.8

var express         = require('express');
var methodOverride  = require('method-override');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var router          = require('./server app/router/routes.js');
var dbController    = require('./server app/dbmanager/dbhelper.js');
var event           = require('./server app/eventsservice/eventManager.js');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 8080; 
var app             = express();
var mongoURL        =  null;
var force           = false;

var userViews      = '/Views/UserView/build';
var adminViews     = '/Views/AdminView/build';

var userViewIndex  = 'index.html';
var adminViewIndex = 'index.html';

var userPath       = '.' + userViews + '/' + userViewIndex;
var adminPath      = '.' + adminViews + '/' + adminViewIndex;

var serverPath     = __dirname;

var config = {
    INDEX_PATH          : userPath ,
    ADMIN_INDEX_PATH    : adminPath ,
    DATABASE_CONTROLLER : dbController,
    SERVER_PATH         : serverPath,
    EVENT_SERVICE       : event
}

if(force){
    mongoose.connect('mongodb://mongoaccount:mongouser@172.31.8.204:27017/requestdb');
}else{
    mongoose.connect('mongodb://127.0.0.1:27017/requestDB');
}


//---- Initializing express ----
app.use(express.static(__dirname + userViews));
app.use('/admin',express.static(__dirname + adminViews));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan());

router( config , app); //Carga las rutas


app.listen(port);
 
console.log("The server is running and ready by port : " + port);


