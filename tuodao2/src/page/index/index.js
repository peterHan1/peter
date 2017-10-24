require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./index.scss');
require('util/flexslider/index.js');

var _td 				= require('util/td.js');
var _apiBanner			= require('api/banner-api.js');
var templateBanner  	= require('./banner.string');
var templateProduct  	= require('./product.string');
var templateActivity  	= require('./activity.string');


var page = {
	data : {
		listParam : {
			keyword 	: _td.getUrlParam('keyword') 	|| '',
			cate 		: _td.getUrlParam('cate') 		|| '',
			orderBy 	: _td.getUrlParam('orderBy') 	|| 'default',
			pageNum 	: _td.getUrlParam('pageNum') 	|| 1,
			pageSize 	: _td.getUrlParam('pageSize') 	|| 20
		}
	},
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadList();
	},
	loadList : function(){
		var _this = this;
		var bannerHtml = '';
		var listParam = this.data.listParam;
		console.log(listParam);
		_apiBanner.getProductList(function(res){
			bannerHtml = _td.renderHtml(templateBanner,{
				list:res.content.list,
				msg:res.msg
			});
			$('.flexslider').html(bannerHtml);
			$('.flexslider').flexslider({
				directionNav 	: true,
				pauseOnAction 	: false,
				pauseOnHover 	: true,
				slideshowSpeed 	: 3000
			});
		},function(){});
	}
};
$(function(){
	page.init();
});

