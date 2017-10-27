require("../setpassword/setpassword.scss");
require('util/slider/jquery.slider.scss');
require('util/slider/jquery.slider.min.js');
require('page/common/nav2/index.scss');
require('util/security/security.js');
require('util/security/security.scss');



var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _yzm = require('util/security/security.js');
var md5 = require('util/md5.js');
var _del= require('util/delButton.js');

$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
	var res;
	var results;
	// 滑动验证
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
	// 手机号码正则验证
	_regular.checkPhoneOnkey({
		elm: "phoneNum",
		cls: "wrong_mess",
		callback: function(result) {
			res = result;
		}
	});
	_regular.checkPhoneOnBlur({
		elm: "phoneNum",
		cls: "wrong_mess",
		callback: function(result) {
			res = result;
		}
	});
	$(".phoneNum").on("keyup", function() {
		checkform();
	});
	$(".phoneNum").on("blur", function() {
		checkform();
	});
	function checkform() {
		if (results == true && res == true) {
			$(".set_btn").addClass("kd");
			$(".set_btn").on("mouseover", function() {
				$(this).addClass('color');
			});
			$(".set_btn").on("mouseleave", function() {
				$(this).removeClass('color');
			});
		} else {
			$(".set_btn").removeClass("kd");
			$(".set_btn").on("mouseover", function() {
				$(this).removeClass('color');
			});
		}
	}
	// 页面跳转
	$(".set_btn").on("click", function() {
		if ($(this).hasClass("kd")) {
			var phoneNum = $(".phoneNum").val();
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
					smsType: 'findPayPw'
				},
				success: function(data) {
					console.log(data);
					if (data.code == 100000) {
						$(".main_mid").hide();
						$(".yanzhengma").show();
						$("#dy").attr("autofocus", "autofocus");
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
	var data = "123456";
	$(".lastnum").on("keyup", function() {
		var smsCode = '';
		smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
		var phoneNum = $('.phoneNum').val();
		$.ajax({
			type: "POST",
			url: "http://72.127.2.37/api/router/common/validateSmsCode",
			data: {
				mobile: phoneNum,
				smsCode: smsCode,
				smsType: 'findPayPw'
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("accessId", "accessId");
				xhr.setRequestHeader("accessKey", "accessKey");
				xhr.setRequestHeader("sign", "NO");
			},
			success: function(data) {
				if (data.code == 100000) {
					$(".wrong_ts").hide();
					$(".ts").show();
					$(".yanzhengma").hide();
					$(".set_password").show();
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
			error:function(res){
				console.log(res);
			}
		});
	});
	// 验证码倒计时
	var num = 59;
	var flag;
	$(".count_time").on("click", function() {
		var phoneNum = $('.phoneNum').val();
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
					smsType: 'findPayPw'
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
	$(".back").on("click", function() {
		$(".register").show();
		$(".yanzhengma").hide();
		location.reload();
	});
	$('.set_password .pas_box .pas').on("keyup",function(){
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
	});
	// 提交
	$(".register_btn").on("click", function() {
		if ($(this).hasClass("kd")) {
			var phoneNum=$(".phoneNum").val();
			var pwd = $('.pas_box .pas').val();
			pwd=md5(pwd);
			var smsCode = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
			$.ajax({
				type: "POST",
				url: "http://72.127.2.37/api/router/user/forgetPayPw",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("accessId", "accessId");
					xhr.setRequestHeader("accessKey", "accessKey");
					xhr.setRequestHeader("sign", "NO");
				},
				data: {
					mobile: phoneNum,
					payPw: pwd,
					smsCode: smsCode
				},
				success: function(data) {
					console.log(data.msg);
					if (data.code == 100000) {
						$(".set_password").hide();
						$(".set_success").show();
					}
				},
				error: function(res) {
					console.log(res.msg);
				}
			});
		} else {
			return false;
		}
	});

	// input框删除按钮
	_del.inptxtDel(".phoneNum", ".set_btn");
	_del.inptxtDel(".pas", ".register_btn");
});