require('page/common/uc-menu/index.js');
require("./uc_cash.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
require("util/bankSelect/bankSelect.scss");
require("util/placeholder.js");

var _td = require('util/td.js');
var md5 = require('util/md5.js');
var _trade = require('api/trade-api.js');
var cashLists = require('./uc_cash.string');
var _page = require('util/paging/index.js');
var _hover = require('util/btnHover.js');

var headerData = {
		'accessId' :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
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
	allShow: function(err) {
		$('.wrongs').html('<i class="iconfont">&#xe671;</i> ' + err + '');
		$(".wrongs").show();
	},
	allHide: function() {
		$('.wrongs').html('');
		$(".wrongs").hide();
	}

};
var number;
var cash = {
	init: function() {
		this.bindEvent();
		this.btnHover();
		this.castList();
		this.cashTime();
		this.load();
		this.tabCut();
		this.cashButton();
		this.tsShow();
		this.cashFee();
	},
	bindEvent: function() {
		var _this = this;
		$('input, textarea').placeholder();
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
			cashMoney: $.trim($('#cashMoney').val()),
			payPassword: $.trim($('#pwd').val()),
			source: 0
		};
		formData.cashMoney = formData.cashMoney.replace(/,/g, '');
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
			cashMoney: $.trim($('#cashMoney').val()),
			payPassword: $.trim($('#pwd').val()) == '' ? $.trim($('#pwd').val()) : md5($.trim($('#pwd').val())),
			source: 0
		};
		// 表单验证结果
		formData.cashMoney = formData.cashMoney.replace(/,/g, '');
		validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			_trade.cashApply(headerData, formData, function(res) {
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
			}, function(err) {
				console.log(err);
				formError.allShow(err.msg);
			});
		}
		// 验证失败
		else {
			// 错误提示
			formError.allShow(err.msg);
		}

	},
	// 表单验证
	formValidate: function(formData) {
		var result = {
			status: false,
			id: false,
			msg: ''
		};
		if (!cash.moneyCheck(formData.cashMoney, 'min')) {
			result.msg = '单笔提现范围：100元-1000万元！';
			result.id = 'cashMoney';
			result.status = false;
			return result;
		}
		if (!cash.moneyCheck(formData.cashMoney, 'max')) {
			result.msg = '您输入的金额大于可提现余额！';
			result.id = 'cashMoney';
			result.status = false;
			return result;
		}
		if (!_td.validate(formData.payPassword, 'require')) {
			return result;
		}

		// 通过验证，返回正确提示
		result.status = true;
		result.id = true;
		result.msg = '验证通过';
		return result;
	},
	btnHover: function() {
		_hover.btnHover(".btn");
	},
	castList: function() {
		var _this = this;
		_trade.cashList(headerData, 1, 10, function(res) {
			if (res.content.list.length == 0) {
				$(".no_data").show();
			}
			for (var i = 0; i <= res.content.list.length - 1; i++) {
				var status = _this.cashStatus(res.content.list[i].status);
				res.content.list[i].status = status;
			}
			cashHtml = _td.renderHtml(cashLists, {
				list: res.content.list,
			});
			$(".cashlist").html(cashHtml);
			_this.addColor();
			_page.paging('pageList', res.content.total, 10, function(e) {
				_trade.cashList(headerData, e.current, 10, function(res) {
					for (var i = 0; i <= res.content.list.length - 1; i++) {
						var status = _this.cashStatus(res.content.list[i].status);
						res.content.list[i].status = status;
					}
					cashHtml = _td.renderHtml(cashLists, {
						list: res.content.list,
					});
					$('.cashlist').html(cashHtml);
					_this.addColor();
				});
			});
		});
	},
	cashStatus: function(status) {
		switch (status) {
			case 0:
				return "提现申请中";
			case 2:
				return "提现成功";
			case 3:
				return "提现失败";
			default:
				return "";
		}
	},
	load: function() {
		_trade.cash(headerData, function(res) {
			// 账户余额
			var balanceValue = res.content.balanceValue;
			number = balanceValue;
			$(".number_show .money_number").html(number);
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
	cashTime: function() {
		// 提现到账时间
		var myDate = new Date();
		myDate = myDate.getHours();
		if (0 <= myDate && myDate <= 9) {
			$(".btn").val("当日9点到账");
			$(".cash_success .dz_time i").html("当日9点到账");
		} else if (9 < myDate && myDate <= 21) {
			$(".btn").val("实时到账");
			$(".cash_success .dz_time i").html("实时到账");
		} else {
			$(".btn").val("次日9点到账");
			$(".cash_success .dz_time i").html("次日9点到账");
		}
	},
	addColor: function() {
		$(".cashlist tr").each(function() {
			$(this).children("td").each(function() {
				var font = $(this).text();
				if (font == "提现申请中") {
					$(this).attr("class", "sh_wait");
				} else if (font == "提现成功") {
					$(this).attr("class", "sh_pass");
				} else if (font == "提现失败") {
					$(this).attr("class", "sh_fail");
				}
			});
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
	moneyCheck: function(value, type) {
		var value = $.trim(value);
		if ('min' === type) {
			if (100 <= value && value <= 10000000) {
				return true;
			} else {
				return false;
			}
		}
		if ('max' === type) {
			return value < number;
		}
	},
	cashFee: function() {
		var _this = this;
		$(".money_input1").on("blur", function() {
			var cashMoney = $(this).val();
			if (cashMoney == "") {
				return false;
			} else {
				var str = _this.formatNum(cashMoney);
				$(this).val(str);
				if (cashMoney != "") {
					_trade.cashFee(headerData, cashMoney, function(res) {
						var fee = res.content.fee;
						$(".sj_money .sxf b").html(fee);
						$(".cash_success .cash_count .cashfee").html(fee);
						var realAccount = res.content.realAccount;
						$(".sj_money .sjdz b").html(realAccount);
						$(".cash_success .cash_count .cashnum").html(realAccount);
					}, function(err) {
						console.log(err);
					});
				} else {
					return;
				}
			}

		});
	},
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
	// 关闭弹窗按钮
	cashButton: function() {
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
$(function() {
	cash.init();
});