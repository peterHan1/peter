require('./news_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');
var _td = require('util/td.js');
var _apiNews = require('api/operate-api.js');

$('.info_tab a').eq(5).css({
	'color':'#ff7400',
	'border-bottom': '2px solid #ff8e2a'
})
var newsDetail = {
	init : function(){
		this.typeTab();
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	// 查询新闻公告详情的跳转类型
	typeTab : function(){
		var url=window.location.search;
        //转换成字符串
        url=url.toString();
        var array=new Array();//用来存放分分割后的字符串
        array=url.split("?");
        var arrys=array[1].toString().split("=");
        var ids=parseInt(arrys[1]);
        var type=arrys[0];
        if (type=='0') {
			$('.top_menu a').eq(0).addClass('on').siblings().removeClass('on');
			// $('.content').children().eq(0).show().siblings().hide();
		}else{
			$('.top_menu a').eq(1).addClass('on').siblings().removeClass('on');
			// $('.content').children().eq(1).show().siblings().hide();
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