require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td 		= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _returnmon 	= require('util/return_date/date_time.js');
var _paging 	= require('util/paging/index.js');
var _apiReturn 	= require('api/trade-api.js');
var returnList 	= require('./returnList.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		this.sumMoney(headerData);
		this.monthStatus(headerData);
	},

	// 待收总额
	sumMoney: function(headerData) {
		_apiReturn.getsumMoney(headerData, function(res) {
			$(".sum_money").html(res.content);
		}, function(err) {
			console.log(err);
		});
	},
	// 月份日期状态
	monthStatus: function(headerData) {
		_returnmon.returnMoney();
		var year = $(".f_year").html();
		var month = $(".f_month").html() * 1;
		if (month < 10) {
			month = "0" + month;
		};
		var dataMonth = year + "-" + month;
		ucInvest.dayStatus(headerData, dataMonth);
		ucInvest.getMoney(headerData, dataMonth, 1);
		ucInvest.getReturnList(headerData, dataMonth, 1, 4, 1);
		_returnmon.clickMontn({
			left: "data_top_btn_l",
			right: "data_top_btn_r",
			callback: function(yy, mm) {
				if (mm < 10) {
					mm = "0" + mm;
				};
				dataMonth = yy + "-" + mm;
				ucInvest.dayStatus(headerData, dataMonth);
				ucInvest.getMoney(headerData, dataMonth, 1);
				ucInvest.getReturnList(headerData, dataMonth, 1, 4, 1);
				ucInvest.dayContent(headerData);
			}
		});
		ucInvest.dayContent(headerData);
	},
	// 点击某天的信息展示
	dayContent: function(headerData) {
		_returnmon.clickDay({
			elm: "data_number",
			callback: function(days, day) {
				$(".re_money_d").html(day + '日');
				var getday = days;
				ucInvest.getMoney(headerData, getday, 0);
				ucInvest.getReturnList(headerData, getday, 0, 4, 1);
			}
		});
	},
	// 获取本息
	getMoney: function(headerData, day, type) {
		_apiReturn.getMoneys(headerData, day, type, function(res) {
			$(".per_money").html(res.content.preCollection);
			$(".real_money").html(res.content.realCollection);
		}, function(err) {
			console.log(err);
		});
	},
	getReturnList: function(headerData, day, type, pagesize, current) {
		_apiReturn.getRturnList(headerData, day, type, pagesize, current, function(res) {
			var lists = res.content.list;
			for (i in lists) {
				var type = lists[i].type;
				var status = lists[i].status;
				var types = ucInvest.setType(type);
				var sta = ucInvest.setStatus(status);
				lists[i].typeText = types;
				lists[i].tstatusText = sta.txt;
				lists[i].tstatusClas = sta.clas;
			};
			retList = _td.renderHtml(returnList, {
				list: lists,
			});
			$('#tbody_list').html(retList);
			_paging.paging("pageList", res.content.total, pagesize, function(e) {
				_apiReturn.getRturnList(headerData, day, type, pagesize, e.current, function(res) {
					var lists = res.content.list;
					for (i in lists) {
						var type = lists[i].type;
						var status = lists[i].status;
						var types = ucInvest.setType(type);
						var sta = ucInvest.setStatus(status);
						lists[i].typeText = types;
						lists[i].tstatusText = sta.txt;
						lists[i].tstatusClas = sta.clas;
					};
					retList = _td.renderHtml(returnList, {
						list: lists,
					});
					$('#tbody_list').html(retList);
					ucInvest.tipsHover();
					_td.trColor("tbody_list");
				}, function(err) {
					console.log(err);
				});
			});
			ucInvest.tipsHover();
			_td.trColor("tbody_list");
		}, function(err) {
			console.log(err);
		});
	},
	// 给当月某天有回款的添加样式
	dayStatus: function(headerData, month) {
		_apiReturn.getMonth(headerData, month, function(res) {
			$.each(res.content, function(i, key) {
				var day = key.day;
				var status = key.status;
				var clas = "";
				if (status == 0) {
					clas = "await_money";
				} else {
					clas = "yet_money";
				}
				$(".data_table .data_number").eq(day - 1).addClass(clas);

			});
		}, function(err) {
			console.log(err);
		});
	},
	// 回款类型
	setType: function(type) {
		switch (type) {
			case 0:
				return "本息";
			case 1:
				return "收益";
			default:
				return "";
		}
	},
	setStatus: function(sta) {
		if (sta == 1) {
			return {
				"txt": "已回款",
				"clas": "return_money"
			};
		} else {
			return {
				"txt": "未回款",
				"clas": "underway_money"
			};
		}
	},
	tipsHover: function() {
		$(".return_td_name").mouseover(function() {
			if ($(this).find("a").width() >= $(this).width()) {
				_tips.getTipsRight($(this), 15);
			}
		});
		$(".return_td_name").mouseout(function() {
			$(this).find('.tips').hide();
		});
	}
};
$(function() {
	ucInvest.init();
});