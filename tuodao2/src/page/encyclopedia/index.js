require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./encyclopedia.scss');
require('./index.js');

var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiNews = require('api/operate-api.js');
var encyclopediaHtml = require('./encyclopedia.string');
var encyclopedias = {
	init : function(){
		this.getData();
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	getData : function(){
		_apiNews.getNews(encyclopedias.headerData,2,1,function(res){
			var bannerHtml = _td.renderHtml(encyclopediaHtml,{
				list:res.content.list
			});
			$('.content').html(bannerHtml);
			$('.content li a').on('click',function(){
				$(this).attr('href','encyclopedia_detail.html?'+$(this)[0].getAttribute("data-url"));
			})
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiNews.getNews(encyclopedias.headerData,2,e.current,function(res){
					var bannerHtml = _td.renderHtml(encyclopediaHtml,{
						list:res.content.list
					});
					$('.content').html(bannerHtml);
					$('.content li a').on('click',function(){
						$(this).attr('href','encyclopedia_detail.html?'+$(this)[0].getAttribute("data-url"));
					})
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	}
}
$(function(){
	encyclopedias.init();
})