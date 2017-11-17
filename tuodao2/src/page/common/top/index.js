require('./index.scss');
var _td 		= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apiUser 	= require('api/user-api.js');
var accessId 	= _td.getAccess('accessId');
var accessKey 	= _td.getAccess('accessKey');
console.log(accessId);
console.log(accessKey);


// console.log(document.cookie);
// 导航
var navPage = {
	init : function(){
		this.bindEvent();
		// this.loadUserInfo();
		if(typeof accessId !='undefined' || typeof accessKey !='undefined'){
			// console.log(1234);
			this.loadUserInfo();
		}
		return this;
	},
	bindEvent : function(){
		// 登录点击事件
		$('.js-login').click(function(e){
        	e.preventDefault();
        	_td.doLogin();
		});

	},
	// 加载用户信息
	loadUserInfo : function(){
		// var a = _td.getAccess('accessId');
		// var b = _td.getAccess('accessKey');
		var headerData = {
			'accessId' : accessId,
			'accessKey' :accessKey
		};
		// console.log(a+'top');
		_apiUser.checkLogin(headerData,function(res){
			console.log(res);
		}, function(errMsg){
			console.log(errMsg.code);
		// do nothing
		});
	},
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