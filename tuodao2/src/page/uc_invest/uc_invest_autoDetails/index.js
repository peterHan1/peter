require('page/common/uc-menu/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td 		= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apiInvest 	= require('api/trade-api.js');
var _paging 	= require('util/paging/index.js');
var autoTit 	= require('./autoDel.string');
var autoList 	= require('./autoDelList.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		var tenderId = _td.getUrlParam("tender");
		this.addTopHtml(headerData, tenderId);
		this.addListHtml(headerData, tenderId);
	},
	addTopHtml: function(headerData, id) {
		var _this = this;
		_apiInvest.getAutoTop(headerData, id, function(res) {
			_this.setShow(res);
			autoDelTop = _td.renderHtml(autoTit, {
				content: res.content,
			});
			$(".autoDetails_top").html(autoDelTop);
		}, function(err) {
			_this.logout(err);
		});
	},
	addListHtml: function(headerData, id) {
		var _this = this;
		_apiInvest.getAutoList(headerData, id, 1, 1, function(res) {
			autoDelList = _td.renderHtml(autoList, {
				list: res.content.list,
			});
			$("#tbody_list").html(autoDelList);
			_paging.paging("pageList", res.content.total, 1, function(e) {
				_apiInvest.getAutoList(headerData, id, 1, e.current, function(res) {
					autoDelList = _td.renderHtml(autoList, {
						list: res.content.list,
					});
					$("#tbody_list").html(autoDelList);
					_this.tipsHover();
					_td.trColor("tbody_list");
				}, function(err) {
					_this.logout(err);
				});
			});
			_this.tipsHover();
			_td.trColor("tbody_list");
		}, function(err) {
			_this.logout(err);
		});
	},
	logout: function(err){
		if(err.code == 100105){
			_td.doLogin();
		}else{
			console.log(err);
		}
	},
	setShow: function(res) {
		var type = res.content.voucherType;
		var money = res.content.voucherMoney;
		// 还款方式
		if (type == "0") {
			res.content.voucherType = "-";
		} else if (type == "1") {
			res.content.voucherType = "抵用券";
		} else if (type == "2") {
			res.content.voucherType = "加息券";
		}
		if (money == "0") {
			res.content.voucherMoney = "";
		}
	},
	tipsHover: function() {
		$(".td_tips").mouseover(function() {
			_tips.getTipsRight($(this), 13);
		});
		$(".td_tips").mouseout(function() {
			$(this).find('.tips').hide();
		});
	}
};
$(function() {
	ucInvest.init();
});