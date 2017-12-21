require('./encyclopedia_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td = require('util/td.js');
var _apiNews = require('api/operate-api.js');
var encyclopediaDetail = {
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
        var ids=parseInt(array[1]);
		_apiNews.getNewsDetail(encyclopediaDetail.headerData,ids,function(res){
			$('.encyclopediaDetail_top').html('<i class="iconfont">&#xe6bb;</i>&nbsp;&nbsp;'+res.content.title+'<span class="rg">'+res.content.publishTime+'</span>');
			$('.encyclopediaDetail_content').html(res.content.content);
		})
	}
}
$(function(){
	encyclopediaDetail.init();
})