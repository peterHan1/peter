require('page/common/uc-menu/index.js');
require("./uc_recharge.scss");
require("util/bankSelect/index.js");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
require('util/security/security.scss');

var _td = require('util/td.js');
var _yzm = require('util/security/security.js');
var _trade = require('api/trade-api.js');
var _hover = require('util/btnHover.js');


var headerData = {
	accessId: _td.getAccess('accessId'),
	accessKey: _td.getAccess('accessKey')
};

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
	allShow: function() {},
	allHide: function() {}

};
var recharge = {
	init: function() {
		this.bindEvent();
		this.btnHover();
		this.bankSelect();
		this.tabCut();
		this.load();
		this.tsShow();
		this.shortBtn();
		this.shortCut();
		this.sendSmsCodeAgain();
		this.checkSmsCode();
		this.closeLayer();
		this.rechargeStyle();
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
			formError.hide();
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
			money: $.trim($('#money1').val()),
			bankId: $('#btn1').attr('bankId'),
		};
		formData.money = formData.money.replace(/,/g, '');
		// 表单验证结果
		validateResult = this.formValidate(formData);
		// console.log(validateResult);
		if (validateResult.status) {
			// console.log(validateResult.msg + 'ooo');
			formError.hide();
			$("#btn1").addClass("kd");
			$("#btn1").removeAttr('disabled');
		} else {
			$("#btn1").removeClass("kd");
			$("#btn1").attr('disabled', 'disabled');
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
			money: $.trim($('#money1').val()),
			bankId: $('#btn1').attr('bankId'),
		};
		formData.money = formData.money.replace(/,/g, '');
		// 表单验证结果
		validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			var win = window.open();
			win.document.write("跳转中.....");
			_trade.rechargeOnline(headerData, formData, function(res) {
				console.log(res);
				layer.open({
					type: 1,
					title: '网银跳转提示',
					skin: 'success_box',
					area: ['560px', '350px'],
					content: $('#success_box')
				});
				 win.document.write(res.content);
			}, function(err) {
				layer.open({
					type: 1,
					title: '充值失败',
					skin: 'cz_fail',
					area: ['560px', '340px'],
					content: $('#cz_fail')
				});
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
		if (!recharge.moneyCheck(formData.money, 'min')) {
			result.msg = '本次充值金额范围：100元-5万元！';
			result.id = 'money1';
			result.status = false;
			return result;
		}
		if (!_td.validate(formData.bankId, 'require')) {
			return result;
		}
		// 通过验证，返回正确提示
		result.status = true;
		result.id = true;
		result.msg = '验证通过';
		return result;
	},
	moneyCheck: function(value, type) {
		var value = $.trim(value);
		if ('min' === type) {
			if (100 <= value && value <= 50000) {
				return true;
			} else {
				return false;
			}
		}
	},
	btnHover: function() {
		_hover.btnHover(".btn");
	},
	bankSelect: function() {
		$(document).on("click", ".bank_select ul li", function() {
			$(".bank_select ul li").removeClass("get");
			$(this).addClass("get");
			var bankId = $(this).find("i").attr("bank");
			$(".item1 .btn").attr("bankId", bankId);
			var val = $.trim($('#money1').val());
			val = val.replace(/,/g, '');
			if (val != "" && 100 <= val && val <= 50000) {
				$("#btn1").addClass("kd");
				$("#btn1").removeAttr('disabled');
			} else {
				$("#btn1").removeClass("kd");
				$("#btn1").attr('disabled', 'disabled');
			}
		});
	},
	tabCut: function() {
		$('.recharge_top ul li a').each(function() {
			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
				$(this).parent().addClass('on');
				$(this).parent().siblings('li').removeClass('on');
				var _index = $(this).parent().index() + 1;
				$(".recharge_window").eq(_index).show().siblings(".recharge_window").hide();
			}
		});
	},
	load: function() {
		_trade.rechargeInfo(headerData, function(res) {
			// console.log(res);
			// 用户开通存管信息
			$(".item0").hide();
			// 银行卡logo
			var bankId = res.content.bankId;
			$(".item2 .bank_logo").addClass(bankId);
			// 银行卡号
			var bankNum = res.content.account;
			bankNum = bankNum.substr(bankNum.length - 4);
			$(".card_num").find("em").html(bankNum);
			// 用户余额
			var balance = res.content.money;
			$(".number_show .money_number").html(balance);
			// 日充值最大金额
			var limitOneTime = res.content.limitOneTime;
			$(".item2 .money .czts b").html(limitOneTime);
			// 存管清算时间
			var cleanTime = res.content.cleanTime;
			if (cleanTime == true) {
				$(".qs_time").show();
				times = false;
				$(".item1 .btn").val("存管清算时间，不可充值");
				$(".item2 .btn").val("存管清算时间，不可充值");
			} else {
				$(".qs_time").hide();
				times = true;
				$(".item1 .btn").val("立即充值");
				$(".item2 .btn").val("立即充值");
			}
		}, function(err) {
			if (err.code == 141012) {
				$(".item0").show();
				$(".item1").hide();
				$(".item2").hide();
			}
		});
	},
	// 网银充值失去焦点改变样式
	rechargeStyle: function() {
		var _this = this;
		$(".money_input").on("blur", function() {
			var val = $(this).val();
			if (val == "") {
				return false;
			} else {
				val = _this.formatNum(val);
				$(this).val(val);
			}
		});
	},
	// 数字样式改变
	formatNum: function(str) {
		var newStr = "";
		var count = 0;
		if (str.indexOf(".") == -1) {
			for (var i = str.length - 1; i >= 0; i--) {
				if (count % 3 == 0 && count != 0) {
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr;
				}
				count++;
			}
			str = newStr + ".00";
		} else {
			for (var i = str.indexOf(".") - 1; i >= 0; i--) {
				if (count % 3 == 0 && count != 0) {
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr;
				}
				count++;
			}
			str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		}
		return str;
	},
	tsShow: function() {
		$(".bank_card .wen").on("mouseover", function() {
			$(".bank_card b").show();
		});
		$(".bank_card .wen").on("mouseleave", function() {
			$(".bank_card b").hide();
		});
	},
	// 快捷充值按钮变亮
	shortBtn: function() {
		$(".item2 .money_input2").on("blur", function() {
			var ts = "<p class='wrong_mess'>&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>本次充值金额范围：100元-5万元！</em></p>";
			var val = $.trim($(".money_input2").val());
			val = val.replace(/,/g, '');
			if (val != "" && val > 100 && val < 50000) {
				$(".item2 .btn").addClass("kd");
				$(this).siblings(".wrong_mess").remove();
				$(this).removeClass("red");
			} else {
				$(this).parent().append(ts);
				$(".item2 .btn").removeClass("kd");
				$(this).addClass("red");
			}
		});
	},
	// 快捷充值按钮
	shortCut: function() {
		var _this = this;
		$(".item2 .btn").on("click", function() {
			if ($(this).hasClass('kd')) {
				var money = $(".money_input2").val();
				money = money.replace(/,/g, '');
				_trade.sendSmsCode(headerData, money, function(res) {
					var phone = res.content.phone;
					orderNo = res.content.orderNo;
					$(".secity_box .phoneNum").html(phone);
					$(".cz_success .main_box .look span").html(money);
					_this.cutTime();
					$("#dy").attr("autofocus", "autofocus");
					layer.open({
						type: 1,
						title: '填写验证码',
						skin: 'secity_box',
						area: ['560px', '340px'],
						content: $('#secity_box'),
						cancel: function() {
							history.go(0);
						}
					});
				});
			}
		});
	},
	sendSmsCodeAgain: function() {
		// 验证码倒计时
		var num = 59;
		var flag;
		var timer;
		$(".count_time").on("click", function() {
			$(".count_time").hide();
			$(".djs").show();
			if (flag == false) {
				return false;
			} else {
				$(".count_num").text(59);
				num = $(".count_num").text();
				flag = false;
				timer = setInterval(function() {
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
	},
	cutTime: function() {
		var num = 59;
		timer = setInterval(function() {
			num--;
			$(".count_num").text(num);
			if (num <= 0) {
				clearInterval(timer);
				$(".count_time").show();
				$(".djs").hide();
			}
		}, 1000);
	},
	checkSmsCode: function() {
		_yzm.check("demo", "border");
		$(".lastnum").on("keyup", function() {
			var str = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
			var data = {
				orderNo: orderNo,
				smsCode: str
			};
			_trade.fastPay(headerData, data, function(res) {
				console.log(res);
				layer.closeAll();
				layer.open({
					type: 1,
					title: '充值成功',
					skin: 'cz_success',
					area: ['560px', '340px'],
					content: $('#cz_success'),
					cancel: function() {
						history.go(0);
					}
				});
			}, function(err) {
				layer.closeAll();
				layer.open({
					type: 1,
					title: '充值失败',
					skin: 'cz_fail',
					area: ['560px', '340px'],
					content: $('#cz_fail'),
					cancel: function() {
						history.go(0);
					}
				});
			});
		});
	},
	// 关闭弹窗
	closeLayer: function() {
		$(".know").on("click", function() {
			layer.closeAll();
			history.go(0);
		});
	}
};
$(function() {
	recharge.init();
});