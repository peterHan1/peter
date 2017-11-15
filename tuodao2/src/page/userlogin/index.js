require('page/common/nav2/index.js');
require('./userlogin.scss');
require('util/slider/index.js');

var _td = require('util/td.js');
var md5 = require('util/md5.js');
var _apiUser = require('api/user-api.js');
var _del = require('util/delButton.js');
var _hover = require('util/btnHover.js');

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
		$('p').remove();
	},
	allShow: function(errMsg) {
		$('.all-errinfo').html('<i class="iconfont">&#xe671;</i>' + errMsg + '，请重新输入');
	},
	allHide: function() {
		$('.all-errinfo').html('');
	}

};

var slider;
var result = {
	status: false,
	id: false,
	msg: ''
};
// 登录页逻辑部分
var loginPage = {
	// 初始化
	init: function() {
		this.bindEvent();
		this.slider();
		this.inputDel();
		this.btnHover();
	},
	bindEvent: function() {
		var _this = this;
		// 获得焦点
		$('form div input').focus(function() {
			_this.focus(this);
		});
		// 失去焦点
		$('form div input').blur(function() {
			_this.blur();
		});
		$('form div input').keyup(function() {
			if ($('#mobile').val().length >= 11) {
				_this.blur();
			} else {
				// if ($('#mobile').val().length > 0) {
				// 	_this.blur();
				// }
				formError.hide();
			}
		});
		$('form div input').mouseover(function() {
			_this.mouseover(this);
		});
		$('form div input').mouseout(function() {
			_this.mouseover();
		});
		// 点击登录
		$('form').submit(function() {
			_this.submit();
			return false;
		});


	},
	//
	focus: function(obj) {
		$('.all-errinfo').html('');
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$(obj).addClass('focus-input');
	},
	blur: function() {
		var formData = {
				mobile: $.trim($('#mobile').val()),
				loginPassword: $.trim($('#pwd').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
			console.log(validateResult);
		if (validateResult.status && slider == true) {
			// console.log(validateResult.msg + 'ooo');
			formError.hide();
			$(".login-btn").addClass("kd");
			$(".login-btn").removeAttr('disabled');
		} else {
			$(".login-btn").removeClass("kd");
			$(".login-btn").attr('disabled', 'disabled');
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
	// 提交表单
	submit: function() {
		var formData = {
				mobile: $.trim($('#mobile').val()),
				loginPassword: $.trim($('#pwd').val()) == '' ? $.trim($('#pwd').val()) : md5($.trim($('#pwd').val())),
				loginSource: 1
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			// console.log(validateResult.msg);
			_apiUser.login(formData, function(res) {
				var cookie = {
					accessId: res.content.accessId,
					accessKey: res.content.accessKey
				};
				_td.setAccess(cookie);
				window.location.href = _td.getUrlParam('redirect') || './index.html';
				// return false;
			}, function(err) {
				// console.log(errMsg);
				formError.allShow(err.msg);
			});
		}
		// 验证失败
		else {
			// console.log(validateResult.msg+'err');
			// 错误提示
			formError.allShow(validateResult.msg);
		}

	},
	btnHover: function() {
		_hover.btnHover(".login-btn");
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
	// input框输入时删除文本按钮
	inputDel: function() {
		_del.inptxtDel(".user_name .mobile", ".login-btn");
		_del.inptxtDel(".pwd", ".login-btn");
	},
	// 表单验证
	formValidate: function(formData) {
		if (!_td.validate(formData.mobile, 'mobile')) {
			console.log(111111);
			result.msg = '手机号必须由11位纯数字组成';
			result.id = 'mobile';
			result.status = false;
			return result;
		} else {
			_apiUser.checkPhone(formData.mobile, function(res) {
				if (res.content == false) {
					result.msg = '该手机号尚未注册拓道金服！';
					result.id = 'mobile';
					result.status = false;
				} else {
					if (!_td.validate(formData.loginPassword, 'require')) {
						return result;
					}
					// 通过验证，返回正确提示
					result.status = true;
					result.id = true;
					result.msg = '验证通过';
					return result;
				}
			});
		}
		return result;
	}
};


$(function() {
	loginPage.init();
});