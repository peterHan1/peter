require("util/bank/index.js");
require("../active_newuser/active_newuser.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/nav2/index.scss');


var _td = require('util/td.js');
var _del = require('util/delButton.js');
var _user = require('api/user-api.js');
var md5 = require('util/md5.js');
var _hover = require('util/btnHover.js');

// 表单里的错误提示
var formError = {
	show: function(id, errMsg) {
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<b>' + errMsg + '</b></p>';
		if ($(id).parent().find('p.form-error-info').length <= 0) {
			return $(id).parent().append(el);
		}
	},
	hide: function() {
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$('p.form-error-info').remove();
	},
	allShow: function() {
		$('.js_box').html('<i class="iconfont">&#xe671;</i> 您输入的信息有误，请重新输入！');
	},
	allHide: function() {
		$('.js_box').html('');
	}

};

var DepositInfoNew = {
	init: function() {
		this.bindEvent();
		this.inputDel();
		this.passwordCut();
		this.tsShow();
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
				if ($('#mobile').val().length > 0) {
					_this.blur();
				}
				formError.hide();
			}
		});
		$('form div input').mouseover(function() {
			_this.mouseover(this);
		});
		$('form div input').mouseout(function() {
			_this.mouseover();
		});
		// 点击激活
		$('form').submit(function() {
			_this.submit();
			return false;
		});

	},
	focus: function(obj) {
		$('.js_box').html('');
		$('input').removeClass('focus-input');
		$('input').removeClass('err-input');
		$(obj).addClass('focus-input');
	},
	blur: function() {
		var formData = {
				realName: $.trim($('.user').val()),
				idCard: $.trim($('.card').val()),
				bankCode: $('#Bank_sel_hid .xx i').attr('bank'),
				bankNum: $('.card_num').val().replace(/\s+/g, ""),
				mobile: $.trim($('#mobile').val()),
				payPassword: $.trim($('#pwd').val()) == '' ? $.trim($('#pwd').val()) : md5($.trim($('#pwd').val())),
			},
			// 表单验证结果
			validateResult = DepositInfoNew.formValidate(formData);
		if (validateResult.status) {
			// console.log(validateResult.msg + 'ooo');
			formError.hide();
			$(".btn").addClass("kd");
			// $(".btn").removeAttr('disabled');
		} else {
			$(".btn").removeClass("kd");
			// $(".btn").attr('disabled', 'disabled');
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
		var _this = this;
		var formData = {
				realName: $.trim($('.user').val()),
				idCard: $.trim($('.card').val()),
				bankCode: $('#Bank_sel_hid .xx i').attr('bank'),
				bankNum: $('.card_num').val().replace(/\s+/g, ""),
				mobile: $.trim($('#mobile').val()),
				payPassword: $.trim($('#pwd').val()) == '' ? $.trim($('#pwd').val()) : md5($.trim($('#pwd').val())),
			},
			headerData = {
				accessId: _td.getAccess('accessId'),
				accessKey: _td.getAccess('accessKey')
			};
		// 表单验证结果
		validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			_user.openDeposit(headerData, formData, function(res) {
				$(".success_box").show();
				$(".main").hide();
				_this.countTime();
			}, function(err) {
				// console.log(err);
				if (err.code == 170020) {
					$(".wait_box").show();
					$(".main").hide();
				} else {
					$(".js_box").show();
					return false;
				}
			});
		}
		// 验证失败
		else {
			// 错误提示
			formError.allShow();
		}

	},
	// 表单验证
	formValidate: function(formData, form) {
		var result = {
			status: false,
			id: false,
			msg: ''
		};

		if (!_td.validate(formData.mobile, 'mobile')) {
			result.msg = '手机号必须由11位纯数字组成';
			result.id = 'mobile';
			return result;
		}
		if (!_td.validate(formData.payPassword, 'minLength')) {
			result.msg = '支付密码必须是6位数字！';
			result.id = 'pwd';
			return result;
		}

		// 通过验证，返回正确提示
		result.status = true;
		result.id = true;
		result.msg = '验证通过';
		return result;
	},
	// input框输入时删除文本按钮
	inputDel: function() {
		_del.inptxtDel(".phoneNum", "btn");
		_del.inptxtDel(".pay", ".btn");
	},
	// 点击切换密码明码密码
	passwordCut: function() {
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
	},
	// 提示文本显示隐藏
	tsShow: function() {
		$(".bank_all #wen").on("mouseover", function() {
			$(".bank_all .tips").show();
		});

		$(".bank_all #wen").on("mouseleave", function() {
			$(".bank_all .tips").hide();
		});
	},
	// 倒计时
	countTime: function() {
		var num = $(".success_box .mid span i").text();
		var timer = setInterval(function() {
			num--;
			$(".success_box .mid span i").text(num);
			if (num <= 0) {
				$(".success_box .mid span i").text(0);
				history.go(-1);
			}
		}, 1000);
	}
};
$(function() {
	DepositInfoNew.init();
});