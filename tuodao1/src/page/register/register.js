$(function() {
	// input框交互效果
	verify();
	function verify() {
			$("input").on("focus", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).hasClass("jz")) {
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
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).hasClass("jz")) {
					return false;
				}
				$(this).css("border-color", "#707070");
			});
			$("input").on("mouseleave", function() {
				var type = $(this).attr("type");
				if(type == "button" || type == "submit" || $(this).attr("readonly")=="readonly" || $(this).attr("disabled")=="disabled" || $(this).hasClass("jz")) {
					return false;
				}
				$(this).css("border-color", "#DDDDDD");
			});
		}
	// 引用滑动验证
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
			// console.log(res);
			if ($(".phoneNum input").val() == "") {
				location.reload();
			} else if (result == true && res == true) {
				$(".btn").addClass("kd");
			}
		}
	});
	// 提示文本的显示隐藏
	$(".til").on("click", function() {
		$(".personNum").toggle();
	});
	// 验证手机号码
	$(".phoneNum input").on("keyup", function() {
		if($(this).val().length>=11){
			var re = checkPhone("phone_Num", "jg", "wz");
			res = re;
			return res;
		}
	});
	// $(".phoneNum input").on("focus", function() {
	// 	$(document).slider("restore");
	// });
	function checkPhone(input, ts, wz) {
		var data = "15649387762";
		var _this = $("." + input);
		var val = _this.val();
		if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
			$("." + wz).text("手机号必须由11位纯数字组成");
			$(".btn").removeClass("kd");
			$("." + ts).show();
			_this.addClass("red");
		} else {
			$("." + ts).hide();
			_this.removeClass("red");
			if (val !== data) {
				$("." + ts).show();
				$("." + wz).text("该手机号尚未注册拓道金服");
				_this.removeClass("red");
				return false;
			} else {
				$("." + ts).hide();
				_this.removeClass("red");
				return true;
			}
		}
	}
	// 验证码
	Num("demo", "border");
	function Num(box, cls) {
		var wrap = document.getElementById(box);
		var txts = wrap.getElementsByTagName("input");
		for (var i = 0; i < txts.length; i++) {
			var t = txts[i];
			t.index = i;
			t.setAttribute("readonly", "readonly");
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
			$(".yanzhengma").hide();
			$(".set_password").show();
			$(".wrong_ts").hide();
			$(".ts").show();
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
	var num = 59;
	var flag;
	$(".count_time").on("click", function() {
		$(".count_time").hide();
		$(".djs").show();
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
			$(".yanzhengma").show();
			$("#dy").attr("autofocus","autofocus");
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
		if (val !== "") {
			$(".register_btn").addClass("kd");
		} else {
			$(".register_btn").removeClass("kd");
		}
		$(".set_password .psd_til_1").hide();
		$(".set_password .psd_til_2").hide();
		$(".set_password .psd_til_3").hide();
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
			$(".set_password .psd_til_3").show();
		} else if (mediumRegex.test($(this).val())) {
			$(".set_password .line .line1").css("background-color", "#ffc424");
			$(".set_password .line .line2").css("background-color", "#ffc424");
			$(".set_password .line .line3").css("background-color", "#dddddd");
			$(".set_password .psd_til_2").show();
		} else {
			$(".set_password .line .line1").css("background-color", "#e60012");
			$(".set_password .line .line2").css("background-color", "#dddddd");
			$(".set_password .line .line3").css("background-color", "#dddddd");
			$(".set_password .psd_til_1").show();
		}
		return true;
	});
	// 确认注册
	$(".register_btn").on("click", function() {
		var val = $(".set_password .pas_box .pas").val();
		if (val == "") {
			return false;
		} else {
			$(".set_password").hide();
			$(".success_page").show();
		}
	});
	del(".phone_Num");
	del(".person_Num");
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