var mongoose = require('mongoose')
     , Schema = mongoose.Schema
     , mongooseAuth = require('mongoose-auth');

var conf = require('./conf');

var UserSchema = new Schema({})
     , User;

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
mongoose.connect('mongodb://localhost/nms');
User = mongoose.model('User');
exports.User = User