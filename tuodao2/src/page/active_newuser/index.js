require("util/bank/bank_open.scss");
require("util/bank/bank.js");
require("./active_newuser.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/nav2/index.scss');



var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _del= require('util/delButton.js');


$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	// 银行卡号验证
	var bankNum;
	_regular.checkBankNum({
		elm: "card_num",
		cls:"wrong_mess",
		callback: function(result) {
			bankNum = result;
		}
	});
	$(".bank_num input").on("blur", function() {
		$(".big_font").hide();
		check_form();
	});
	$(".bank_num input").on("keyup", function() {
		$(".bank_num .wrong_mess").remove();
		$(this).removeClass('red');
		var data = $(this).val();
		$(".big_font").show();
		$(".big_font").text(data);
	});
	// 手机号码正则验证
	var phoneNum;
	_regular.checkPhoneKey({
		elm: "phoneNum",
		cls:"wrong_mess",
		callback: function(result) {
			phoneNum = result;
		}
	});
	_regular.checkPhoneBlur({
		elm: "phoneNum",
		cls:"wrong_mess",
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
		cls:"wrong_mess",
		callback: function(result) {
			payNum = result;
		}
	});
	$(".paynum input").on("blur", function() {
		check_form();
	});
	// 姓名验证
	$(".username input").on("input  propertychange", function() {
		check_form();
	});
	// 身份证号验证
	$(".idcard input").on("input  propertychange", function() {
		check_form();
	});
	// 身份证号验证
	$(".idcard input").on("input  propertychange", function() {
		setTimeout(function() {
			check_form();
		}, 300);
	});

	function check_form() {
		var username = $(".username input").val();
		var idcard = $(".idcard input").val();
		var xx = $(".div_bank_select .xx").text();
		if (username != "" && idcard != "" && xx != "" && bankNum == true && phoneNum == true && payNum == true) {
			$(".btn").addClass("kd");
			$(".btn").on("mouseover", function() {
				$(this).addClass('color');
			});
			$(".btn").on("mouseleave", function() {
				$(this).removeClass('color');
			});
		} else if (username == "" || idcard == "" || xx == "" || bankNum == "" || phoneNum == false || payNum == false) {
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

	_del.inptxtDel(".user",".btn");
	_del.inptxtDel(".card",".btn");
	_del.inptxtDel(".card_num",".btn");
	_del.inptxtDel(".phoneNum",".btn");
	_del.inptxtDel(".pay",".btn");
});
