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


var moneyRecord = {
	init: function() {
		this.page();
		this.laydate();
		this.tabCut();
		this.remark();
	},
	page: function() {
		$(".zxf_pagediv").createPage({
			// 页数
			pageNum: 100,
			// 当前页
			current: 1,
			// 显示条数
			shownum: 10,
			backfun: function(e) {
				// $("#data-container").html(thisDate(e.current));
			}
		});
	},
	// 日历
	laydate: function() {
		$(".layer_date").on("click", function(event) {
			laydate({
				format: 'YYYY-MM-DD',
				// 选择时间后回调
				choose: function(dates) {
				}
			});
		});
	},
	// tab栏切换
	tabCut: function() {
		$(".record_top ul li").on("click", function() {
			var _index = $(this).index();
			$(".record_top ul li").removeClass("ones");
			$(this).addClass('ones');
			$(".record_box").eq(_index).show();
			$(".record_box").eq(_index).siblings(".record_box").hide();
		});
	},
	// 备注动态创建
	remark: function() {
		$(".record_box tbody tr .last i").on("mouseover", function() {
			$(".bz_tips").remove();
			var str = "<div class='bz_tips top-tips'>备注备备注备<span class=b></span><span class=t></span></div>";
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