var express = require('express');
var app = express.createServer();

var mongooseAuth = require('mongoose-auth');
var User = new (require('./models')).User;
mongooseAuth.helpExpress(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'esoognom'}));
  app.use(mongooseAuth.middleware());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'NodeJS MongoDB CMS'
  });
});

app.get('/page', function(req, res){
  res.render('page/index', {
    title: 'NodeJS MongoDB CMS'
  });
});

app.get('/page/create', function(req, res){
  res.render('page/create', {
    title: 'NodeJS MongoDB CMS'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
