require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./index.scss');
require('util/flexslider/index.js');

var _td 				= require('util/td.js');
var _apiOperate			= require('api/operate-api.js');
var _apiUser 			= require('api/user-api.js');
var templateTop 		= require('page/common/top/top.string');
var templateBanner  	= require('./banner.string');
var templateProduct  	= require('./product.string');
var templateBnLogin  	= require('./banner-login.string');
var templateNav 		= require('page/common/nav/nav.string');
// var templateActivity  	= require('./activity.string');
var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};

var page = {
	init : function(){
		this.onLoad();
		this.loadUserInfo();
	},
	onLoad : function(){
		this.loadList();
	},
	loadList : function(){
		var _this = this;
		var data = {
			bannerType 		: 0,
			bannerRemark 	: 'pc'
		};
		var bannerHtml = '';
		// var listParam = this.data.listParam;
		// console.log(listParam);
		_apiOperate.indexBanner(data,function(res){
			console.log(res+'banner');
			bannerHtml = _td.renderHtml(templateBanner,{
				list:res.content.list
				// msg:res.msg
			});
			$('.flexslider').html(bannerHtml);
			$('.flexslider').flexslider({
				directionNav 	: true,
				pauseOnAction 	: false,
				pauseOnHover 	: true,
				slideshowSpeed 	: 3000
			});
		},function(errMsg){
			console.log(errMsg);
			if(errMsg == 'Not Found'){
				$('.flexslider').text('Not Found');
			}
		});

		var productHtml = _td.renderHtml(templateProduct,{});
		$('.index-product').html(productHtml);


	},
	reHtml: function(template,res){
		return _td.renderHtml(template,{
			isLogin : true,
			user : res.content
		});
	},
	logout: function(){
		var _this = this;
		_apiUser.logout(headerData,function(res){
			console.log(res);
			_td.doLogin();
		},function(errMsg){
			console.log(errMsg);
		});
	},
	loadUserInfo : function(){
		var _this = this;
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		console.log(headerData.accessId);
		if(headerData.accessId && headerData.accessKey){
			_apiUser.checkLogin(headerData,function(res){
				console.log(res);
				$('.top .right ul li:eq(0)').html(_this.reHtml(templateTop,res));
				$('.uc').html(_this.reHtml(templateNav,res));
				$('#js-logout').on('click',function(e){
					e.preventDefault();
					_this.logout();
        	// _td.doLogin();
       		});
			},function(errMsg){
				// console.log(errMsg);
				if(!errMsg.success){
					var loginHtml = _td.renderHtml(templateBnLogin,{
						isLogin : false
					});
					$('.fixed-right').prepend(loginHtml);
					// _td.doLogin();
				}
			});
		}else{
			var loginHtml = _td.renderHtml(templateBnLogin,{
						isLogin : false
					});
			$('.fixed-right').prepend(loginHtml);
		}
	}
};
$(function(){
	page.init();
});

