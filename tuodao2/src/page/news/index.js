require('./news.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');

var _paging 	= require('util/paging/index.js');
var _td 		= require('util/td.js');
var _apiNews 	= require('api/operate-api.js');
var mediaHtml 	= require('./media.string');
var noticeHtml 	= require('./notice.string');
var mediaNews = {
	init : function(){
		this.tabCut();
		this.typeTab();
		this.getNews(0);
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	getNews : function(type){
		_apiNews.getNews(mediaNews.headerData,type,1,function(res){
			if (type == 0) {
				var listData = res.content.list;
				$.each(listData,function(i){
					listData[i].content = listData[i].content.replace(/<[^>]+>/g,"");
					if (listData[i].content.length > 110) {
						listData[i].content = listData[i].content.substring(0,110)+'...';
					}
				})
				var bannerHtml = _td.renderHtml(mediaHtml,{
					list:res.content.list
				});
				$('.media_content').html(bannerHtml);
			} else {
				var bannerHtml = _td.renderHtml(noticeHtml,{
					list:res.content.list
				});
				$('.notice_content').html(bannerHtml);
			}
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiNews.getNews(mediaNews.headerData,type,e.current,function(res){
					if (type == 0) {
						var listData = res.content.list;
						$.each(listData,function(i){
							listData[i].content = listData[i].content.replace(/<[^>]+>/g,"");
							if (listData[i].content.length > 97) {
								listData[i].content = listData[i].content.substring(0,97)+'...';
							}
						})
						var bannerHtml = _td.renderHtml(mediaHtml,{
							list:res.content.list
						});
						$('.media_content').html(bannerHtml);
					} else {
						var bannerHtml = _td.renderHtml(noticeHtml,{
							list:res.content.list
						});
						$('.notice_content').html(bannerHtml);
					}
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			_paging.paging('pageList',0,1000);
			console.log('请求失败');
		})
	},
	tabCut : function(){
		$('.top_menu a').on('click',function(){
			var index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.content').children().eq(index).show().siblings().hide();
			if (index == 0) {
				mediaNews.getNews(0);
			} else {
				mediaNews.getNews(1);
			}
		})
	},
	// 查询新闻公告详情的跳转类型
	typeTab : function(){
		var type = _td.getUrlParam('type');
		if (type == 'notice') {
			$('.top_menu a').eq(1).addClass('on').siblings().removeClass('on');
			mediaNews.getNews(1);
			$('.content').children().eq(1).show().siblings().hide();
		}
	}
}
// str.substring(0,65)+'...';切割具体长度的字符串
$(function(){
	mediaNews.init();
})