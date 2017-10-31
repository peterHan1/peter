require("../active_newuser/active_newuser.scss");
require("util/bank/bank_open.scss");
require("util/bank/bank.js");
require('page/common/nav2/index.scss');


var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _del = require('util/delButton.js');

var phoneNum;
var payNum;
var DepositInfoUser = {
	init: function() {
		this.inputMutual();
		this.inputDel();
		this.phoneNumCheck();
		this.payNumCheck();
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
	},
	// 手机号码格式验证
	phoneNumCheck: function() {
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
	},
	payNumCheck: function() {
		_regular.checkPaynum({
			elm: "pay",
			cls: "wrong_mess",
			callback: function(result) {
				payNum = result;
			}
		});
	},
	// input框触发验证事件
	buttonVerify: function() {
		var _this = this;
		$(".phoneNum").on("keyup", function() {
			_this.checkForm();
		});
		$(".phoneNum").on("blur", function() {
			_this.checkForm();
		});
		$(".paynum input").on("blur", function() {
			_this.checkForm();
		});
	},
	// 监听按钮变色的函数
	checkForm: function() {
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
	// 提示文本的显示
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
	DepositInfoUser.init();
});