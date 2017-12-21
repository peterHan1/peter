require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging 	= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var siftDel 	= require('./invest_sift_detalis.string');
var siftCre 	= require('./invest_sift_cred.string');
var siftRet 	= require('./invest_sift_return.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		var tender = _td.getUrlParam("tender");
		this.eventFn();
		this.siftTopHtml(headerData, tender);
		this.siftCreHtml(headerData, tender);
		this.siftRetHtml(headerData, tender);
	},
	siftTopHtml: function(headerData, tender) {
		_apiInvest.getSiftDel(headerData, tender, function(res) {
			var com = res.content;
			com.returnWayText = ucInvest.siftDetReturnWay(com.repayType);
			com.statusText = ucInvest.siftDetStatus(com.status);
			$(".sift_detailsT").html(_td.renderHtml(siftDel, {
				content: com
			}));
			ucInvest.setProto(com.status, com.voucherType, com.borrowId);
			ucInvest.siftvouType();
			ucInvest.tipsHover();
		}, function(err) {
			console.log(err);
		});
	},
	siftCreHtml: function(headerData, tender) {
		_apiInvest.getSiftCred(headerData, tender, 5, 1, function(res) {
			if (res.content == null) {
				ucInvest.dataNull("tbody_list", "6", "资产匹配成功后显示债券明细");
			} else {
				ucInvest.siftCreHtmlFn(res.content.list);
				_paging.paging("crePage", res.content.total, 5, function(e) {
					_apiInvest.getSiftCred(headerData, tender, 5, e.current, function(res) {
						ucInvest.siftCreHtmlFn(res.content.list);
					}, function(err) {
						console.log(err);
					});
				});
			}
		}, function(err) {
			console.log(err);
		});
	},
	siftCreHtmlFn: function(lists) {
		for (i in lists) {
			var sta = lists[i].discountAvailable;
			var staTxt = ucInvest.siftAvailable(sta);
			lists[i].staText = staTxt;
		};
		var borwA = "<a href='###'>查看借款协议</a>";
		var tranA = "<a href='###'>查看转让协议</a>";
		$("#tbody_list").html(_td.renderHtml(siftCre, {
			list: lists
		}));
		ucInvest.siftCreOper(borwA, tranA);
	},
	siftRetHtml: function(headerData, tender) {
		_apiInvest.getSiftReturn(headerData, tender, 5, 1, function(res) {
			console.log(res);
			if (res.content == null) {
				ucInvest.dataNull("tbody_list", "6", "当前没有回款计划");
			} else {
				ucInvest.siftRetHtmlFn(res.content.list);
				_paging.paging("retPage", res.content.total, 5, function(e) {
					_apiInvest.getSiftReturn(headerData, tender, 5, e.current, function(res) {
						ucInvest.siftRetHtmlFn(res.content.list);
					}, function(err) {
						console.log(err);
					});
				});
			}
		}, function(err) {
			console.log(err);
		});
	},
	siftRetHtmlFn: function(lists) {
		for (i in lists) {
			var status = lists[i].status;
			var statusTxt = ucInvest.siftReturnSts(status);
			lists[i].statusText = statusTxt;
		};
		siftReHtml = _td.renderHtml(siftRet, {
			list: lists
		});
		$("#tbodys_list").html(siftReHtml);
		_td.trColor("tbody_list");
		_td.trColor("tbodys_list");
	},
	siftCreOper: function(a1, a2) {
		var oper = $(".tb_oper");
		$.each(oper, function(i) {
			var h = $(this).attr("opera");
			if (h == "待回款") {
				$(this).html(a1);
			} else if (h == "匹配中") {
				$(this).html("满标复审后生成借款协议");
			} else if (h == "转让成功") {
				$(this).html(a2);
			}
		});
		var a1 = '<a href="###">查看借款协议</a>';
		var a2 = '满标复审后生成借款协议';
		var a3 = '<a href="###">查看转让协议</a>';
	},
	siftAvailable: function(sta) {
		switch (sta) {
			case 0:
				return "匹配中";
			case 1:
				return "投标成功";
			case 2:
				return "还款中";
			case 3:
				return "投标失败";
			case 4:
				return "标的撤回";
			case 5:
				return "还款完成";
			case 6:
				return "转让申请";
			case 7:
				return "转让成功";
			case 8:
				return "撤销投标";
			default:
				return "";
		}
	},
	siftReturnSts: function(status) {
		switch (status) {
			case 0:
				return "未回款";
			case 1:
				return "已回款";
			case 2:
				return "提前回款";
			case 7:
				return "已转让";
			default:
				return "";
		}
	},
	siftDetStatus: function(status) {
		switch (status) {
			case 0:
				return "[匹配中]";
			case 1:
				return "[回款中]";
			case 2:
				return "[已撤标]";
			case 3:
				return "[流标]";
			case 4:
				return "[已回款]";
			case 5:
				return "[撤销]";
			default:
				return "";
		}
	},
	setProto: function(status, voType, id) {
		if (status == 1 || status == 4) {
			var proto = '<a href="uthorization.html?tender=' + id + '">《精选计划授权委托书》</a>';
			$(".sift_con_mesR").html(proto);
		} else if (status == 0) {
			var proto = '<p>满标复审后生成授权委托书</p>';
			$(".sift_con_mesR").html(proto);
		} else if (status == 2 || status == 3 || status == 5 && voType != 0) {
			var proto = '<p>投资金额和优惠券已返回到账户</p>';
			$(".sift_con_mesR").html(proto);
		} else if (status == 2 || status == 3 || status == 5 && voType == 0) {
			var proto = '<p>投资金额已返回到账户</p>';
			$(".sift_con_mesR").html(proto);
		}
	},
	siftDetReturnWay: function(type) {
		switch (type) {
			case "0":
				return "等额本息";
			case "1":
				return "按月付息，到期还本";
			case "2":
				return "按天付息";
			default:
				return "";
		}
	},
	siftvouType: function() {
		var typ = $(".vouType").attr("type");
		if (typ == "0") {
			$(".vouType").html("-");
		}
	},
	dataNull: function(el, num, str) {
		var datanull = '<tr class="null_data"><td colspan=' + num + '><div class="null_data_bg"></div><p>' + str + '</p></td></tr>';
		$("#" + el).html(datanull);
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