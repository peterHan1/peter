require('page/common/uc-menu/index.js');
require("./uc_recharge.scss");
require("util/bankSelect/bankSelect.js");
require("util/bankSelect/bankSelect.scss");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/security/security.js');
require('util/security/security.scss');


var _inp = require('util/yz.js');
var _regular = require('util/regular.js');
var _yzm = require('util/security/security.js');
var _rechargeInfo = require("api/rechargeInfo-api.js");
var _checkBank = require('api/checkBank-api.js');
var _rechargeOnLine = require('api/recharge_online-api.js');

var result1;
var result2;
var flags;
var times;
var recharge = {
	init: function() {
		this.load();
		this.inputMutual();
		this.moneyCheck();
		this.bankSelect();
		this.tabCut();
		this.tsShow();
		this.buttonVerify();
		this.rechargeButton();
		this.shortCut();
		this.buttonHover();
		this.closeLayer();
	},
	load: function() {
		// _checkBank.checkBank(function(res){
		// console.log(res);
		// if(res.content==false){
		// 	$(".item0").show();
		// 	$(".item1").hide();
		// 	$(".item2").hide();
		// }else{
		// 	$(".item0").hide();
		// 	$(".item1").show();
		// }
		// });
	},
	// input框交互样式
	inputMutual: function() {
		_inp.focus("input");
		_inp.blur("input");
		_inp.mouseover("input");
		_inp.mouseleave("input");
	},
	// 充值金额验证
	moneyCheck: function() {
		_regular.checkMoney({
			elm: "money_input1",
			cls: "wrong_mess",
			callback: function(result) {
				result1 = result;
			}
		});
		_regular.checkMoneyFast({
			elm: "money_input2",
			cls: "wrong_mess",
			callback: function(result) {
				result2 = result;
			}
		});
	},
	// 银行选择
	bankSelect: function() {
		times = $(".qs_time").is(":hidden");
		$(document).on("click", ".bank_select ul li", function() {
			$(".bank_select ul li").removeClass("get");
			$(this).addClass("get");
			var bankId = $(this).find("i").attr("bank");
			$(".item1 .btn").attr("bankId", bankId);
			flags = true;
			if (result1 == true && flags == true && times == true) {
				$(".item1 .btn").addClass("kd");
			} else {
				$(".item1 .btn").removeClass("kd");
			}
		});
	},
	// tab切换
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
	tsShow: function() {
		$(".bank_card .wen").on("mouseover", function() {
			$(".bank_card b").show();
		});
		$(".bank_card .wen").on("mouseleave", function() {
			$(".bank_card b").hide();
		});
	},
	// 失去焦点验证按钮是否变亮
	buttonVerify: function() {
		$(".money_input1").on("blur", function() {
			if (result1 == true && flags == true && times == true) {
				$(".item1 .btn").addClass("kd");
			} else {
				$(".item1 .btn").removeClass("kd");
			}
		});
		$(".money_input2").on("blur", function() {
			console.log(result2);
			console.log(times);
			if (result2 == true && times == true) {
				$(".item2 .btn").addClass("kd");
			} else {
				$(".item2 .btn").removeClass("kd");
			}
		});
	},
	// 充值按钮
	rechargeButton: function() {
		$(".item1 .btn").on("click", function() {
			if ($(this).hasClass('kd')) {
				var money = $(".money_input1").val();
				var bankId = $(this).attr("bankId");
				var data = {
					money: money,
					bankId: bankId
				};
				_rechargeOnLine.recharge(data, function(res) {
					console.log(res);
					if (res.code == 100000) {
						layer.open({
							type: 1,
							title: '网银跳转提示',
							skin: 'success_box',
							area: ['561px', '340px'],
							content: $('#success_box'),
							cancel: function() {
								history.go(0);
							}
						});
					}else{
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
					}
				});
			}
		});
	},
	// 快捷支付按钮
	shortCut: function() {
		$(".item2 .btn").on("click", function() {
			if ($(this).hasClass('kd')) {
				CutTime();
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
				_yzm.check("demo", "border");
				var data = "123456";
				var status = 1;
				$(".lastnum").on("keyup", function() {
					var str = '';
					str = $("#demo input").eq(0).val() + $("#demo input").eq(1).val() + $("#demo input").eq(2).val() + $("#demo input").eq(3).val() + $("#demo input").eq(4).val() + $("#demo input").eq(5).val();
					console.log(str);
					if (str == data && status == 1) {
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
					} else if (str == data && status == 2) {
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
					} else if (str != data) {
						$("#demo input").val("");
						$(".wrong_ts").show();
						_yzm.check("demo", "border");
						$("#demo input").eq(5).removeClass("border");
						$("#demo input").eq(0).focus();
						$("#demo input").eq(0).addClass("border");
					}
				});

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

				function CutTime() {
					timer = setInterval(function() {
						num--;
						$(".count_num").text(num);
						if (num <= 0) {
							clearInterval(timer);
							$(".count_time").show();
							$(".djs").hide();
						}
					}, 1000);
				}
			} else {
				return false;
			}
		});
	},
	// 充值按钮Hover效果
	buttonHover: function() {
		$(".item1 .btn").on("mouseover", function() {
			if ($(this).hasClass('kd')) {
				$(this).addClass("color");
			} else {
				$(this).removeClass("color");
			}
		});
		$(".item1 .btn").on("mouseleave", function() {
			$(this).removeClass("color");
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