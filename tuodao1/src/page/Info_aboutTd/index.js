require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');
require('util/layer/index.js');
require('util/fancybox/source/jquery.fancybox.js');
require('util/fancybox/source/jquery.fancybox.scss');

$(function() {
	$(function(){
		$("a[rel=group]").fancybox({
			'titlePosition': 'over',
			'cyclic': true,
			'centerOnScroll': true,
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'titlePosition': 'inside',
			'showNavArrows': false
		});
	});
	$(".info_top ul li").on("click", function() {
		var index = $(this).index();
		$(".td_infomation").hide();
		$(".td_infomation").eq(index).show();
		$(this).addClass("on");
		$(this).siblings("li").removeClass("on");
	});
	// 企业简介弹窗
	$(".xg_info li").on("click", function() {
		var index = $(this).index();
		if (index == 0) {
			layer.open({
				type: 1,
				title: '从业机构平台信息',
				skin: 'win_one',
				area: ['562px', '500px'],
				content: $('#win_one')
			});
		} else if (index == 1) {
			layer.open({
				type: 1,
				title: '资金存管情况北京银行',
				skin: 'win_two',
				area: ['562px', '432px'],
				content: $('#win_two')
			});
		} else if (index == 2) {
			layer.open({
				type: 1,
				title: '董事、监事、高级管理人员名单',
				skin: 'win_three',
				area: ['562px', '172px'],
				content: $('#win_three')
			});
		} else if (index == 3) {
			layer.open({
				type: 1,
				title: '实际控制人与持股5%以上股东（当前）',
				skin: 'win_four',
				area: ['562px', '260px'],
				content: $('#win_four')
			});
		} else if (index == 4) {
			layer.open({
				type: 1,
				title: '从业机构重大事项信息',
				skin: 'win_fif',
				area: ['562px', '312px'],
				content: $('#win_fif')
			});
		}
	});
	// 发展历程轮播图
	var pic = 0;
	if (pic == 0) {
		$("#left").hide();
	}
	var width = $("#show_window").width();
	$("#right").on("click", function() {
		$("#left").show();
		if (pic < 2) {
			pic++;
			$("#view-box").animate({
				"left": pic * -width
			});

			if (pic == 2) {
				$("#right").hide();
			}
		}

	});
	$("#left").on("click", function() {
		$("#right").show();
		if (pic > 0) {
			pic--;
			$("#view-box").animate({
				"left": -pic * width
			});
			if (pic == 0) {
				$("#left").hide();
			}
		}
	});
});