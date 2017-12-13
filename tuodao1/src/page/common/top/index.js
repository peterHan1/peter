require('./index.scss');
var _td 		= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apiUser 	= require('api/user-api.js');
var loginTemp 	= require('./top.string');



// function delCookie(name,val){
// 	var date = new Date();
// 	date.setTime(date.getTime()-10000);
// 	document.cookie=name+'='+val+'; expire='+date.toGMTString();
// }

var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};

// 导航
var navPage = {
	init : function(){
		this.loadUserInfo();
		this.bindEvent();
		// if(typeof accessId !='undefined' || typeof accessKey !='undefined'){
			// console.log(1234);
			// this.loadUserInfo();
			// this.loadUserInfo();
		// }
		return this;
	},
	bindEvent : function(){
		var _this = this;
		$('#js-logout').click(function(e){
        	e.preventDefault();
        	_this.logout();
        	// _td.doLogin();
		});

	},
	logoutHtml: function(){
		var loginHtml = _td.renderHtml(loginTemp,{
			isLogin : false
		});
		$('.top .right ul').prepend(loginHtml);
	},
	// 加载用户信息
	loadUserInfo : function(){
		var _this = this;
		if(headerData.accessId && headerData.accessKey){
			_apiUser.checkLogin(headerData,function(res){
				var loginHtml = _td.renderHtml(loginTemp,{
					isLogin : true,
					user : res.content
				});
				$('.top .right ul').prepend(loginHtml);
				_this.bindEvent();
			},function(errMsg){
				// console.log(errMsg);
				if(!errMsg.success){
					var loginHtml = _td.renderHtml(loginTemp,{
			isLogin : false
		});
		$('.top .right ul').prepend(loginHtml);
					// _td.doLogin();
				}
			});
		}else{
			_this.logoutHtml();
		}
	},
	logout: function(){
		var _this = this;
		_apiUser.logout(headerData,function(res){
			console.log(res);
			_td.doLogin();
		},function(errMsg){
			console.log(errMsg);
		});
	}
};

module.exports = navPage.init();
// $(function(){

// 	$('#js-login').click(function(e){
// 		e.preventDefault();
// 		alert(11);
// 		// _td.doLogin();
// 	});
// 	$('#top .left dd').mouseover(function(){
// 		_tips.getTips($(this));
// 	});

// 	$('#top .left dd').mouseout(function(){
// 		$(this).find('.tips').hide();
// 	});

// });