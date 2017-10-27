require("./register.scss");
require('util/slider/jquery.slider.scss');
require('util/slider/jquery.slider.min.js');
require('util/security/security.js');
require('util/security/security.scss');
require('page/common/nav2/index.scss');


var _inp = require('util/yz.js');
var _yzm = require('util/security/security.js');
var _regular = require('util/regular.js');
var md5 = require('util/md5.js');
var _del = require('util/delButton.js');
var _sendSms = require('api/sendSms-api.js');
var _validateSmsCode = require('api/validateSmsCode-api.js');
var _register = require('api/register-api.js');



var rest;
var results;
var pwSecurityLevel;
var register = {
	init: function() {
		register.inputMutual();
		register.inputDel();
		register.phoneNumCheck();
		register.buttonVerify();
		register.sliderButton();
		register.checkForm();
		register.tsShow();
		register.pageSkip();
		register.sendAgain();
		// register.countDown();
		register.verifyCode();
		register.back();
		register.passwordCut();
		register.passStrength();
		register.notarizeRegister();
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
		_del.inptxtDel(".phone_Num", ".btn");
		_del.inptxtDel(".person_Num");
		_del.inptxtDel(".pas", ".register_btn");
	},
	// 滑动插件初始化
	sliderButton: function() {
		var _this = this;
		$("#slider2").slider({
			width: 340,
			height: 40,
			sliderBg: "#f2f2f2",
			color: "#9e9e9e",
			fontSize: 14,
			bgColor: "#58bd0d",
			textMsg: "请按住滑块，拖到最右边",
			successMsg: "验证通过",
			successColor: "#fff",
			time: 400,
			callback: function(result) {
				results = result;
				_this.checkForm();
			}
		});
	},
	// 手机号码格式以及唯一性验证
	phoneNumCheck: function() {
		_regular.checkPhonekeyOnRegister({
			elm: "phone_Num",
			cls: "wrong_mess",
			callback: function(result) {
				rest = result;
			}
		});
		_regular.checkPhoneblurOnRegister({
			elm: "phone_Num",
			cls: "wrong_mess",
			callback: function(result) {
				rest = result;
			}
		});
	},
	// input框触发验证事件
	buttonVerify: function() {
		var _this = this;
		$(".phone_Num").on("keyup", function() {
			_this.checkForm();
		});
		$(".phone_Num").on("blur", function() {
			_this.checkForm();
		});
	},
	// 验证按钮是否变色的函数
	checkForm: function() {
		if (results == true && rest == true) {
			$(".btn").addClass("kd");
			$(".btn").on("mouseover", function() {
				$(this).addClass('color');
			});
			$(".btn").on("mouseleave", function() {
				$(this).removeClass('color');
			});
		} else {
			$(".btn").removeClass("kd");
			$(".btn").on("mouseover", function() {
				$(this).removeClass('color');
			});
		}
	},
	// 推荐人输入框显示隐藏
	tsShow: function() {
		var count = 1;
		$(".til").on("click", function() {
			count++;
			if (count % 2 == 0) {
				$(".til .more").html("&#xe69c;");
			} else {
				$(".til .more").html("&#xe69a;");
			}
			$(".personNum").toggle();
		});
	},
	// 页面跳转
	pageSkip: function() {
		var num = 59;
		var _this = this;
		$(".btn").on("click", function() {
			if ($(".btn").hasClass("kd")) {
				var phoneNum = $(".phone_Num").val();
				$(".yanzhengma .til_all .phone_Num").html(phoneNum);
				_sendSms.sendSms(phoneNum, 'register', function(res) {
					if (res.code == 100000) {
						$(".register").hide();
						$("#dy").attr("autofocus", "autofocus");
						$(".yanzhengma").show();
						_this.countDown();
					}
				});
			}
		});
	},
	// 重新发送验证码点击
	sendAgain: function() {
		var num = 59;
		var flag = true;
		$(".count_time").on("click", function() {
			var phoneNum = $('.phone_Num').val();
			$(".count_time").hide();
			$(".djs").show();
			if (flag == false) {
				return false;
			} else {
				_sendSms.sendSms(phoneNum, 'register', function(res) {});
				$(".count_num").text(59);
				num = $(".count_num").text();
				flag = false;
				var timer = setInterval(function() {
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
	},
	// 动态倒计时
	countDown: function() {
		var num = 59;
		var timer = setInterval(function() {
			num--;
			$(".count_num").text(num);
			if (num <= 0) {
				clearInterval(timer);
				$(".count_time").show();
				$(".djs").hide();
			}
		}, 1000);
	},
	// 验证验证码
	verifyCode: function() {
		_yzm.check("demo", "border");
		// 判断是否最后一位密码输入完毕
		$(".lastnum").on("keyup", function() {
			var smsCode = '';
			smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
			var phoneNum = $('.phone_Num').val();
			_validateSmsCode.validateSmsCode(phoneNum, smsCode, 'register', function(res) {
				if (res.code == 100000 ) {
					$(".yanzhengma").hide();
					$(".set_password").show();
					$(".wrong_ts").hide();
					$(".ts").show();
				}else{
					console.log(res);
					$(".wrong_ts").show();
					$(".ts").hide();
					$("#demo input").val("");
					_yzm.check("demo", "border");
					$("#demo input").eq(5).removeClass("border");
					$("#demo input").eq(0).focus();
					$("#demo input").eq(0).addClass("border");
				}
			});
		});
	},
	// 返回上一步
	back: function() {
		$(".back").on("click", function() {
			$(".register").show();
			$(".yanzhengma").hide();
			location.reload();
		});
	},
	// 明码密码切换
	passwordCut: function() {
		$(" .yan_kai").on("click", function() {
			$(this).hide();
			$(".yan").show();
			$(".pas_box input").attr("type", "text");
		});
		$(".yan").on("click", function() {
			$(this).hide();
			$(".yan_kai").show();
			$(".pas_box input").attr("type", "password");
		});
	},
	// 密码强度判断
	passStrength: function() {
		$('.set_password .pas_box .pas').keyup(function(e) {
			var val = $(".set_password .pas_box .pas").val();
			var length = val.length;
			if (val !== "" && length >= 6) {
				$(".register_btn").addClass("kd");
				$(".register_btn").on("mouseover", function() {
					$(this).addClass('color');
				});
				$(".register_btn").on("mouseleave", function() {
					$(this).removeClass('color');
				});
			} else {
				$(".register_btn").removeClass("kd");
				$(".register_btn").on("mouseover", function() {
					$(this).removeClass('color');
				});
			}
			$(".set_password .psd_til_1").css("visibility", "hidden");
			$(".set_password .psd_til_2").css("visibility", "hidden");
			$(".set_password .psd_til_3").css("visibility", "hidden");
			var strongRegex = new RegExp("^(?=.{15,18})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
			var mediumRegex = new RegExp("^(?=.{6,12})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
			var enoughRegex = new RegExp("(?=.{1,6}).*", "g");
			if (false == enoughRegex.test($(this).val())) {
				$(".set_password .line .line1").css("background-color", "#dddddd");
				$(".set_password .line .line2").css("background-color", "#dddddd");
				$(".set_password .line .line3").css("background-color", "#dddddd");
			} else if (strongRegex.test($(this).val())) {
				$(".set_password .line .line1").css("background-color", "#30a744");
				$(".set_password .line .line2").css("background-color", "#30a744");
				$(".set_password .line .line3").css("background-color", "#30a744");
				$(".set_password .psd_til_3").css("visibility", "visible");
				pwSecurityLevel = 3;
			} else if (mediumRegex.test($(this).val())) {
				$(".set_password .line .line1").css("background-color", "#ffc424");
				$(".set_password .line .line2").css("background-color", "#ffc424");
				$(".set_password .line .line3").css("background-color", "#dddddd");
				$(".set_password .psd_til_2").css("visibility", "visible");
				pwSecurityLevel = 2;
			} else {
				$(".set_password .line .line1").css("background-color", "#e60012");
				$(".set_password .line .line2").css("background-color", "#dddddd");
				$(".set_password .line .line3").css("background-color", "#dddddd");
				$(".set_password .psd_til_1").css("visibility", "visible");
				pwSecurityLevel = 1;
			}
			return true;
		});
		$('.set_password .pas_box .pas').on("blur", function() {
			if ($(this).val().length < 6) {
				$(".register_btn").removeClass("kd");
			}
		});
	},
	notarizeRegister: function() {
		$(".register_btn").on("click", function() {
			if ($(this).hasClass("kd")) {
				console.log("密码强度：" + pwSecurityLevel);
				var phoneNum = $('.phone_Num').val();
				var pwd = $('.set_password .pas').val();
				pwd = md5(pwd);
				var personNum = $(".person_Num").val();
				var smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
				var data = {
					mobile: phoneNum,
					loginPassword: pwd,
					pwSecurityLevel: pwSecurityLevel,
					registerSource: 1,
					smsCode: smsCode
				};
				_register.register(data, function(res) {
					if (res.code == 100000) {
						$(".set_password").hide();
						$(".success_page").show();
					}
				});
			}
		});
	}
};
$(function() {
	register.init();
});