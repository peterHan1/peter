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
			_apiInvest.sift_protocol(headerData,tender,function(res){
				$(".code").html(res.content.protocalCode);
				$(".name").html(res.content.userName);
				$(".sfzcode").html(res.content.idNum);
				$(".phone").html(res.content.mobile);
				$(".money").html(res.content.joinMoney);
				$(".moneys").html(res.content.joinMoneyBig);
				$(".per").html(res.content.apr);
				$(".sift").html(res.content.productName);
			},function(err){
				console.log(err);
			});
		}
	}
};
$(function() {
	proto.init();
});