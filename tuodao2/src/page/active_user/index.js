require("../active_newuser/active_newuser.scss");
require("util/bank/bank_open.scss");
require("util/bank/bank.js");
require('page/common/nav2/index.scss');



var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _del= require('util/delButton.js');


$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	// 手机号码正则验证
	var phoneNum;
	_regular.checkPhoneKey({
		elm: "phoneNum",
		cls: "wrong_mess",
		callback: function(result) {
			phoneNum = result;
		}
	});
	_regular.checkPhoneBlur({
		elm: "phoneNum",
		cls: "wrong_mess",
		callback: function(result) {
			phoneNum = result;
		}
	});
	$(".phone_Num input").on("keyup", function() {
		check_form();
	});
	$(".phone_Num input").on("blur", function() {
		check_form();
	});
	// 支付密码验证
	var payNum;
	_regular.checkPaynum({
		elm: "pay",
		cls: "wrong_mess",
		callback: function(result) {
			payNum = result;
		}
	});
	$(".paynum input").on("blur", function() {
		check_form();
	});

	function check_form() {
		if (phoneNum == true && payNum == true) {
			$(".btn").addClass("kd");
			$(".btn").on("mouseover", function() {
				$(this).addClass('color');
			});
			$(".btn").on("mouseleave", function() {
				$(this).removeClass('color');
			});
		} else if (phoneNum == false || payNum == false) {
			$(".btn").removeClass("kd");
			$(".btn").on("mouseover", function() {
				$(this).removeClass('color');
			});
		}
	}
	// 点击眼睛显示明码密码
	$(".paynum .yan_kai").on("click", function() {
		$(this).hide();
		$(".yan").show();
		$(".paynum input").attr("type", "text");
	});
	$(".paynum .yan").on("click", function() {
		$(this).hide();
		$(".yan_kai").show();
		$(".paynum input").attr("type", "password");
	});
	// 问号显示
	$(".bank_all #wen").on("mouseover", function() {
		$(".bank_all .tips").show();
	});

	$(".bank_all #wen").on("mouseleave", function() {
		$(".bank_all .tips").hide();
	});
	// 激活验证
	$(".btn").on("click", function() {
		var type = 1;
		if ($(this).hasClass("kd")) {
			if (type == 1) {
				$(".success_box").show();
				$(".main").hide();
			} else {
				$(".wait_box").show();
				$(".main").hide();
			}
		} else {
			$(".js_box").show();
			return false;
		}
	});


	// 倒计时
	var num = $(".success_box .mid span i").text();
	var timer = setInterval(function() {
		num--;
		$(".success_box .mid span i").text(num);
		if (num <= 0) {
			$(".success_box .mid span i").text(0);
		}
	}, 1000);


	// input框清空按钮
	_del.inptxtDel(".phoneNum", ".btn");
	_del.inptxtDel(".pay", ".btn");
});