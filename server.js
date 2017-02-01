//Using express 4.8

var express         = require('express');
var methodOverride  = require('method-override');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var port            = process.env.PORT || 5001; 
var app             = express();


//---- Initializing express ----
app.use(express.static(__dirname + '/Views/UserView'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan());


app.get('*',function(req,res){
    res.sendFile('./Views/UserView/index.html');
});


app.listen(port);

console.log("The server is running and ready by port : " + port);


