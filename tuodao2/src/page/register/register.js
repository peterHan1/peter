var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _yzm = require('util/security/security.js');
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
		textMsg: "请按住滑块，拖到最右边 >>",
		successMsg: "验证通过",
		successColor: "#fff",
		time: 400,
		callback: function(result) {
			results = result;
			// console.log(results);
			checkform();
		}
	});
	_regular.checkPhoneOnkey({
		elm: "phone_Num",
		cls:"wrong_mess",
		callback: function(result) {
			res = result;
		}
	});
	_regular.checkPhoneOnBlur({
		elm: "phone_Num",
		cls:"wrong_mess",
		callback: function(result) {
			res = result;
		}
	});
	$(".phone_Num").on("keyup", function() {
		// var length = $(this).val().length;
		// if (length <= 11) {
		// 	$(".btn").removeClass("kd");
		// }
		checkform();
	});
	$(".phone_Num").on("blur", function() {
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
	// 验证码
	_yzm.check("demo", "border");
	// 判断是否最后一位密码输入完毕
	var data = "123456";
	$(".lastnum").on("keyup", function() {
		var str = '';
		str = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
		console.log(str);
		if (str == data) {
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
	});

	// 验证码倒计时
	var num = 59;
	var flag;
	$(".count_time").on("click", function() {
		$(".count_time").hide();
		$(".djs").show();
		if (flag == false) {
			return false;
		} else {
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
	// 页面跳转
	$(".btn").on("click", function() {
		if ($(".btn").hasClass("kd")) {
			$(".register").hide();
			$("#dy").attr("autofocus","autofocus");
			$(".yanzhengma").show();
			CutTime();
		} else {
			return false;
		}
	});
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
		} else if (mediumRegex.test($(this).val())) {
			$(".set_password .line .line1").css("background-color", "#ffc424");
			$(".set_password .line .line2").css("background-color", "#ffc424");
			$(".set_password .line .line3").css("background-color", "#dddddd");
			$(".set_password .psd_til_2").css("visibility", "visible");
		} else {
			$(".set_password .line .line1").css("background-color", "#e60012");
			$(".set_password .line .line2").css("background-color", "#dddddd");
			$(".set_password .line .line3").css("background-color", "#dddddd");
			$(".set_password .psd_til_1").css("visibility", "visible");
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
			$(".set_password").hide();
			$(".success_page").show();
		} else {
			return false;
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