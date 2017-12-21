require("./register.scss");
require('util/security/security.js');
require('util/security/security.scss');
require('page/common/nav2/index.js');
require('util/slider/index.js');
require("util/placeholder.js");

var _td = require('util/td.js');
var _yzm = require('util/security/security.js');
var md5 = require('util/md5.js');
var _del = require('util/delButton.js');
var _hover = require('util/btnHover.js');
var _base = require('api/base-api.js');
var _user = require('api/user-api.js');


// 表单里的错误提示
var formError = {
	show: function(id, errMsg) {
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<span>' + errMsg + '</span></p>';
		if ($(id).parent().find('p').length <= 0) {
			return $(id).parent().append(el);
		}
	},
	hide: function() {
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$('p.form-error-info').remove();
	},
	allShow: function(errMsg) {},
	allHide: function() {}

};


var slider;
var register = {
	init: function() {
		this.bindEvent();
		this.slider();
		this.inputDel();
		this.btnHover();
		this.tsShow();
		this.pageSkip();
		this.sendAgain();
		this.verifyCode();
		this.back();
		this.passwordCut();
		this.passStrength();
		this.btnDo();
		this.notarizeRegister();
	},
	bindEvent: function() {
		var _this = this;
		$('input, textarea').placeholder();
		// 获得焦点
		$('div input').focus(function() {
			if ($(this).attr("jz") == "jz") {
				return false;
			} else {
				_this.focus(this);
			}
		});
		// 失去焦点
		$('.register input').blur(function() {
			_this.blur();
		});
		$('.register input').keyup(function() {
			if ($('#mobile').val().length >= 11) {
				_this.blur();
			} else {
				if ($('#mobile').val().length > 0) {
					_this.blur();
				}
				formError.hide();
			}
		});
		$('div input').mouseover(function() {
			if ($(this).attr("jz") == "jz") {
				return false;
			} else {
				_this.mouseover(this);
			}
		});
		$('div input').mouseout(function() {
			if ($(this).attr("jz") == "jz") {
				return false;
			} else {
				_this.mouseover();
			}
		});
	},
	focus: function(obj) {
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$(obj).addClass('focus-input');
	},
	blur: function() {
		var formData = {
				mobile: $.trim($('#mobile').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		if (validateResult.status && slider == true) {
			// console.log(validateResult.msg + 'ooo');
			formError.hide();
			$(".register .btn").addClass("kd");
			$(".register .btn").removeAttr('disabled');
		} else {
			$(".register .btn").removeClass("kd");
			$(".register .btn").attr('disabled', 'disabled');
			formError.hide();
			var id = '#' + validateResult.id;
			formError.show(id, validateResult.msg);
		}
	},
	mouseover: function(obj) {
		$('input').removeClass('hover-input');
		$(obj).addClass('hover-input');
	},
	mouseout: function() {
		$('input').removeClass('hover-input');
	},
	// 表单验证
	formValidate: function(formData) {
		var result = {
			status: false,
			id: false,
			msg: ''
		};
		if (!_td.validate(formData.mobile, 'mobile')) {
			result.msg = '手机号必须由11位纯数字组成';
			result.id = 'mobile';
			return result;
		} else {
			_user.checkPhone(formData.mobile, function(res) {
				if (res.content == true) {
					result.msg = '该手机号已注册拓道金服，请直接登录！';
					result.id = 'mobile';
					result.status = false;
					return result;
				} else {
					// 通过验证，返回正确提示
					result.status = true;
					result.id = true;
					result.msg = '验证通过';
					return result;
				}
			});
		}
		return result;
	},
	// 滑动模块初始化
	slider: function() {
		var _this = this;
		$("#slider2").slider({
			width: 342,
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
				slider = result;
				_this.blur();
			}
		});
	},
	btnHover: function() {
		_hover.btnHover(".register .btn");
		_hover.btnHover(".register_btn");
	},
	// input框输入时删除文本按钮
	inputDel: function() {
		_del.inptxtDel(".register .phone_Num", ".register .btn");
		_del.inptxtDel(".register .person_Num", ".register .btn");
		_del.inptxtDel(".pas", ".register_btn");
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
				_base.sendSms(phoneNum, 'register', function(res) {
						$(".register").hide();
						$("#dy").attr("autofocus", "autofocus");
						$(".yanzhengma").show();
						_this.countDown();
						_yzm.check("demo", "border");
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
				_base.sendSms(phoneNum, 'register', function(res) {});
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
		$(".lastnum").on("keyup", function(event) {
			var event = event || window.event;
			var smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
			var phoneNum = $('.phone_Num').val();
			var yzmData = {
				mobile: phoneNum,
				smsCode: smsCode,
				smsType: 'register'
			};
			if (event.keyCode == 8) {
				return;
			} else {
				_base.validateSmsCode(yzmData, function(res) {
					$(".yanzhengma").hide();
					$(".set_password").show();
					$(".wrong_ts").hide();
					$(".ts").show();
				}, function(errMsg) {
					$(".wrong_ts").show();
					$(".ts").hide();
					$("#demo input").val("");
					_yzm.check("demo", "border");
					$("#demo input").eq(5).removeClass("border");
					$("#demo input").eq(0).focus();
					$("#demo input").eq(0).addClass("border");
				});
			}
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
		$(" .yan").on("click", function() {
			$(this).hide();
			$(".yan").show();
			$(".pas_box input").attr("type", "text");
		});
		$(".yan_kai").on("click", function() {
			$(this).hide();
			$(".yan").show();
			$(".pas_box input").attr("type", "password");
		});
	},
	// 	// 密码强度判断
	passStrength: function() {
		var val = $.trim($(".set_password .pas_box .pas").val());
		$(".set_password .psdtil").css("visibility", "hidden");
		var strongRegex = new RegExp("^(?=.{15,18})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		var mediumRegex = new RegExp("^(?=.{6,12})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		var enoughRegex = new RegExp("(?=.{1,6}).*", "g");
		if (false == enoughRegex.test(val)) {
			$(".set_password .line .lines").css("background-color", "#dddddd");
		} else if (strongRegex.test(val)) {
			$(".set_password .line .lines").css("background-color", "#30a744");
			$(".set_password .psd_til_3").css("visibility", "visible");
			pwSecurityLevel = 3;
		} else if (mediumRegex.test(val)) {
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
	},
	// 确认注册按钮逻辑
	btnDo: function() {
		var _this = this;
		$('.set_password .pas_box .pas').keyup(function(e) {
			var val = $.trim($(".set_password .pas_box .pas").val());
			var length = val.length;
			_this.passStrength();
			if (val !== "" && length >= 6) {
				$(".register_btn").addClass("kd");
			} else {
				$(".register_btn").removeClass("kd");
			}
		});
		$('.set_password .pas_box .pas').on("blur", function() {
			if ($(this).val().length < 6) {
				$(".register_btn").removeClass("kd");
			}
		});
		$(".set_password .del").on("click", function() {
			$(".set_password .psdtil").css("visibility", "hidden");
			$(".set_password .line .lines").css("background-color", "#dddddd");
		});
	},
	// 确认注册发送请求
	notarizeRegister: function() {
		$(".register_btn").on("click", function() {
			if ($(this).hasClass("kd")) {
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
				_user.register(data, function(res) {
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