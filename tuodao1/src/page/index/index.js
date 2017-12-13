require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./index.scss');
require('util/flexslider/index.js');

var _td 				= require('util/td.js');
var _apiBanner			= require('api/banner-api.js');
var _apiUser 			= require('api/user-api.js');
var templateBanner  	= require('./banner.string');
var templateProduct  	= require('./product.string');
var templateBnLogin  	= require('./banner-login.string');
// var templateActivity  	= require('./activity.string');


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
		var bannerHtml = '';
		// var listParam = this.data.listParam;
		// console.log(listParam);
		_apiBanner.getProductList(function(res){
			// console.log(res+'banner');
			bannerHtml = _td.renderHtml(templateBanner,{
				list:res.content
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
			console.log(errMsg+'banner');
			if(errMsg == 'Not Found'){
				$('.flexslider').text('Not Found');
			}
		});

		var productHtml = _td.renderHtml(templateProduct,{});
		$('.index-product').html(productHtml);


	},
	loadUserInfo : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		if(headerData.accessId && headerData.accessKey){
			_apiUser.checkLogin(headerData,function(res){
				var loginHtml = _td.renderHtml(templateBnLogin,{
					isLogin : true,
					user : res.content
				});
				$('.fixed-right').prepend(loginHtml);
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

