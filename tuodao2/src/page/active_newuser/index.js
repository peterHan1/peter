require("util/bank/index.js");
require("./active_newuser.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/nav2/index.scss');


var _td = require('util/td.js');
var _del = require('util/delButton.js');
var _user = require('api/user-api.js');
var md5 = require('util/md5.js');
var _hover = require('util/btnHover.js');
var _tips = require('util/tips/index.js');

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

var headerData = {
		'accessId' : unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	};
var DepositInfoNew = {
	init: function() {
		this.bindEvent();
		this.load();
		this.btnHover();
		this.inputDel();
		this.passwordCut();
		this.tsShow();
		this.bankShow();
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
				reservationMobile: $.trim($('#mobile').val()),
				payPassword: $.trim($('#pwd').val()),
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// console.log(validateResult);
		if (validateResult.status) {
			// console.log(validateResult.msg + 'ooo');
			formError.hide();
			$(".btn").addClass("kd");
			$(".btn").removeAttr('disabled');
		} else {
			$(".btn").removeClass("kd");
			$(".btn").attr('disabled', 'disabled');
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
				reservationMobile: $.trim($('#mobile').val()),
				payPassword: $.trim($('#pwd').val()),
			},
		// 表单验证结果
		validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			formData.payPassword = md5(formData.payPassword);
			_user.openDeposit(headerData, formData, function(res) {
				if(res.content.ifSuccess==true){
					$(".success_box").show();
					$(".main").hide();
					_this.countTime();
				}else{
					$('.js_box').html(res.content.errorInfo);
					formError.allShow();
				}
			}, function(err) {
				if (err.code == 170020) {
					$(".wait_box").show();
					$(".main").hide();
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
	formValidate: function(formData) {
		var result = {
			status: false,
			id: false,
			msg: ''
		};
		if (!_td.validate(formData.realName, 'require')) {
			return result;
		}
		if (!_td.validate(formData.idCard, 'require')) {
			return result;
		}

		if (!_td.validate(formData.bankCode, 'require')) {
			return result;
		}
		if (!_td.validate(formData.bankNum, 'bankCard')) {
			result.msg = '请输入正确的银行卡号！';
			result.id = 'bankCard';
			return result;
		}
		if (!_td.validate(formData.reservationMobile, 'mobile')) {
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
	load: function() {
		_user.getStockUserDeposit(headerData, function(res) {
			// 存管存量用户状态
			if (res.content.idCard != null) {
				$("#user").val(res.content.realName);
				$("#user").attr('disabled', 'disabled');
				$("#card").val(res.content.idCard);
				$("#card").attr('disabled', 'disabled');
				$("#Bank_sel").hide();
				$("#Bank_sel_hid .xx i").addClass(res.content.bankCode);
				$("#Bank_sel_hid .xx i").attr("bank", res.content.bankCode);
				$("#Bank_sel_hid .xx em").html(res.content.bankName);
				$("#Bank_sel_hid").removeClass('dis_none');
				$("#bankCard").val(res.content.bankNum);
				$("#bankCard").attr('disabled', 'disabled');
				$("#Bank_sel_hid").addClass("dis");
			} else {
				return;
			}
		}, function(err) {
			console.log(err);
		});
	},
	btnHover: function() {
		_hover.btnHover(".btn");
	},
	// input框输入时删除文本按钮
	inputDel: function() {
		_del.inptxtDel(".phoneNum", "btn");
		_del.inptxtDel(".pay", ".btn");
		_del.inptxtDel(".user", ".btn");
		_del.inptxtDel(".card", ".btn");
		_del.inptxtDel(".card_num", ".btn");
	},
	// 点击切换密码明码密码
	passwordCut: function() {
		$(".paynum .yan_kai").on("click", function() {
			$(this).hide();
			$(".yan").show();
			$(".paynum input").attr("type", "password");
		});
		$(".paynum .yan").on("click", function() {
			$(this).hide();
			$(".yan_kai").show();
			$(".paynum input").attr("type", "text");
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
	},
	bankShow: function() {
		// 银行卡输入中下方显示大数字
		$(".bank_num input").on("blur", function() {
			$(".big_font").hide();
		});
		$(".bank_num input").on("keyup", function() {
			var data = $(this).val();
			$(".big_font").show();
			$(".big_font").text(data);
		});
	}
};
$(function() {
	DepositInfoNew.init();
});