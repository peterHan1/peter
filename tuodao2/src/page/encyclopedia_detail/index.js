require('./encyclopedia_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td = require('util/td.js');
var _apiNews = require('api/operate-api.js');
var encyclopediaDetail = {
	init : function(){
		this.getId();
	},
	getId : function() {
		var ids = _td.getUrlParam('id');
		encyclopediaDetail.typeTab(ids);
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	// 查询新闻公告详情的跳转类型
	typeTab : function(ids){
		_apiNews.getNewsDetail(encyclopediaDetail.headerData,ids,function(res){
			$('.encyclopediaDetail_top').html('<i class="iconfont">&#xe6bb;</i>&nbsp;&nbsp;'+res.content.title+'<span class="rg">'+res.content.publishTime+'</span>');
			$('.encyclopediaDetail_content').html(res.content.content);
		})
	}
}
$(function(){
	encyclopediaDetail.init();
})