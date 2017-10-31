require('page/common/uc-menu/index.js');
require("./uc_messageCenter.scss");
require('util/paging/page.scss');
require('util/paging/page.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var messageCenter = {
	init: function() {
		this.page();
		this.toggle();
		this.readButton();
	},
	// 分页
	page: function() {
		$(".zxf_pagediv").createPage({
			// 页数
			pageNum: 10,
			// 当前页
			current: 1,
			// 显示条数
			shownum: 10,
			backfun: function(e) {
				console.log(e.current);
				// $("#data-container").html(thisDate(e.current));
			}
		});
	},
	// 消息列表点击展开关闭
	toggle: function() {
		$(".message_main ul li").on("click", function() {
			var height = $(this).height();
			var count = $(".message_top .count i").html();
			if ($(this).find("dt").hasClass('color')) {
				count = count - 1;
				$(".message_top .count i").html(count);
			} else {}
			if (height == 50) {
				$(this).find("i").html("&#xe69c;");
				$(this).css({
					"height": "83px",
					"line-height": "41.5px"
				});
			} else {
				$(this).find("i").html("&#xe69a;");
				$(this).css({
					"height": "50px",
					"line-height": "50px"
				});
			}
			$(this).find("dd").toggle();
			$(this).find("dt").removeClass("color");
			if ($(".message_main ul li dt").hasClass('color')) {
				return false;
			} else {
				$(".message_top .btn").addClass("jy");
			}
		});
	},
	// 全部标为已读按钮
	readButton: function() {
		$(".message_top .btn").on("click", function() {
			$(".message_main li dt").removeClass("color");
			$(this).removeClass("color");
			$(this).addClass("jy");
			$(".message_top .count i").html("0");
		});
	}
};
$(function() {
	messageCenter.init();
});