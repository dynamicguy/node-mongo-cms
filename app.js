var express = require('express');

var mongoose = require('mongoose')
     , Schema = mongoose.Schema
     , mongooseAuth = require('mongoose-auth');

var UserSchema = new Schema({})
     , User;

var conf = require('./conf');

UserSchema.plugin(mongooseAuth, {
	everymodule: {
	  everyauth: {
	      User: function () {
	        return User;
	      }
	  }
	}
	, facebook: {
	  everyauth: {
	      myHostname: 'http://localhost:3000'
	    , appId: conf.fb.appId
	    , appSecret: conf.fb.appSecret
	    , redirectPath: '/'
	  }
	}
	, twitter: {
	  everyauth: {
	      myHostname: 'http://localhost:3000'
	    , consumerKey: conf.twit.consumerKey
	    , consumerSecret: conf.twit.consumerSecret
	    , redirectPath: '/'
	  }
	}
	, password: {
	    everyauth: {
	        getLoginPath: '/login'
	      , postLoginPath: '/login'
	      , loginView: 'login.jade'
	      , getRegisterPath: '/register'
	      , postRegisterPath: '/register'
	      , registerView: 'register.jade'
	      , loginSuccessRedirect: '/'
	      , registerSuccessRedirect: '/'
		  , loginWith: 'login'
	    }
	}
	, github: {
	  everyauth: {
	      myHostname: 'http://localhost:3000'
	    , appId: conf.github.appId
	    , appSecret: conf.github.appSecret
	    , redirectPath: '/'
	  }
	}
	, instagram: {
	  everyauth: {
	      myHostname: 'http://localhost:3000'
	    , appId: conf.instagram.clientId
	    , appSecret: conf.instagram.clientSecret
	    , redirectPath: '/'
	  }
	}
});

mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost/example');
User = mongoose.model('User');

var app = express.createServer();
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

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
