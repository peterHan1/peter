require('./news.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _paging = require('util/paging/index.js');
_paging.paging('pageList',100,1);
$('.media_content').children().eq(9).css('border-bottom','none');

var mediaNews = {
	init : function(){
		this.tabCut();
		this.typeTab();
	},
	tabCut : function(){
		$('.top_menu a').on('click',function(){
			var index=$(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			console.log(index);
			$('.content').children().eq(index).show().siblings().hide();
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
			$('.content').children().eq(1).show().siblings().hide();
		}
	}
}
// str.substring(0,65)+'...';切割具体长度的字符串
$(function(){
	mediaNews.init();
})