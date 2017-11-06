require('page/common/uc-menu/index.js');
require("./uc_moneyRecord.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');


var _td = require('util/td.js');
var _moneyRecord = require('api/moneyMange-api.js');
var moneyRecords = require('./uc_moneyRecord.string');

var moneyRecord = {
	init: function() {
		this.page();
		this.laydate();
		this.tabCut();
		this.remark();
	},
	page: function() {
		var _this = this;
		_moneyRecord.moneyRecord(1, 10, function(res) {
			// console.log(res);
			if(res.content.list.length==0){
				$(".no_data").show();
			}
			moneyHtml = _td.renderHtml(moneyRecords, {
				list: res.content.list,
			});
			$('.money_records').html(moneyHtml);
			// _this.remark(res.content.list.remark);
			_moneyRecord.paging(res.content.pages, res.content.pageNum, res.content.pageSize,function(e) {
				_moneyRecord.moneyRecord(1, 10, function(res) {
					moneyHtml = _td.renderHtml(moneyRecords, {
						list: res.content.list,
					});
					$('.money_records').html(moneyHtml);
					// _this.remark(res.content.list.remark);
				});
			});
		});
	},
	// 日历
	laydate: function() {
		$(".layer_date").on("click", function(event) {
			laydate({
				format: 'YYYY-MM-DD',
				// 选择时间后回调
				choose: function(dates) {
					var _this = this;
					_moneyRecord.moneyRecord(1, 10,function(res) {
						// console.log(res);
						moneyHtml = _td.renderHtml(moneyRecords, {
							list: res.content.list,
						});
						$('.money_records').html(moneyHtml);
						// _this.remark(res.content.list.remark);
						_moneyRecord.paging(res.content.pages, res.content.pageNum, res.content.pageSize,function(e) {
							_moneyRecord.moneyRecord(1, 10, function(res) {
								moneyHtml = _td.renderHtml(moneyRecords, {
									list: res.content.list,
								});
								$('.money_records').html(moneyHtml);
								// _this.remark(res.content.list.remark);
							});
						});
					});
				}
			});
		});
	},
	// tab栏切换
	tabCut: function() {
		$('.record_top ul li a').each(function() {
			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
				$(this).addClass('ones');
				$(this).parent().siblings('li').find("a").removeClass('ones');
				var _index = $(this).parent().index();
				$(".record_box").eq(_index).show().siblings(".record_box").hide();
			}
		});
	},
	// 备注动态创建
	remark: function() {
		$(".record_box tbody tr .last i").on("mouseover", function() {
			$(".bz_tips").remove();
			var str = "<div class='bz_tips top-tips'>备注备注<span class=b></span><span class=t></span></div>";
			$(this).parent().append(str);
			var width = $(".bz_tips").outerWidth() / 2;
			$(".bz_tips").css({
				"left": "50%",
				"margin-left": -width
			});
		});
		$(".record_box tbody tr .last i").on("mouseleave", function() {
			$(".bz_tips").remove();
		});
		$(".record_box").on("mouseleave", function() {
			$(".bz_tips").remove();
		});
	}
};
$(function() {
	moneyRecord.init();
});