require('./news_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');

var _td 		= require('util/td.js');
var _apiNews 	= require('api/operate-api.js');

$('.info_tab a').eq(5).css({
	'color':'#ff7400',
	'border-bottom': '2px solid #ff8e2a'
})
var newsDetail = {
	init : function(){
		this.getUrl();
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	getUrl : function(){
		var ids = _td.getUrlParam('id');
        var type = _td.getUrlParam('type');
        newsDetail.typeTab(ids, type);
	},
	// 查询新闻公告详情的跳转类型
	typeTab : function(ids,type){
        if (type == 'media') {
			$('.top_menu a').eq(0).addClass('on').siblings().removeClass('on');
		} else {
			$('.top_menu a').eq(1).addClass('on').siblings().removeClass('on');
		}
		_apiNews.getNewsDetail(newsDetail.headerData,ids,function(res){
			$('.newsDetail_top').html('<i class="iconfont">&#xe6bb;</i>&nbsp;&nbsp;'+res.content.title+'<span class="rg">'+res.content.publishTime+'</span>');
			$('.newsDetail_content').html(res.content.content);
		})
	}
}
$(function(){
	newsDetail.init();
})