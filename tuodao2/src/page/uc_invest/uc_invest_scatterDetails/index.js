require('page/common/uc-menu/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging 	= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var scatterTlt 	= require('./scatter_tlt.string');
var scatterList = require('./scatter_list.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		var tender = _td.getUrlParam("tender");
		this.addTlt(headerData, tender);
		this.addList(headerData, tender, 1, 5);
	},
	addTlt: function(headerData, id) {
		var _this = this;
		_apiInvest.getScstterDet(headerData, id, function(res) {
			var commons = res.content;
			var vouchers = _this.setShow(commons.voucherType, commons.voucherMoney);
			commons.refundWayText = _this.scatterDetReturnWay(commons.refundWay);
			commons.voucherVal = vouchers.m;
			commons.voucherText = vouchers.voucher;
			commons.voucherTUnit = vouchers.unit;
			$(".sift_detailsT").html(_td.renderHtml(scatterTlt, {
				content: commons
			}));
			_this.tipsHover();
			_this.getStatus();
		}, function(err) {
			console.log(err);
		});
	},
	addList: function(headerData, id, current, page) {
		_apiInvest.getScstterList(headerData, id, current, page, function(res) {
			if (res.content.list != null) {
				$("#tbody_list").html(_td.renderHtml(scatterList, {
					list: res.content.list
				}));
				_paging.paging("pageList", res.content.total, 5, function(e) {
					_apiInvest.getScstterList(id, e.current, 5, function(res) {
						$("#tbody_list").html(_td.renderHtml(scatterList, {
							list: res.content.list
						}));
						_td.trColor("tbody_list");
					}, function(err) {
						console.log(err);
					});
				});
				_td.trColor("tbody_list");
			} else {
				var dataNones = '<tr><td colspan="8"><div class="null_data" colspan="8"><div class="null_data_bg"></div><p>当前没有回款计划</p></div></td></tr>';
				$("#tbody_list").html(dataNones);
			}
		}, function(err) {
			console.log(err);
		});
	},
	setShow: function(type, money) {
		switch (type) {
			case 0:
				return {
					"voucher": "-",
					"m": "",
					"unit": ""
				};
			case 1:
				return {
					"voucher": "抵用券",
					"m": money,
					"unit": "元"
				};
			case 2:
				return {
					"voucher": "加息券",
					"m": money,
					"unit": "%"
				};
			default:
				return "";
		}
	},
	getStatus: function() {
		var sta = $(".tlt_status").attr("status");
		var t = $(".ac").attr("type");
		if (sta == 2 || sta == 5) {
			$(".prot").show();
		} else {
			$(".prot").remove();
		}
		if (t == "" || t == null) {
			$(".ac").remove();
		}
	},
	scatterDetReturnWay: function(refundWay) {
		switch (refundWay) {
			case 0:
				return "等额本息";
			case 1:
				return "按月付息，到期还本";
			case 2:
				return "按天付息";
			default:
				return "";
		}
	},
	tipsHover: function() {
		$(".hint").mouseover(function() {
			_tips.getTipsRight($(this), 0);
		});
		$(".hint").mouseout(function() {
			$(this).find('.tips').hide();
		});
	}
};
$(function() {
	ucInvest.init();
});