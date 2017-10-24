require('page/invest_detail/invest_detail.js');
require('util/paging/page.scss');
require('util/paging/page.js');

var _td = require('util/td.js');
var _apiInvest = require('api/invest_listDetails-api.js');
var investListSift = require('./invest_listDetails-sift.string');

$(function(){
	_apiInvest.getInvestListDetails(1,function(res){
		console.log(res);
		bannerHtml = _td.renderHtml(investListSift,{
			content:res.content,
		});
		$('.detail_top_left').html(bannerHtml);
	},function(){
		console.log("请求失败");
	});
});
