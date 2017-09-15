$(function() {
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
			if (result == true && res==true) {
				$(".set_btn").addClass("kd");
			}
		}
	});

	// 验证码
	Num("demo", "border");

	function Num(box, cls) {
		var wrap = document.getElementById(box);
		var txts = wrap.getElementsByTagName("input");
		for (var i = 0; i < txts.length; i++) {
			var t = txts[i];
			t.index = i;
			t.setAttribute("readonly", true);
			t.onkeyup = function() {
				this.value = this.value.replace(/\D/g, '');
				if (this.value == "") {
					return false;
				}
				var next = this.index + 1;
				var last = this.index;
				if (next > txts.length - 1) return;
				txts[next].removeAttribute("readonly");
				txts[next].focus();
				txts[next].className = cls;
				txts[last].classList.remove(cls);
			};
		}
		txts[0].removeAttribute("readonly");
	}
	// 判断是否最后一位密码输入完毕
	var data = "123456";
	$(".lastnum").on("keyup", function() {
		var str = '';
		str = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
		console.log(str);
		if (str == data) {
			$(".wrong_ts").hide();
			$(".ts").show();
			$(".yanzhengma").hide();
			$(".set_password").show();
		} else {
			$(".wrong_ts").show();
			$(".ts").hide();
			$("#demo input").val("");
			Num("demo", "border");
			$("#demo input").eq(5).removeClass("border");
			$("#demo input").eq(0).focus();
			$("#demo input").eq(0).addClass("border");
		}
	});
	// 验证码倒计时
	var num = 5;
	var flag;
	$(".count_num").on("click", function() {
		$(".count_num").css("color", "#9e9e9e");
		$(".count_time").show();
		if (flag == false) {
			return false;
		} else {
			$(".count_num").text(5);
			num = $(".count_num").text();
			flag = false;
			var timer = setInterval(function() {
				num--;
				$(".count_num").text(num);
				if (num <= 0) {
					clearInterval(timer);
					$(".count_num").text("重新获取验证码");
					$(".count_time").hide();
					$(".count_num").css("color", "#ff7400");
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
				$(".count_num").text("重新获取验证码");
				$(".count_num").css("color", "#ff7400");
				$(".count_time").hide();
			}
		}, 1000);
	}

	// 点击眼睛显示明码密码
	$(".yan_kai").on("click", function() {
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
		if (val !== "") {
			$(".register_btn").addClass("kd");
		} else {
			$(".register_btn").removeClass("kd");
		}
		$(".set_password .psd_til_1").css("visibility","hidden");
		$(".set_password .psd_til_2").css("visibility","hidden");
		$(".set_password .psd_til_3").css("visibility","hidden");
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
			$(".set_password .psd_til_3").css("visibility","visible");
		} else if (mediumRegex.test($(this).val())) {
			$(".set_password .line .line1").css("background-color", "#ffc424");
			$(".set_password .line .line2").css("background-color", "#ffc424");
			$(".set_password .line .line3").css("background-color", "#dddddd");
			$(".set_password .psd_til_2").css("visibility","visible");
		} else {
			$(".set_password .line .line1").css("background-color", "#e60012");
			$(".set_password .line .line2").css("background-color", "#dddddd");
			$(".set_password .line .line3").css("background-color", "#dddddd");
			$(".set_password .psd_til_1").css("visibility","visible");
		}
		return true;
	});

	// 手机号码正则验证
	$(".phoneNum").on("change", function() {
		var re=checkPhone("phoneNum","jg","wz");
		res=re;
		return res;
	});

	function checkPhone(input, ts,wz) {
		var data = "15649387762";
		var _this = $("." + input);
		var val = _this.val();
		if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
			$("." + wz).text("手机号必须由11位纯数字组成");
			$("." + ts).show();
			_this.addClass("red");
		} else {
			$("." + ts).hide();
			_this.removeClass("red");
			if (val !== data) {
				$("." + ts).show();
				$("." + wz).text("该手机号尚未注册拓道金服");
				_this.addClass("red");
				return false;
			} else {
				$("." + ts).hide();
				_this.removeClass("red");
				return true;
			}
		}
	}
	// 页面跳转
	$(".set_btn").on("click", function() {
		if ($(this).hasClass("kd")) {
			$(".main_mid").hide();
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
	// 提交
	$(".register_btn").on("click", function() {
		var val = $(".set_password .pas_box .pas").val();
		if (val == "") {
			return false;
		} else {
			$(".set_password").hide();
			$(".set_success").show();
		}
	});

	// 支付密码验证
	function ValidateNumber(e, pnumber) {
		if (!/^\d+$/.test(pnumber)) {
			e.value = /^\d+/.exec(e.value);
		}
		return false;
	}
});