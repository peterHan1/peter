require('page/common/nav2/index.js');
require("./userlogin.scss");
require('util/slider/jquery.slider.scss');
require('util/slider/jquery.slider.min.js');
require('page/common/nav2/index.scss');

var _td = require('util/td.js');
var md5 = require('util/md5.js');
var _apiUser = require('api/user-api.js');
// var yzSlider = require();

// 表单里的错误提示
var formError = {
	show : function(id,errMsg){
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<span>'+errMsg+'</span></p>';
		if($(id).parent().find('p').length <=0){
			return $(id).parent().append(el);
		}
	},
	hide : function(){
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$('p').remove();
	},
	allShow : function(errMsg){
		$('.all-errinfo').html('<i class="iconfont">&#xe671;</i>'+errMsg+'，请重新输入');
	},
	allHide : function(){
		$('.all-errinfo').html('');
	}

};

// 登录页逻辑部分
var loginPage = {
	// 初始化
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		// 获得焦点
		$('form div input').focus(function(){
			_this.focus(this);
		});
		// 失去焦点
		$('form div input').blur(function(){
			_this.blur();
		});
		$('form div input').keyup(function(){
			if($('#mobile').val().length > 11){
				_this.blur();
			}else{
				if($('#mobile').val().length>0){
					_this.blur();
				}
				formError.hide();
			}
		});
		$('form div input').mouseover(function(){
			_this.mouseover(this);
		});
		$('form div input').mouseout(function(){
			_this.mouseover();
		});
		// 点击登录
		$('form').submit(function(){
			_this.submit();
			return false;
		});


	},
	//
	focus : function(obj){
		$('.all-errinfo').html('');
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$(obj).addClass('focus-input');
	},
	blur : function(){
		var formData = {
				mobile 			: $.trim($('#mobile').val()),
				loginPassword	: $.trim($('#pwd').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		if(validateResult.status){
			console.log(validateResult.msg+'ooo');
			formError.hide();
			$(".login-btn").addClass("kd");
			$(".login-btn").removeAttr('disabled');
		}else{
			$(".login-btn").removeClass("kd");
			$(".login-btn").attr('disabled','disabled');
			formError.hide();
			var id = '#'+validateResult.id;
			formError.show(id,validateResult.msg);
		}
	},
	mouseover : function(obj){
		$('input').removeClass('hover-input');
		$(obj).addClass('hover-input');
	},
	mouseout : function(){
		$('input').removeClass('hover-input');
	},
	// 提交表单
	submit : function(){
		var formData = {
				mobile 			: $.trim($('#mobile').val()),
				loginPassword	: $.trim($('#pwd').val()) == '' ? $.trim($('#pwd').val()) : md5($.trim($('#pwd').val())),
				loginSource 	: 1
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// 验证成功
		if(validateResult.status){
			// console.log(validateResult.msg);
			_apiUser.login(formData, function(res){
				var cookie = {
					accessId : res.content.accessId,
					accessKey : res.content.accessKey
				};
				_td.setAccess(cookie);
				window.location.href = _td.getUrlParam('redirect') || './index.html';
				//return false;
			}, function(errMsg){
				console.log(errMsg);
				formError.allShow(errMsg);
			});
		}
		// 验证失败
		else{
			// console.log(validateResult.msg+'err');
			// 错误提示
			formError.allShow(validateResult.msg);
		}

	},

	// 表单验证
	formValidate : function(formData){
		var result = {
			status  : false,
			id : false,
			msg     : ''
		};
		console.log(_td.validate(formData.mobile, 'mobile'));
		if(!_td.validate(formData.mobile, 'mobile')){
			result.msg = '手机号必须由11位纯数字组成';
			result.id = 'mobile';
			return result;
		}
		if(!_td.validate(formData.loginPassword, 'require')){
			// result.msg = '密码不能为空';
			// result.id = 'pwd';
			return result;
		}
		// 通过验证，返回正确提示
		result.status   = true;
		result.id   	= true;
		result.msg      = '验证通过';
		return result;
	}

};
// module.exports = login;

$(function(){
	loginPage.init();
	// $("#slider2").slider({
	// 	width: 342,
	// 	height: 40,
	// 	sliderBg: "#f2f2f2",
	// 	color: "#9e9e9e",
	// 	fontSize: 14,
	// 	bgColor: "#58bd0d",
	// 	textMsg: "请按住滑块，拖到最右边",
	// 	successMsg: "验证通过",
	// 	successColor: "#fff",
	// 	time: 400,
	// 	callback: function(result) {
	// 		results = result;
	// 		checkform();
	// 	}
	// });
});


// $(function() {
// 	_inp.focus("input");
// 	_inp.blur("input");
// 	_inp.mouseover("input");
// 	_inp.mouseleave("input");
// 	// 引用滑动验证
// 	var results;
// 	var res;
// 	$("#slider2").slider({
// 		width: 342,
// 		height: 40,
// 		sliderBg: "#f2f2f2",
// 		color: "#9e9e9e",
// 		fontSize: 14,
// 		bgColor: "#58bd0d",
// 		textMsg: "请按住滑块，拖到最右边",
// 		successMsg: "验证通过",
// 		successColor: "#fff",
// 		time: 400,
// 		callback: function(result) {
// 			results = result;
// 			checkform();
// 		}
// 	});
// 	// // 电话判断
// 	_regular.checkPhoneOnkey({
// 		elm: "phoneNum",
// 		cls: "wrong_mess",
// 		callback: function(result) {
// 			res = result;
// 		}
// 	});
// 	_regular.checkPhoneOnBlur({
// 		elm: "phoneNum",
// 		cls: "wrong_mess",
// 		callback: function(result) {
// 			res = result;
// 		}
// 	});
// 	$("#phoneNum").on("keyup", function() {
// 		checkform();
// 	});

// 	$("#phoneNum").on("blur", function() {
// 		checkform();
// 	});
// 	// 密码框效果
// 	$("#password").on("keyup", function() {
// 		checkform();
// 	});

// 	function checkform() {
// 		var password = $("#password").val();
// 		if (password != "" && res == true && results == true) {
// 			$(".login_btn").addClass("kd");
// 			$(".login_btn").on("mouseover", function() {
// 				$(this).addClass('color');
// 			});
// 			$(".login_btn").on("mouseleave", function() {
// 				$(this).removeClass('color');
// 			});
// 		} else {
// 			$(".login_btn").removeClass("kd");
// 			$(".login_btn").on("mouseover", function() {
// 				$(this).removeClass('color');
// 			});
// 		}
// 	}
// 	// 点击登录
// 	$(".login_btn").on("click", function() {
// 		if ($(this).hasClass("kd")) {
// 			var phoneNum = $(".phoneNum").val();
// 			var loginPassword = $(".password").val();
// 			loginPassword = md5(loginPassword);
// 			$.ajax({
// 				type: "POST",
// 				url: "http://72.127.2.140:8080/api/router/user/login",
// 				data: {
// 					mobile: phoneNum,
// 					loginPassword: loginPassword,
// 					loginSource: 1
// 				},
// 				beforeSend: function(xhr) {
// 					xhr.setRequestHeader("accessId", "accessId");
// 					xhr.setRequestHeader("accessKey", "accessKey");
// 					xhr.setRequestHeader("sign", "NO");
// 				},
// 				success: function(data) {
// 					console.log(data);
// 					if (data.success == true) {
// 						$(".password").siblings(".wrong_mess_r").remove();
// 						$(".password").removeClass("red");
// 					} else {
// 						var ts = "<p class='wrong_mess_r'>&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>密码错误，请重新输入</span></p>";
// 						if ($(".password").parent().find(".wrong_mess_r").length > 0) {
// 							return false;
// 						} else {
// 							$(".password").parent().append(ts);
// 						}
// 						$(".password").addClass("red");
// 					}
// 				},
// 				error: function(res) {}
// 			});
// 		} else {
// 			return false;
// 		}
// 	});
// 	// 错号清空
// 	del(".phoneNum", ".login_btn");
// 	del(".password", ".login_btn");
// 	function del(name, el) {
// 		$(name).on("focus", function() {
// 			if ($(name).val() == "") {
// 				$(this).siblings(".del").hide();
// 			} else {
// 				$(this).siblings(".del").show();
// 			}
// 		});
// 		$(name).on("blur", function() {
// 			setTimeout(function() {
// 				$(name).siblings(".del").hide();
// 			}, 300);
// 		});
// 		$(name).on("keyup", function() {
// 			if ($(this).val() == "") {
// 				$(this).siblings(".del").hide();
// 			} else {
// 				$(this).siblings(".del").show();
// 			}
// 		});
// 		$(".del").on("click", function() {
// 			$(this).siblings(name).val("");
// 			$(el).removeClass("kd");
// 			$(el).on("mouseover", function() {
// 				$(this).removeClass('color');
// 			});
// 		});
// 	}
// 	// 账号密码保存样式
// 	function stop() {
// 		$("input").addClass("jz");
// 		$("#phoneNum").attr("disabled", "disabled");
// 		$("#phoneNum").css("background-color", "#fffbf7");
// 		$("#password").attr("disabled", "disabled");
// 		$("#password").css("background-color", "#fffbf7");
// 	}
// });