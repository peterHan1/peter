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
			_apiInvest.scatter_protocol(headerData,tender,function(res){
				var com = res.content;
				com.unitText = proto.setUnit(com.periodUnit);
				$(".borrName").html(com.borrowUserName);
				$(".borTdName").html(com.borrowUserId);
				$(".idNum").html(com.borrowIdNum);
				$(".investNmae").html(com.userName);
				$(".inTdName").html(com.mobile);
				$(".inIdNum").html(com.idNum);
				$(".money").html(com.tenderMoney);
				$(".deadline").html(com.period + com.unitText);
				$(".deadlineStart").html(com.startTime);
				$(".deadlineEnd").html(com.endTime);
			},function(err){
				console.log(err);
			});
		}
	},
	setUnit : function(unit){
		switch (unit)
		{
			case 0:
				return "天";
			case 1:
				return "个月";
			case 2:
				return "年";
			default: return "";
		}
	}
};
$(function() {
	proto.init();
});