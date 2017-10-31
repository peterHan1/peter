require("util/bank/bank_open.scss");
require("util/bank/bank.js");
require("./active_newuser.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/nav2/index.scss');


var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _del = require('util/delButton.js');

var bankNum;
var phoneNum;
var payNum;
var DepositInfoNew = {
	init: function() {
		this.inputMutual();
		this.inputDel();
		this.inputCheck();
		this.buttonVerify();
		this.checkForm();
		this.passwordCut();
		this.tsShow();
		this.activateUser();
	},
	// input框交互样式
	inputMutual: function() {
		_inp.focus("input");
		_inp.blur("input");
		_inp.mouseover("input");
		_inp.mouseleave("input");
	},
	// input框输入时删除文本按钮
	inputDel: function() {
		_del.inptxtDel(".phoneNum", "btn");
		_del.inptxtDel(".pay", ".btn");
		_del.inptxtDel(".user", ".btn");
		_del.inptxtDel(".card", ".btn");
		_del.inptxtDel(".card_num", ".btn");
	},
	// 银行卡，手机号码，支付密码，验证
	inputCheck: function() {
		// 银行卡号验证
		_regular.checkBankNum({
			elm: "card_num",
			cls: "wrong_mess",
			callback: function(result) {
				bankNum = result;
			}
		});
		// 手机号码正则验证
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
		// 支付密码验证
		_regular.checkPaynum({
			elm: "pay",
			cls: "wrong_mess",
			callback: function(result) {
				payNum = result;
			}
		});
	},
	// input触发验证函数
	buttonVerify: function() {
		var _this = this;
		// 手机号码输入和失去焦点验证
		$(".phone_Num input").on("keyup", function() {
			_this.checkForm();
		});
		$(".phone_Num input").on("blur", function() {
			_this.checkForm();
		});
		// 银行卡号失去焦点验证
		$(".bank_num input").on("blur", function() {
			$(".big_font").hide();
			_this.checkForm();
		});
		$(".bank_num input").on("keyup", function() {
			$(".bank_num .wrong_mess").remove();
			$(this).removeClass('red');
			var data = $(this).val();
			$(".big_font").show();
			$(".big_font").text(data);
		});
		// 支付密码失去焦点验证
		$(".paynum input").on("blur", function() {
			_this.checkForm();
		});
		// 输入姓名input框状态监听
		$(".username input").on("input  propertychange", function() {
			_this.checkForm();
		});
		// 身份证号验证
		$(".idcard input").on("input  propertychange", function() {
			_this.checkForm();
		});
		// 选择银行状态监听
		$(".bank_all").on("click",function(){
			setTimeout(function(){
				_this.checkForm();
			},300);
		});
	},
	checkForm: function() {
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
	},
	// 点击切换密码明码密码
	passwordCut: function() {
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
	},
	// 提示文本显示隐藏
	tsShow: function() {
		$(".bank_all #wen").on("mouseover", function() {
			$(".bank_all .tips").show();
		});

		$(".bank_all #wen").on("mouseleave", function() {
			$(".bank_all .tips").hide();
		});
	},
	// 激活存管用户验证
	activateUser: function(){
		var _this=this;
		$(".btn").on("click", function() {
			var type = 1;
			if ($(this).hasClass("kd")) {
				if (type == 1) {
					$(".success_box").show();
					$(".main").hide();
					_this.countTime();
				} else {
					$(".wait_box").show();
					$(".main").hide();
				}
			} else {
				$(".js_box").show();
				return false;
			}
		});
	},
	// 倒计时
	countTime: function(){
		var num = $(".success_box .mid span i").text();
		var timer = setInterval(function() {
			num--;
			$(".success_box .mid span i").text(num);
			if (num <= 0) {
				$(".success_box .mid span i").text(0);
			}
		}, 1000);
	}
};
$(function() {
	DepositInfoNew.init();
});