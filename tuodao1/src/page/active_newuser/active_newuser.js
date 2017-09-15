$(function() {
	// input框交互效果
	verify();
	function verify() {
			$("input").on("focus", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled") {
					return false;
				}
				$("input").removeClass("border-color");
				$(this).addClass("border-color");
			});
			$("input").on("blur", function() {
				$(this).removeClass("border-color");
			});
			$("input").on("mouseover", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled") {
					return false;
				}
				$(this).css("border-color", "#707070");
			});
			$("input").on("mouseleave", function() {
				$(this).css("border-color", "#DDDDDD");
			});
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

	// function isCardNo(card) {
	// 	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
	// 	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	// 	if (reg.test(card) === false) {
	// 		alert("身份证输入不合法");
	// 		return false;
	// 	}
	// }
	// 银行卡号验证
	var res;
	$(".bank_num input").on("change", function() {
		var val = $(this).val();
		val = val.replace(/\s/g, "");
		console.log(val);
		res = check(val);
		if (res == false) {
			$(this).addClass('red');
			$(".jg_box").show();
			$(".btn").removeClass('kd');
		} else {
			$(this).removeClass('red');
			$(".jg_box").hide();
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
	var phoneNum;
	$(".phone_Num input").on("keyup", function() {
		var phone = $(this).val();
		if(phone.length>=11){
			if (phone == "" || !(/^1[34578]\d{9}$/.test(phone))) {
				$(".phone_box").show();
				$(this).removeClass("border-color");
				$(this).addClass("red");
				phoneNum = false;
			} else {
				$(".phone_box").hide();
				$(this).removeClass("red");
				$(this).addClass("border-color");
				phoneNum = true;
			}
		}
		check_form();
	});
	$(".phone_Num input").on("blur", function() {
		var phone = $(this).val();
			if (phone == "" || !(/^1[34578]\d{9}$/.test(phone))) {
				$(".phone_box").show();
				$(this).addClass("red");
				phoneNum = false;
			} else {
				$(".phone_box").hide();
				$(this).removeClass("red");
				phoneNum = true;
			}
	});
	// 支付密码验证
	var payNum;
	$(".paynum input").on("blur", function() {
		var length = $(this).val().length;
		console.log(length);
		if (length < 6) {
			$(".pay_box").show();
			$(this).addClass("red");
			$(this).removeClass("border-color");
			payNum = false;
		} else if (length == 6) {
			$(".pay_box").hide();
			$(this).removeClass('red');
			$(this).addClass("border-color");
			payNum = true;
		}
		check_form();
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
		if (num <=0) {
			$(".success_box .mid span i").text(0);
		}
	}, 1000);

	// 验证表单是否输入完毕
	$(".username input").on("input propertychange", function() {
		check_form();
	});
	$(".idcard input").on("input propertychange", function() {
		check_form();
	});
	$(".bank_num input").on("input propertychange", function() {
		check_form();
	});
	$(".paynum input").on("input propertychange", function() {
		check_form();
	});
	function check_form() {
		var username = $(".username input").val();
		var idcard = $(".idcard input").val();
		var xx = $(".div_bank_select .xx").text();
		var bankNum = $(".bank_num input").val();
		if (username != "" && idcard != "" && xx != "" && bankNum != "" && phoneNum == true && payNum == true) {
			$(".btn").addClass("kd");
		} else if (username == "" || idcard == "" || xx == "" || bankNum == "" || phoneNum == false || payNum == false) {
			$(".btn").removeClass("kd");
		}
	}
	del(".user");
	del(".card");
	del(".card_num");
	del(".phoneNum");
	del(".pay");
	// 清空按钮显示
	function del(name){
		$(name).on("focus",function(){
			if($(name).val()==""){
				$(this).siblings(".del").hide();
			}else{
				$(this).siblings(".del").show();
			}
		});
		$(name).on("blur",function(){
			setTimeout(function(){
				$(name).siblings(".del").hide();
			},100);
		});
		$(name).on("keyup",function(){
			if($(this).val()==""){
				$(this).siblings(".del").hide();
			}else{
				$(this).siblings(".del").show();
			}
		});
		$(".del").on("click",function(){
				$(this).siblings(name).val("");
		});
	}
});