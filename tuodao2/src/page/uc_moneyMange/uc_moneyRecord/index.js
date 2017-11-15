require('page/common/uc-menu/index.js');
require("./uc_moneyRecord.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');


var _td = require('util/td.js');
var _trade = require('api/trade-api.js');
var moneyRecords = require('./uc_moneyRecord.string');
var _page = require('util/paging/index.js');


var headerData = {
	accessId: _td.getAccess('accessId'),
	accessKey: _td.getAccess('accessKey')
};
var type = -1;
var moneyRecord = {
	init: function() {
		this.page();
		this.tabCut();
		this.laydate();
	},
	page: function() {
		var _this = this;
		var data = {
			type: type,
			currentPage: 1,
			pageSize: 10,
		};
		_trade.moneyRecord(headerData, data, function(res) {
			// console.log(res);
			if (res.content.list.length == 0) {
				$(".no_data").show();
			}
			moneyHtml = _td.renderHtml(moneyRecords, {
				list: res.content.list,
			});
			$('.money_records').html(moneyHtml);
			_this.remark();
			_page.paging('pageList', res.content.total, 10, function(e) {
				var data = {
					type: type,
					currentPage: e.current,
					pageSize: 10,
				};
				_trade.moneyRecord(headerData, data, function(res) {
					moneyHtml = _td.renderHtml(moneyRecords, {
						list: res.content.list,
					});
					$('.money_records').html(moneyHtml);
					_this.remark();
				});
			});
		});
	},
	// 日历
	laydate: function() {
		var _this = this;
		$(".layer_date").on("click", function(event) {
			laydate({
				format: 'YYYY-MM-DD',
				// 选择时间后回调
				choose: function(dates) {
					// console.log(dates);
					var data = {
						type: type,
						currentPage: 1,
						pageSize: 10,
						startTime: dates,
						endTime: dates
					};
					_trade.moneyRecord(headerData, data, function(res) {
						if (res.content.list.length == 0) {
							$(".no_data").show();
						}
						moneyHtml = _td.renderHtml(moneyRecords, {
							list: res.content.list,
						});
						$('.money_records').html(moneyHtml);
						_this.remark();
						_page.paging('pageList', res.content.total, 10, function(e) {
							var data = {
								type: type,
								currentPage: e.current,
								pageSize: 10,
								startTime: dates,
								endTime: dates
							};
							_trade.moneyRecord(headerData, data, function(res) {
								moneyHtml = _td.renderHtml(moneyRecords, {
									list: res.content.list,
								});
								$('.money_records').html(moneyHtml);
								_this.remark();
							});
						});
					});
				}
			});
		});
	},
	// tab栏切换
	tabCut: function() {
		var _this = this;
		$(".record_top ul li").on("click", function() {
			$(".no_data").hide();
			$(".record_top ul li").removeClass("ones");
			$(this).addClass("ones");
			type = $(this).attr("type");
			if (type == 0) {
				$(".no_data p").html("当前没有投资记录");
			} else if (type == 1) {
				$(".no_data p").html("当前没有回款记录");
			} else if (type == 2) {
				$(".no_data p").html("当前没有充值记录");
			} else if (type == 3) {
				$(".no_data p").html("当前没有提现记录");
			} else {
				$(".no_data p").html("当前没有资金记录");
			}
			var data = {
				type: type,
				currentPage: 1,
				pageSize: 10,
			};
			_trade.moneyRecord(headerData, data, function(res) {
				if (res.content.list.length == 0) {
					$(".no_data").show();
				}
				moneyHtml = _td.renderHtml(moneyRecords, {
					list: res.content.list,
				});
				$('.money_records').html(moneyHtml);
				_this.remark();
				_page.paging('pageList', res.content.total, 10, function(e) {
					var data = {
						type: type,
						currentPage: e.current,
						pageSize: 10,
					};
					_trade.moneyRecord(headerData, data, function(res) {
						moneyHtml = _td.renderHtml(moneyRecords, {
							list: res.content.list,
						});
						$('.money_records').html(moneyHtml);
						_this.remark();
					});
				});
			});
		});
	},
	// 备注动态创建
	remark: function() {
		$(".record_box tbody tr .last i").on("mouseover", function() {
			$(".bz_tips").hide();
			$(this).parent().find(".bz_tips").show();
			var width = $(this).parent().find(".bz_tips").outerWidth() / 2;
			$(this).parent().find(".bz_tips").css({
				"left": "50%",
				"margin-left": -width
			});
		});
	}
};
$(function() {
	moneyRecord.init();
});