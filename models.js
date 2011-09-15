var mongoose = require('mongoose')
     , Schema = mongoose.Schema
     , mongooseAuth = require('mongoose-auth');

mongoose.connect('mongodb://localhost/nms');


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
User = mongoose.model('User');
exports.User = User;

// pages
var Page = new Schema({
	title : { type: String, required: true },
	content : { type: String, required: true },
	created_at : { type: Date, default: new Date() }
});
mongoose.model('Page', Page);
var Page = mongoose.model('Page');
PageModel = function(){};
PageModel.prototype.save = function (params, callback) {
	var page = new Page({
		title: params['title'],
		content: params['content'],
	});
	console.log("The title of the new object is: " + page.title);
	page.save(function (err) {
		if (err) {
			// console.log("We have an error."+JSON.stringify(err.errors));
			callback(['all fields are required'], null);
		} else {
			callback();
		}
	});
};
exports.PageModel = PageModel;