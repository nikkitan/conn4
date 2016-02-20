var express = require('express'),
  session = require('express-session'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  _global=require('./globals.js');


var app = module.exports = express();
var PIDFILE = './conn4.pid';
if(process.env.NODE_ENV == 'production')
    PIDFILE = '/opt/conn4/conn4.pid';

fs.writeFileSync(PIDFILE,process.pid,{mode:0644})
function exitHandler(options,err){
 if(fs.existsSync(PIDFILE) == true)
  fs.unlinkSync(PIDFILE)
 _global.DEBUG.log('Error:' + JSON.stringify(options) + ":");
 if(options == 'uncaughtException'){
 (err.stack.split('\n')).forEach(function(element) {
   _global.DEBUG.log(element);
 }, this);
 }
 _global.DEBUG.log('Conn4 exiting....');
 process.exit();
}
process.on('exit',exitHandler.bind(null,'exit'));
process.on('SIGINT',exitHandler.bind(null,'SIGINT'));
process.on('SIGTERM',exitHandler.bind(null,'SIGTERM'));
process.on('SIGHUP',exitHandler.bind(null,'SIGHUP'));
process.on('uncaughtException',exitHandler.bind(null,'uncaughtException'));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(session({secret:'nikkiconnect4'}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

if (app.get('env') === 'production') {

}; 

app.get('/', routes.index);
app.get('/newgame', api.onNewGame);
app.post('/click', api.onPlayerClick);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Connect 4 server listening on port ' + app.get('port'));
});