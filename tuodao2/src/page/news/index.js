require('./news.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');

var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiNews = require('api/operate-api.js');
var mediaHtml = require('./media.string');
var noticeHtml = require('./notice.string');
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
			if (type==0) {
				var listData=res.content.list;
				$.each(listData,function(i){
					if(listData[i].content.length>97){
						listData[i].content=listData[i].content.substring(0,97)+'...';
					}
				})
				var bannerHtml = _td.renderHtml(mediaHtml,{
					list:res.content.list
				});
				$('.media_content').html(bannerHtml);
				$('.media_content a').on('click',function(){
					$(this).attr('href','news_detail.html?'+type+"="+$(this)[0].getAttribute("data-url"));
				})
			}else{
				var bannerHtml = _td.renderHtml(noticeHtml,{
					list:res.content.list
				});
				$('.notice_content').html(bannerHtml);
				$('.notice_content li a').on('click',function(){
					$(this).attr('href','news_detail.html?'+type+"="+$(this)[0].getAttribute("data-url"));
				})
			}
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiNews.getNews(mediaNews.headerData,type,e.current,function(res){
					if (type==0) {
						var listData=res.content.list;
						$.each(listData,function(i){
							if(listData[i].content.length>97){
								listData[i].content=listData[i].content.substring(0,97)+'...';
							}
						})
						var bannerHtml = _td.renderHtml(mediaHtml,{
							list:res.content.list
						});
						$('.media_content').html(bannerHtml);
						$('.media_content a').on('click',function(){
							$(this).attr('href','news_detail.html?'+type+"="+$(this)[0].getAttribute("data-url"));
						})
					}else{
						var bannerHtml = _td.renderHtml(noticeHtml,{
							list:res.content.list
						});
						$('.notice_content').html(bannerHtml);
						$('.notice_content li a').on('click',function(){
							$(this).attr('href','news_detail.html?'+type+"="+$(this)[0].getAttribute("data-url"));
						})
					}
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	tabCut : function(){
		$('.top_menu a').on('click',function(){
			var index=$(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			console.log(index);
			$('.content').children().eq(index).show().siblings().hide();
			if(index == 0){
				mediaNews.getNews(0);
			}else{
				mediaNews.getNews(1);
			}
		})
	},
	// 查询新闻公告详情的跳转类型
	typeTab : function(){
		var url=window.location.search;
        //转换成字符串
        url=url.toString();
        var array=new Array();//用来存放分分割后的字符串
        array=url.split("?");
		if(array[1]=='notice'){
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