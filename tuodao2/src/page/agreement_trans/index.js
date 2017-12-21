require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td			= require('util/td.js');
var _apiInvest 	= require('api/trade-api.js');
var proto = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		var tender = _td.getUrlParam("tender");
		this.addHtml(headerData,tender);
	},
	addHtml : function(headerData,tender){
		if(tender != null && tender != ""){
			_apiInvest.bond_protocol(headerData,tender,function(res){
				$(".transName").html(res.content.assignorName);
				$(".transTdName").html(res.content.assignorNickName);
				$(".transNum").html(res.content.assignorIdCard);
				$(".tranName").html(res.content.assigneeName);
				$(".tranTdName").html(res.content.assigneeNickName);
				$(".tranNum").html(res.content.assigneeIdCard);
				$(".money").html(res.content.account);
				$(".beginDate").html(res.content.beginDate);
				$(".endDate").html(res.content.endDate);
				$(".apr").html(res.content.apr);
			},function(err){
				console.log(err);
			});
		}
	}
};
$(function() {
	proto.init();
});