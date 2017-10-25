require("./register.scss");
require('util/slider/jquery.slider.scss');
require('util/slider/jquery.slider.min.js');
require('util/security/security.js');
require('util/security/security.scss');
require('page/common/nav2/index.scss');
var _inp = require('util/yz.js');
var _yzm = require('util/security/security.js');
var md5 = require('util/md5.js');
$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	var res;
	var results;
	// 初始化
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
			checkform();
		}
	});
	$(".phone_Num").on("keyup", function() {
		var val = $(this).val();
		var _this = $(this);
		var ts = "<p class='wrong_mess'>&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>手机号必须由11位纯数字组成！</span></p>";
		var th = "<p class='wrong_mess'>&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>该手机号已注册拓道金服，请直接登录！</span></p>";
		if (val.length >= 11) {
			if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
				_this.parent().append(ts);
				res = false;
				_this.addClass("red");
			} else {
				_this.siblings(".wrong_mess").remove();
				_this.removeClass("red");
				var phoneNum = $('.phone_Num').val();
				$.ajax({
					type: "POST",
					url: "http://72.127.2.37/api/router/user/validateMobileRegistered",
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accessId", "accessId");
						xhr.setRequestHeader("accessKey", "accessKey");
						xhr.setRequestHeader("sign", "NO");
					},
					data: {
						mobile: phoneNum
					},
					success: function(data) {
						console.log(data);
						if (val != "" && data.content == false) {
							res = true;
							_this.removeClass("red");
							_this.siblings(".wrong_mess").remove();
						} else {
							res = false;
							_this.parent().append(th);
							_this.addClass("red");
						}
					}
				});
			}
		}
		checkform();
	});
	$(".phone_Num").on("blur", function() {
		var ts = "<p class='wrong_mess'>&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>手机号必须由11位纯数字组成！</span></p>";
		var th = "<p class='wrong_mess'>&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>该手机号已注册拓道金服，请直接登录！</span></p>";
		var val = $(this).val();
		var _this = $(this);
		if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
			_this.parent().append(ts);
			res = false;
			_this.addClass("red");
		} else {
			_this.siblings(".wrong_mess").remove();
			_this.removeClass("red");
			var phoneNum = $('.phone_Num').val();
			$.ajax({
				type: "POST",
				url: "http://72.127.2.37/api/router/user/validateMobileRegistered",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("accessId", "accessId");
					xhr.setRequestHeader("accessKey", "accessKey");
					xhr.setRequestHeader("sign", "NO");
				},
				data: {
					mobile: phoneNum
				},
				success: function(data) {
					console.log(data.content);
					if (val != "" && data.content == false) {
						res = true;
						_this.removeClass("red");
						_this.siblings(".wrong_mess").remove();
					} else {
						res = false;
						_this.parent().append(th);
						_this.addClass("red");
					}
				}
			});
		}
		checkform();
	});

	function checkform() {
		if (results == true && res == true) {
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
	}
	// 提示文本的显示隐藏
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
	// 页面跳转
	$(".btn").on("click", function() {
		if ($(".btn").hasClass("kd")) {
			var phoneNum = $(".phone_Num").val();
			$(".yanzhengma .til_all .phone_Num").html(phoneNum);
			$.ajax({
				type: "POST",
				url: "http://72.127.2.37/api/router/common/sendSms",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("accessId", "accessId");
					xhr.setRequestHeader("accessKey", "accessKey");
					xhr.setRequestHeader("sign", "NO");
				},
				data: {
					mobile: phoneNum,
					smsType: 'register'
				},
				success: function(data) {
					console.log(data);
					if (data.code == 100000) {
						$(".register").hide();
						$("#dy").attr("autofocus", "autofocus");
						$(".yanzhengma").show();
						CutTime();
					}
				}
			});
		} else {
			return false;
		}
	});
	// 验证码
	_yzm.check("demo", "border");
	// 判断是否最后一位密码输入完毕
	$(".lastnum").on("keyup", function() {
		var smsCode = '';
		smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
		var phoneNum = $('.phone_Num').val();
		$.ajax({
			type: "POST",
			url: "http://72.127.2.37/api/router/common/validateSmsCode",
			data: {
				mobile: phoneNum,
				smsCode: smsCode,
				smsType: 'register'
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("accessId", "accessId");
				xhr.setRequestHeader("accessKey", "accessKey");
				xhr.setRequestHeader("sign", "NO");
			},
			success: function(data) {
				if (data.code == 100000) {
					$(".yanzhengma").hide();
					$(".set_password").show();
					$(".wrong_ts").hide();
					$(".ts").show();
				} else {
					$(".wrong_ts").show();
					$(".ts").hide();
					$("#demo input").val("");
					_yzm.check("demo", "border");
					$("#demo input").eq(5).removeClass("border");
					$("#demo input").eq(0).focus();
					$("#demo input").eq(0).addClass("border");
				}
			},
			error: function(res) {
				console.log(res);
			}
		});
	});

	// 验证码倒计时
	var num = 59;
	var flag;
	$(".count_time").on("click", function() {
		var phoneNum = $('.phone_Num').val();
		$(".count_time").hide();
		$(".djs").show();
		if (flag == false) {
			return false;
		} else {
			$.ajax({
				type: "POST",
				url: "http://72.127.2.37/api/router/common/sendSms",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("accessId", "accessId");
					xhr.setRequestHeader("accessKey", "accessKey");
					xhr.setRequestHeader("sign", "NO");
				},
				data: {
					mobile: phoneNum,
					smsType: 'register'
				},
				success: function(data) {}
			});
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

	function CutTime() {
		var timer = setInterval(function() {
			num--;
			$(".count_num").text(num);
			if (num <= 0) {
				clearInterval(timer);
				$(".count_time").show();
				$(".djs").hide();
			}
		}, 1000);
	}
	// 返回上一步
	$(".back").on("click", function() {
		$(".register").show();
		$(".yanzhengma").hide();
		location.reload();
	});
	// 点击眼睛显示明码密码
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
	// 密码强度判断
	var pwSecurityLevel;
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
	// 确认注册
	$(".register_btn").on("click", function() {
		if ($(this).hasClass("kd")) {
			console.log("密码强度：" + pwSecurityLevel);
			var phoneNum = $('.phone_Num').val();
			var pwd = $('.set_password .pas').val();
			pwd = md5(pwd);
			var personNum = $(".person_Num").val();
			var smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
			$.ajax({
				type: "POST",
				url: "http://72.127.2.37/api/router/user/register",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("accessId", "accessId");
					xhr.setRequestHeader("accessKey", "accessKey");
					xhr.setRequestHeader("sign", "NO");
				},
				data: {
					mobile: phoneNum,
					loginPassword: pwd,
					pwSecurityLevel: pwSecurityLevel,
					registerSource: 1,
					inviterMobile: personNum,
					smsCode: smsCode
				},
				success: function(data) {
					console.log(data.msg);
					if (data.code == 100000) {
						$(".set_password").hide();
						$(".success_page").show();
					}
				},
				error: function(res) {
					console.log(res.msg);
				}
			});
		}
	});
	del(".phone_Num", ".btn");
	del(".person_Num");
	del(".pas", ".register_btn");
	// 清空按钮显示
	function del(name, el) {
		$(name).on("focus", function() {
			if ($(name).val() == "") {
				$(this).siblings(".del").hide();
			} else {
				$(this).siblings(".del").show();
			}
		});
		$(name).on("blur", function() {
			setTimeout(function() {
				$(name).siblings(".del").hide();
			}, 300);
		});
		$(name).on("keyup", function() {
			if ($(this).val() == "") {
				$(this).siblings(".del").hide();
			} else {
				$(this).siblings(".del").show();
			}
		});
		$(".del").on("click", function() {
			$(this).siblings(name).val("");
			$(el).removeClass("kd");
			$(el).on("mouseover", function() {
				$(this).removeClass('color');
			});
		});
	}
});