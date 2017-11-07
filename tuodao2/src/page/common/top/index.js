require('./index.scss');
var _td 		= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apiUser 	= require('api/user-api.js');

// console.log(document.cookie);
// 导航
var navPage = {
	init : function(){
		this.bindEvent();
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
		_apiUser.checkLogin(function(res){
			$('.js-login').text(res.userName);
		}, function(errMsg){
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