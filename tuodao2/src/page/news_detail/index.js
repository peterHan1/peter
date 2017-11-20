require('./news_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var newsDetail = {
	init : function(){
		this.typeTab();
	},
	// 查询新闻公告详情的跳转类型
	typeTab : function(){
		var url=window.location.search;
        //转换成字符串
        url=url.toString();
        var array=new Array();//用来存放分分割后的字符串
        array=url.split("?");
		if(array[1]=='media'){
			$('.top_menu a').eq(0).addClass('on').siblings().removeClass('on');
			$('.content').children().eq(0).show().siblings().hide();
		}else{
			$('.top_menu a').eq(1).addClass('on').siblings().removeClass('on');
			$('.content').children().eq(1).show().siblings().hide();
		}
	}
}
$(function(){
	newsDetail.init();
})