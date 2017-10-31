require('page/common/uc-menu/index.js');
require("./uc_cash.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require("util/bankSelect/bankSelect.scss");
require('util/paging/page.scss');
require('util/paging/page.js');

var _td = require('util/td.js');
var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var md5 = require('util/md5.js');
var _cashApply = require('api/cash_apply-api.js');
var _cashlist = require('api/cashlist-api.js');
var _cash = require('api/cash-api.js');
var _checkBank = require('api/checkBank-api.js');
var cashLists = require('./uc_cash.string');


var result1;
var times;
var result2;
var cash = {
	init: function() {
		this.page();
		this.inputMutual();
		this.tabCut();
		this.moneyVerify();
		this.passVerify();
		this.check();
		this.cashButton();
		this.tsShow();
		this.bankInfo();
	},
	// input框交互样式
	inputMutual: function() {
		_inp.focus("input");
		_inp.blur("input");
		_inp.mouseover("input");
		_inp.mouseleave("input");
	},
	page: function() {
		_cashlist.cashlist(1, 10, function(res) {
			console.log(res);
			cashHtml = _td.renderHtml(cashLists, {
				list: res.content.list,
			});
			$('.cashlist').html(cashHtml);
			_cashlist.paging(2, 1, 10, function(e) {
				_cashlist.cashlist(e.current, 10, function(res) {
					cashHtml = _td.renderHtml(cashLists, {
						list: res.content.list,
					});
					$('.cashlist').html(cashHtml);
				});
			});
		});
	},
	bankInfo: function() {
		// _cash.cash(function(res) {
		// 	console.log(res);
		// });
		// _checkBank.checkBank(function(res){
		// 	console.log(res);
		// 	if(res.content==true){
		// 		return;
		// 	}else{
		// 		$(".content0").show();
		// 		$(".content").hide();
		// 	}
		// });
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
	// 输入金额验证
	moneyVerify: function() {
		var _this = this;
		_regular.checkCashMoney({
			elm: "money_input1",
			cls: "wrong_mess",
			callback: function(result) {
				result1 = result;
			}
		});
		$(".money_input1").on("blur", function() {
			_this.check();
		});
		times = $(".qs_time").is(":hidden");
	},
	// 密码验证
	passVerify: function() {
		var _this = this;
		$(".pass_input").on("keyup", function() {
			// if ($(this).val() != "") {
			// 	result2 = true;
			// } else {
			// 	result2 = false;
			// }
			_this.check();
		});
	},
	check: function() {
		var val=$(".pass_input").val();
		if(val!=""){
			result2 = true;
		}else{
			result2 = false;
		}
		if (result1 == true && times == true && result2 == true) {
			$(".item1 .btn").addClass("kd");
		} else {
			$(".item1 .btn").removeClass("kd");
		}
	},
	// 立即提现按钮点击
	cashButton: function() {
		$(".item1 .btn").on("click", function() {
			if ($(this).hasClass('kd')) {
				var cashMoney = $(".money_input1").val();
				var payPassword = $(".pass_input").val();
				payPassword = md5(payPassword);
				var data = {
					source: 0,
					cashMoney: cashMoney,
					payPassword: payPassword
				};
				_cashApply.cash(data, function(res) {
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
$(function() {
	cash.init();
});