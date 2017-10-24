var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	// tab栏切换
	$('.cash_top ul li a').each(function() {
		if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
			$(this).parent().addClass('on');
			$(this).parent().siblings('li').removeClass('on');
			var _index = $(this).parent().index() + 1;
			$(".cash_window").eq(_index).show().siblings(".cash_window").hide();
		}
	});
	// 问号hover效果
	$(".bank_card .wen").on("mouseover", function() {
		$(".bank_card b").show();
	});
	$(".bank_card .wen").on("mouseleave", function() {
		$(".bank_card b").hide();
	});
	$(".zhye .wen").on("mouseover", function() {
		$(".zhye b").show();
	});
	$(".zhye .wen").on("mouseleave", function() {
		$(".zhye b").hide();
	});
	// 输入金额验证
	var result1;
	_regular.checkCashMoney({
		elm: "money_input1",
		cls: "wrong_mess",
		callback: function(result) {
			result1 = result;
		}
	});
	$(".money_input1").on("blur", function() {
		check();
	});
	var result2;
	$(".pass_input").on("blur", function() {
		var str = "123456";
		var val = $(this).val();
		if (val == str) {
			$(".wrongs").hide();
			result2 = true;
		} else {
			$(".wrongs").show();
			result2 = false;
		}
		check();
	});
	var times = $(".qs_time").is(":hidden");
	console.log("time：" + times);

	function check() {
		if (result1 == true && result2 == true && times==true) {
			$(".item1 .btn").addClass("kd");
		} else {
			$(".item1 .btn").removeClass("kd");
		}
	}
	// 提现按钮点击
	$(".item1 .btn").on("click", function() {
		if ($(this).hasClass('kd')) {
			layer.open({
				type: 1,
				title: '提现成功',
				skin: 'cash_success',
				area: ['560px', '340px'],
				content: $('#cash_success'),
				cancel: function() {
					history.go(0);
				}
			});
		} else {
			return false;
		}
	});
	// 关闭弹窗
	$(".know").on("click", function() {
		layer.closeAll();
		history.go(0);
	});
});