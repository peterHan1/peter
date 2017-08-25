$(function() {
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
		$(".tips").show();
	});

	$(".bank_all #wen").on("mouseleave", function() {
		$(".tips").hide();
	});

	// 银行卡号验证
	$(".bank_num input").on("change", function() {
		var val = $(this).val();
		val=val.replace(/\s/g, "");
		console.log(val);
		var res = check(val);
		console.log(res);
		if (res == false) {
			$(this).addClass('red');
			$(".jg_box").show();
		} else {
			$(this).removeClass('red');
			$(".jg_box").hide();
			$('.phone_Num input').removeAttr("readonly");
		}
	});
	$(".bank_num input").on("keyup", function() {
		$(".jg_box").hide();
		$(this).removeClass('red');
		var data = $(this).val();
		$(".big_font").show();
		$(".big_font").text(data);
		$(this).addClass('border');
	});
	$(".bank_num input").on("blur", function() {
		$(".big_font").hide();
		$(this).removeClass('border');
	});
	var check = function(content) {
		var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
		if (reg.test(content)) {
			return true;
		}
		return false;
	};

	// 手机号码正则验证
	$(".phone_Num input").on("change", function() {
		var phone = $(this).val();
		if (phone == "" || !(/^1[34578]\d{9}$/.test(phone))) {
			$(".phone_box").show();
			$(this).addClass("red");
		} else {
			$(".phone_box").hide();
			$(this).removeClass("red");
			$('.paynum input').removeAttr("readonly");
		}
	});
	// 支付密码验证
	$(".paynum input").on("change", function() {
		var length = $(this).val().length;
		if (length < 6) {
			$(".pay_box").show();
			$(this).addClass('red');
		} else {
			$(".pay_box").hide();
			$(this).removeClass('red');
			$(".btn").addClass("kd");
		}
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
		if (num < 0) {
			$(".success_box .mid span i").text(0);
		}
	}, 1000);

	$(".username input").on("change", function() {
		if ($(".username input").val() != "") {
			$(".idcard input").removeAttr("readonly");
		}
	});

	$(".idcard input").on("change", function() {
		if ($(".idcard input").val() != "") {
			$(".bank_num input").removeAttr("readonly");
		}
	});

});