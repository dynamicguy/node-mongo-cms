var express = require('express');

var mongooseAuth = require('mongoose-auth');
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dev
var User = new (require('./models').User);
var pageModel = new (require('./models').PageModel);

var app = express.createServer();
mongooseAuth.helpExpress(app);

<<<<<<< HEAD
=======
var User = new (require('./models')).User;
mongooseAuth.helpExpress(app);

>>>>>>> f184fad66262f63a524f6da80f1ec30ec2d1e4e0
=======
>>>>>>> dev
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
	title: 'Home'
  });
});
<<<<<<< HEAD
<<<<<<< HEAD
app.get('/page', function(req, res){
  res.render('page', {
	  title: 'Page list'
  });
});
app.get('/page/create', function(req, res){
  res.render('page/create', {
	  title: 'create a new page'
=======

=======
>>>>>>> dev
app.get('/page', function(req, res){
  res.render('page/index', {
    title: 'NodeJS MongoDB CMS'
  });
});

app.get('/page/create', function(req, res){
  res.render('page/create', {
<<<<<<< HEAD
    title: 'NodeJS MongoDB CMS'
>>>>>>> f184fad66262f63a524f6da80f1ec30ec2d1e4e0
=======
	  title: 'create a new page'
>>>>>>> dev
  });
});
app.post('/page/create', function(req, res) {
	pageModel.save({
		title: req.param('title'),
		content: req.param('content')
	}, function(err, docs) {
		if(!err){
			res.redirect('/page');
		} else {
			res.render('page/create', {
				title: 'create a new page',
				errors: err
			});			
		}
	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
