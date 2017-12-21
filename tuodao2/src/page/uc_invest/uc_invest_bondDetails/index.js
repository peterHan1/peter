require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _apiInvest 	= require('api/trade-api.js');
var _paging		= require('util/paging/index.js');
var bondDel 	= require('./bondDel.string');
var bondDelRet 	= require('./bondDelRet.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		var tenderId = _td.getUrlParam("tender");
		this.eventFn();
		this.urlEach();
		this.detailTopHtml(headerData, tenderId);
		this.detailRetHtml(headerData, tenderId);
	},
	urlEach: function() {
		$('.bond_tab a').each(function() {
			if (location.href.indexOf('uc_invest_bondDetails.html') > -1) {
				if ($(this).html() == "已受让") {
					$(this).addClass('on');
				}
			} else {
				$('.bond_tab a').removeClass('on');
			};

		});
	},
	detailTopHtml: function(headerData, tenderId) {
		_apiInvest.getBondTop(headerData, tenderId, function(res) {
			var com = res.content;
			com.statusText = ucInvest.detailsStatus(com.status);
			com.wayText = ucInvest.detailsReturnWay(com.styleType);
			$(".sift_detailsT").html(_td.renderHtml(bondDel, {
				content: com
			}));
			ucInvest.tipsHover();
		}, function(err) {
			console.log(err);
		});
	},
	detailRetHtml: function(headerData, tenderId) {
		_apiInvest.getBondRet(headerData, tenderId, 5, 1, function(res) {
			ucInvest.detailRetHtmlFn(res.content.list);
			_paging.paging("pageList", res.content.total, 5, function(e) {
				_apiInvest.getBondRet(headerData, tenderId, 5, e.current, function(res) {
					ucInvest.detailRetHtmlFn(res.content.list);
				}, function(err) {
					console.log(err);
				});
			});
		}, function(err) {
			console.log(err);
		});
	},
	detailRetHtmlFn: function(lists) {
		for (i in lists) {
			lists[i].statusClas = ucInvest.setListStatus(lists[i].status);
		}
		$("#tbody_list").html(_td.renderHtml(bondDelRet, {
			list: lists
		}));
		_td.trColor("tbody_list");
	},
	setListStatus: function(str) {
		switch (str) {
			case "回款中":
				return "underway_money";
			case "已回款":
				return "return_money";
			default:
				return "";
		}
	},
	detailsStatus: function(sta) {
		switch (sta) {
			case 1:
				return "[募集中]";
			case 2:
				return "[回款中]";
			case 3:
				return "[已回款]";
			default:
				return "";
		}
	},
	detailsReturnWay: function(type) {
		switch (type) {
			case 0:
				return "等额本息";
			case 1:
				return "按月付息，到期还本";
			default:
				return "";
		}
	},
	eventFn: function() {
		$(".sift_detailsBTit li").on('click', function() {
			var ind = $(this).index();
			$(this).addClass('on').siblings('li').removeClass('on');
			$(".sift_detailsTab").eq(ind).show().siblings().hide();
		});
	},
	tipsHover: function() {
		$(".td_name").mouseover(function() {
			if ($(this).find("a").width() >= $(this).width()) {
				_tips.getTipsRight($(this), 0);
			}
		});
		$(".td_name").mouseout(function() {
			$(this).find('.tips').hide();
		});
	}
};
$(function() {
	ucInvest.init();
});