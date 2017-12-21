require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/laydate/index.js');

var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging 	= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var investSift 	= require('./Invest_scatter.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		this.eventFn(headerData);
		this.addHtml(headerData, "", "", "", 10, 1);
	},
	addHtml: function(headerData, sta, startime, endtime, pagesize, current) {
		_apiInvest.getScstter(headerData, sta, startime, endtime, pagesize, current, function(res) {
			if (res.content != null) {
				ucInvest.addScatterFn(res.content.list);
				_paging.paging("pageList", res.content.total, 10, function(e) {
					_apiInvest.getScstter(headerData, sta, startime, endtime, pagesize, e.current, function(res) {
						ucInvest.addScatterFn(res.content.list);
					});
				});
			} else {
				var dataNones = '<tr class="null_data"><td colspan="8"><div class="null_data_bg"></div><p>当前没有加入记录</p></td></tr>';
				$("#tbody_list").html(dataNones);
			}
		}, function(err) {
			console.log(err);
		});
	},
	addScatterFn: function(lists) {
		for (i in lists) {
			lists[i].voucherText = ucInvest.setShow(lists[i].voucherType, lists[i].voucherMoney);
		}
		$("#tbody_list").html(_td.renderHtml(investSift, {
			list: lists
		}));
		ucInvest.tipsHover();
		_td.trColor("tbody_list");
	},
	setShow: function(type, price) {
		switch (type) {
			case 0:
				return "-";
			case 1:
				return "抵用券" + price + "元";
			case 2:
				return "加息券" + price + "%";
			default:
				return "";
		}
	},
	eventFn: function(headerData) {
		$(".start_date").on("click", function() {
			var _this = $(this);
			var sta = $(this).parent(".uc_invest_tabR").attr("status");
			var endTime = $("#end_date").attr('endDate');
			laydate({
				elem: '#start_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
				choose: function(dates) {
					$("#start_date").attr("startDate", dates);
					ucInvest.addHtml(headerData, sta, dates, endTime, 10, 1);

				}
			});
		});
		$(".end_date").on("click", function() {
			var _this = $(this);
			var sta = $(this).parent(".uc_invest_tabR").attr("status");
			var startTime = $("#start_date").attr('startDate');
			laydate({
				elem: '#end_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
				choose: function(dates) {
					$("#end_date").attr("endDate", dates);
					ucInvest.addHtml(headerData, sta, startTime, dates, 10, 1);
				}
			});
		});
		$(".uc_invest_tabL li").on("click", function() {
			var sta = $(this).attr("status");
			$(".uc_invest_tabR").attr("status", sta);
			$("#start_date").attr("startdate", "").html("选择开始时间");
			$("#end_date").attr("enddate", "").html("选择结束时间");
			$(this).addClass('on').siblings('li').removeClass('on');
			ucInvest.addHtml(headerData, sta, "", "", 10, 1);

		});
	},
	tipsHover: function() {
		$(".td_name").mouseover(function() {
			if ($(this).find("a").width() > $(this).width()) {
				_tips.getTipsRight($(this), 15);
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