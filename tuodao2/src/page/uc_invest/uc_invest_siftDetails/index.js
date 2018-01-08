require('page/common/uc-menu/index.js');
require('./index.scss');
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
		var _this = this;
		_apiInvest.getSiftDel(headerData, tender, function(res) {
			var com = res.content;
			com.returnWayText = _this.siftDetReturnWay(com.repayType);
			com.voucherUnit = _this.siftvouType(com.voucherType);
			com.statusText = _this.siftDetStatus(com.status);
			$(".sift_detailsT").html(_td.renderHtml(siftDel, {
				content: com
			}));
			_this.setProto(com.status, com.voucherType, com.borrowId);
			_this.tipsHover();
		}, function(err) {
			console.log(err);
		});
	},
	siftCreHtml: function(headerData, tender) {
		var _this = this;
		_apiInvest.getSiftCred(headerData, tender, 5, 1, function(res) {
			if (res.content == null) {
				_this.dataNull("tbody_list", "6", "资产匹配成功后显示债券明细");
			} else {
				_this.siftCreHtmlFn(res.content.list);
				_paging.paging("crePage", res.content.total, 5, function(e) {
					_apiInvest.getSiftCred(headerData, tender, 5, e.current, function(res) {
						_this.siftCreHtmlFn(res.content.list);
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
		var _this = this;
		for (i in lists) {
			var sta = lists[i].discountAvailable;
			var staTxt = _this.siftAvailable(sta);
			var dateExplains = _this.siftCreOper(lists[i].dateExplain);
			lists[i].staText = staTxt;
			lists[i].explainTxt = dateExplains.txt;
			lists[i].explainClas = dateExplains.clas;
			lists[i].explainUrl = dateExplains.url;
		};
		$("#tbody_list").html(_td.renderHtml(siftCre, {list: lists}));
		_this.listTipsHover();
	},
	siftRetHtml: function(headerData, tender) {
		var _this = this;
		_apiInvest.getSiftReturn(headerData, tender, 5, 1, function(res) {
			console.log(res);
			if (res.content == null) {
				_this.dataNull("tbody_list", "6", "当前没有回款计划");
			} else {
				_this.siftRetHtmlFn(res.content.list);
				_paging.paging("retPage", res.content.total, 5, function(e) {
					_apiInvest.getSiftReturn(headerData, tender, 5, e.current, function(res) {
						_this.siftRetHtmlFn(res.content.list);
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
		var _this = this;
		for (i in lists) {
			var status = lists[i].status;
			var statusTxt = _this.siftReturnSts(status);
			lists[i].statusText = statusTxt;
		};
		siftReHtml = _td.renderHtml(siftRet, {
			list: lists
		});
		$("#tbodys_list").html(siftReHtml);
		_td.trColor("tbody_list");
		_td.trColor("tbodys_list");
	},
	siftCreOper: function(dateExplain) {
		if(dateExplain == null || dateExplain == ""){
			return {"txt":"满标复审后生成授权委托书","clas":"aNull","url":"javascript:;"};
		}else{
			return {"txt":"查看借款协议","clas":"aData","url":dateExplain};
		}
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
	siftvouType: function(type) {
		switch (type) {
			case 0:
				return "-";
			case 1:
				return "抵用券";
			case 2:
				return "加息券";
			default:
				return "";
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
		$(".hint").mouseover(function() {
			_tips.getTipsRight($(this), -10);
		});
		$(".hint").mouseout(function() {
			$(this).find('.tips').hide();
		});
	},
	listTipsHover: function(){
		$(".td_name").mouseover(function() {
			if ($(this).find("a").width() >= $(this).width()) {
				_tips.getTipsRight($(this), 12);
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