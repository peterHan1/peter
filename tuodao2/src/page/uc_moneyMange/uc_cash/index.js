require('page/common/uc-menu/index.js');
require("./uc_cash.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
require("util/bankSelect/bankSelect.scss");

var _td = require('util/td.js');
var md5 = require('util/md5.js');
var _trade = require('api/trade-api.js');
var cashLists = require('./uc_cash.string');
var _page = require('util/paging/index.js');

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
	allShow: function() {
		$('.wrongs').html('<i class="iconfont">&#xe671;</i> 密码错误，请重新输入！');
		$(".wrongs").show();
	},
	allHide: function() {
		$('.wrongs').html('');
		$(".wrongs").hide();
	}

};

var cash = {
	init: function() {
		this.bindEvent();
		this.load();
		this.tabCut();
		this.moneyCheck();
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
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// console.log(validateResult);
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
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {}
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

		// 通过验证，返回正确提示
		result.status = true;
		result.id = true;
		result.msg = '验证通过';
		return result;
	},
	load: function() {
		_trade.cash(headerData, function(res) {
			// 账户余额
			var balanceValue = res.content.balanceValue;
			$(".number_show .money_number").html(balanceValue);
			// 银行卡号
			var bankNum = res.content.bankNum;
			bankNum = bankNum.substr(bankNum.length - 4);
			$(".card_num").find("em").html(bankNum);
			// 提现次数
			var cashNum = res.content.cashNum;
			$(".tx_times").find("span").html(cashNum);
			// 银行logo
			var bankCode = res.content.bankCode;
			$(".content .bank_logo").addClass(bankCode);
			// 存管清算时间
			var clearTime = res.content.clearTime;
			if (clearTime == true) {
				$(".qs_time").show();
				times = false;
				$(".btn").val("存管清算时间，不可提现");
			} else {
				$(".qs_time").hide();
				times = true;
				// 提现到账时间
				var myDate = new Date();
				myDate = myDate.getHours();
				if (0 <= myDate <= 9) {
					$(".btn").val("当日9点到账");
					$(".cash_success .dz_time i").html("当日9点到账");
				} else if (9 < myDate <= 21) {
					$(".btn").val("实时到账");
					$(".cash_success .dz_time i").html("实时到账");
				} else {
					$(".btn").val("次日9点到账");
					$(".cash_success .dz_time i").html("次日9点到账");
				}
			}
			// 存管开通状态
			if (res.content.status == 0) {
				$(".content0").show();
				$(".content").hide();
			} else {
				return;
			}
		});
	},
	// tab栏切换
	tabCut: function() {
		$('.cash_top ul li a').each(function() {
			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
				$(this).parent().addClass('on');
				$(this).parent().siblings('li').removeClass('on');
				var _index = $(this).parent().index();
				$(".cash_window").eq(_index).show().siblings(".cash_window").hide();
			}
		});
	},
	moneyCheck: function() {},
	// 立即提现按钮点击
	cashButton: function() {
		$(".item1 .btn").on("click", function() {
			if ($(this).hasClass('kd')) {
				var cashMoney = $(".money_input1").val();
				$(".cash_success .cash_count .cashnum").html(cashMoney);
				var payPassword = $(".pass_input").val();
				payPassword = md5(payPassword);
				var data = {
					source: 0,
					cashMoney: cashMoney,
					payPassword: payPassword
				};
				_trade.cashApply(headerData, data, function(res) {
					if (res.code == 100000) {
						$(".wrongs").hide();
						layer.open({
							type: 1,
							title: '提现成功',
							skin: 'cash_success',
							area: ['560px', '340px'],
							content: $('#cash_success'),
							cancel: function() {
								history.go(0);
							}
						});
					} else {
						$(".wrongs").show();
					}
				});
			};
		});
		// 关闭弹窗
		$(".know").on("click", function() {
			layer.closeAll();
			history.go(0);
		});
	},
	tsShow: function() {
		$(".bank_card .wen").on("mouseover", function() {
			$(".bank_card b").show();
		});
		$(".bank_card .wen").on("mouseleave", function() {
			$(".bank_card b").hide();
		});
		$(".zhye .wen").on("mouseover", function() {
			$(".zhye b").show();
		});
		$(".zhye .wen").on("mouseleave", function() {
			$(".zhye b").hide();
		});
	}
};
// var result1;
// var times;
// var result2;
// var cash = {
// 	init: function() {
// 		this.page();
// 		this.tabCut();
// 		this.moneyVerify();
// 		this.passVerify();
// 		this.check();
// 		this.cashButton();
// 		this.tsShow();
// 		this.bankInfo();
// 	},
// 	page: function() {
// 		_trade.cashList(headerData, 1, 10, function(res) {
// 			// console.log(res);
// 			if (res.content.list.length == 0) {
// 				$(".no_data").show();
// 			}
// 			cashHtml = _td.renderHtml(cashLists, {
// 				list: res.content.list,
// 			});
// 			$('.cashlist').html(cashHtml);
// 			_page.paging(res.content.pages, res.content.pageNum, res.content.pageSize, function(e) {
// 				_trade.cashList(e.current, 10, function(res) {
// 					cashHtml = _td.renderHtml(cashLists, {
// 						list: res.content.list,
// 					});
// 					$('.cashlist').html(cashHtml);
// 				});
// 			});
// 		});
// 	},
// 	// 绑卡信息
// 	bankInfo: function() {
// 		_trade.cash(headerData, function(res) {
// 			// 账户余额
// 			var balanceValue = res.content.balanceValue;
// 			$(".number_show .money_number").html(balanceValue);
// 			// 银行卡号
// 			var bankNum = res.content.bankNum;
// 			bankNum = bankNum.substr(bankNum.length - 4);
// 			$(".card_num").find("em").html(bankNum);
// 			// 提现次数
// 			var cashNum = res.content.cashNum;
// 			$(".tx_times").find("span").html(cashNum);
// 			// 银行logo
// 			var bankCode = res.content.bankCode;
// 			$(".content .bank_logo").addClass(bankCode);
// 			// 存管清算时间
// 			var clearTime = res.content.clearTime;
// 			if (clearTime == true) {
// 				$(".qs_time").show();
// 				times = false;
// 				$(".btn").val("存管清算时间，不可提现");
// 			} else {
// 				$(".qs_time").hide();
// 				times = true;
// 				// 提现到账时间
// 				var myDate = new Date();
// 				myDate = myDate.getHours();
// 				if (0 <= myDate <= 9) {
// 					$(".btn").val("当日9点到账");
// 					$(".cash_success .dz_time i").html("当日9点到账");
// 				} else if (9 < myDate <= 21) {
// 					$(".btn").val("实时到账");
// 					$(".cash_success .dz_time i").html("实时到账");
// 				} else {
// 					$(".btn").val("次日9点到账");
// 					$(".cash_success .dz_time i").html("次日9点到账");
// 				}
// 			}
// 			// 存管开通状态
// 			if (res.content.status == 0) {
// 				$(".content0").show();
// 				$(".content").hide();
// 			} else {
// 				return;
// 			}
// 		});
// 	},
// 	// tab栏切换
// 	tabCut: function() {
// 		$('.cash_top ul li a').each(function() {
// 			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
// 				$(this).parent().addClass('on');
// 				$(this).parent().siblings('li').removeClass('on');
// 				var _index = $(this).parent().index();
// 				$(".cash_window").eq(_index).show().siblings(".cash_window").hide();
// 			}
// 		});
// 	},
// 	// 输入金额验证
// 	moneyVerify: function() {
// 		var _this = this;
// 		_regular.checkCashMoney({
// 			elm: "money_input1",
// 			cls: "wrong_mess",
// 			callback: function(result) {
// 				result1 = result;
// 			}
// 		});
// 		$(".money_input1").on("blur", function() {
// 			var cashMoney = $(this).val();
// 			if (cashMoney != "") {
// 				_trade.cashFee(headerData, cashMoney, function(res) {
// 					var fee = res.content.fee;
// 					$(".sj_money .sxf b").html(fee);
// 					$(".cash_success .cash_count .cashfee").html(fee);
// 					var realAccount = res.content.realAccount;
// 					$(".sj_money .sjdz b").html(realAccount);
// 				});
// 				_this.check();
// 			} else {
// 				return;
// 			}

// 		});
// 	},
// 	// 密码验证
// 	passVerify: function() {
// 		var _this = this;
// 		$(".pass_input").on("keyup", function() {
// 			_this.check();
// 		});
// 	},
// 	check: function() {
// 		var val = $(".pass_input").val();
// 		if (val != "") {
// 			result2 = true;
// 		} else {
// 			result2 = false;
// 		}
// 		if (result1 == true && times == true && result2 == true) {
// 			$(".item1 .btn").addClass("kd");
// 		} else {
// 			$(".item1 .btn").removeClass("kd");
// 		}
// 	},
// 	// 立即提现按钮点击
// 	cashButton: function() {
// 		$(".item1 .btn").on("click", function() {
// 			if ($(this).hasClass('kd')) {
// 				var cashMoney = $(".money_input1").val();
// 				$(".cash_success .cash_count .cashnum").html(cashMoney);
// 				var payPassword = $(".pass_input").val();
// 				payPassword = md5(payPassword);
// 				var data = {
// 					source: 0,
// 					cashMoney: cashMoney,
// 					payPassword: payPassword
// 				};
// 				_trade.cashApply(headerData, data, function(res) {
// 					if (res.code == 100000) {
// 						$(".wrongs").hide();
// 						layer.open({
// 							type: 1,
// 							title: '提现成功',
// 							skin: 'cash_success',
// 							area: ['560px', '340px'],
// 							content: $('#cash_success'),
// 							cancel: function() {
// 								history.go(0);
// 							}
// 						});
// 					} else {
// 						$(".wrongs").show();
// 					}
// 				});
// 			};
// 		});
// 		// 关闭弹窗
// 		$(".know").on("click", function() {
// 			layer.closeAll();
// 			history.go(0);
// 		});
// 	},
// 	tsShow: function() {
// 		$(".bank_card .wen").on("mouseover", function() {
// 			$(".bank_card b").show();
// 		});
// 		$(".bank_card .wen").on("mouseleave", function() {
// 			$(".bank_card b").hide();
// 		});
// 		$(".zhye .wen").on("mouseover", function() {
// 			$(".zhye b").show();
// 		});
// 		$(".zhye .wen").on("mouseleave", function() {
// 			$(".zhye b").hide();
// 		});
// 	}
// };
$(function() {
	cash.init();
});