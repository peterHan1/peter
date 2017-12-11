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



// 导航
var navPage = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		// if(typeof accessId !='undefined' || typeof accessKey !='undefined'){
			// console.log(1234);
			// this.loadUserInfo();
			// this.loadUserInfo();
		// }
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
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		if(headerData.accessId && headerData.accessKey){
			_apiUser.checkLogin(headerData,function(res){
				var loginHtml = _td.renderHtml(loginTemp,{
					isLogin : true,
					user : res.content
				});
				$('.top .right ul').prepend(loginHtml);
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
			var loginHtml = _td.renderHtml(loginTemp,{
						isLogin : false
					});
			$('.top .right ul').prepend(loginHtml);
		}
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