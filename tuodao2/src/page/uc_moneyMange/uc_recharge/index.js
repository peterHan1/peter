require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require("./uc_recharge.scss");
require("util/bankSelect/bankSelect.js");
require("util/bankSelect/bankSelect.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/security/security.js');
require('util/security/security.scss');
var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _yzm = require('util/security/security.js');
$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	// 验证输入金额
	var result1;
	_regular.checkMoney({
		elm: "money_input1",
		cls: "wrong_mess",
		callback: function(result) {
			result1 = result;
		}
	});
	var result2;
	_regular.checkMoneyFast({
		elm: "money_input2",
		cls: "wrong_mess",
		callback: function(result) {
			result2 = result;
		}
	});
	// 判断是否为清算时间
	var times = $(".qs_time").is(":hidden");
	console.log("time：" + times);
	var flag;
	$(".bank_select ul li").on("click", function() {
		flag = true;
		if (result1 == true && flag == true && times==true) {
			$(".item1 .btn").addClass("kd");
		} else {
			$(".item1 .btn").removeClass("kd");
		}
	});
	// tab栏切换
	// $(".recharge_top ul li").on("click", function() {
	// 	var _index = $(this).index();
	// 	_index = _index + 1;
	// 	$(".recharge_top ul li").removeClass("on");
	// 	$(this).addClass('on');
	// 	$(".recharge_window").eq(_index).show();
	// 	$(".recharge_window").eq(_index).siblings(".recharge_window").hide();
	// });
	$('.recharge_top ul li a').each(function() {
		if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
			$(this).parent().addClass('on');
			$(this).parent().siblings('li').removeClass('on');
			var _index = $(this).parent().index() + 1;
			$(".recharge_window").eq(_index).show().siblings(".recharge_window").hide();
		}
	});
	// 问号hover效果
	$(".bank_card .wen").on("mouseover", function() {
		$(".bank_card b").show();
	});
	$(".bank_card .wen").on("mouseleave", function() {
		$(".bank_card b").hide();
	});
	// 银行卡选择
	$(".bank_select ul li").on("click", function() {
		$(".bank_select ul li").removeClass("get");
		$(this).addClass("get");
	});
	// 按钮可点击
	$(".money_input1").on("blur", function() {
		if (result1 == true && flag == true && times==true) {
			$(".item1 .btn").addClass("kd");
		} else {
			$(".item1 .btn").removeClass("kd");
		}
	});
	$(".money_input2").on("blur", function() {
		if (result2 == true && times==true) {
			$(".item2 .btn").addClass("kd");
		} else {
			$(".item2 .btn").removeClass("kd");
		}
	});
	// 充值按钮点击后
	$(".item1 .btn").on("click", function() {
		if ($(this).hasClass('kd')) {
			layer.open({
				type: 1,
				title: '网银跳转提示',
				skin: 'success_box',
				area: ['561px', '340px'],
				content: $('#success_box'),
				cancel: function() {
					history.go(0);
				}
			});
		} else {
			return false;
		}
	});
	// 快捷支付按钮点击后
	$(".item2 .btn").on("click", function() {
		if ($(this).hasClass('kd')) {
			CutTime();
			$("#dy").attr("autofocus", "autofocus");
			layer.open({
				type: 1,
				title: '填写验证码',
				skin: 'secity_box',
				area: ['560px', '340px'],
				content: $('#secity_box'),
				cancel: function() {
					history.go(0);
				}
			});
			_yzm.check("demo", "border");
			var data = "123456";
			var status = 1;
			$(".lastnum").on("keyup", function() {
				var str = '';
				str = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
				console.log(str);
				if (str == data && status == 1) {
					layer.closeAll();
					layer.open({
						type: 1,
						title: '充值成功',
						skin: 'cz_success',
						area: ['560px', '340px'],
						content: $('#cz_success'),
						cancel: function() {
							history.go(0);
						}
					});
				} else if (str == data && status == 2) {
					layer.closeAll();
					layer.open({
						type: 1,
						title: '充值失败',
						skin: 'cz_fail',
						area: ['560px', '340px'],
						content: $('#cz_fail'),
						cancel: function() {
							history.go(0);
						}
					});
				} else if (str != data) {
					$("#demo input").val("");
					$(".wrong_ts").show();
					_yzm.check("demo", "border");
					$("#demo input").eq(5).removeClass("border");
					$("#demo input").eq(0).focus();
					$("#demo input").eq(0).addClass("border");
				}
			});

			// 验证码倒计时
			var num = 59;
			var flag;
			var timer;
			$(".count_time").on("click", function() {
				$(".count_time").hide();
				$(".djs").show();
				if (flag == false) {
					return false;
				} else {
					$(".count_num").text(59);
					num = $(".count_num").text();
					flag = false;
					timer = setInterval(function() {
						num--;
						$(".count_num").text(num);
						if (num <= 0) {
							clearInterval(timer);
							$(".count_time").show();
							$(".djs").hide();
							flag = true;
						}
					}, 1000);
				}
			});

			function CutTime() {
				timer = setInterval(function() {
					num--;
					$(".count_num").text(num);
					if (num <= 0) {
						clearInterval(timer);
						$(".count_time").show();
						$(".djs").hide();
					}
				}, 1000);
			}
		} else {
			return false;
		}
	});
	// 充值按钮移入
	$(".item1 .btn").on("mouseover", function() {
		if ($(this).hasClass('kd')) {
			$(this).addClass("color");
		} else {
			$(this).removeClass("color");
		}
	});
	$(".item1 .btn").on("mouseleave", function() {
		$(this).removeClass("color");
	});
	// 关闭弹窗
	$(".know").on("click", function() {
		layer.closeAll();
		history.go(0);
	});
});