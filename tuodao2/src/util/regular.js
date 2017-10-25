var _regular = {
	// keyup的时候 验证手机号码格式以及唯一性
	checkPhoneOnkey: function(data) {
		this.callback = {
			callback: function() {}
		};
		var _this = this;
		var status;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>手机号必须由11位纯数字组成</span></p>";
		$("." + data.elm).on("keyup", function() {
			var val = $("." + data.elm).val();
			if (val.length >= 11) {
				if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
					$("." + data.elm).parent().append(ts);
					$("." + data.elm).addClass("red");
					status = false;
				} else {
					$("." + data.elm).siblings('.' + data.cls).remove();
					$("." + data.elm).removeClass("red");
					status = _this.checkPhoneOnly(data.elm, data.cls);
					// console.log(status);
				}
			}
			data.callback(status);
		});
	},
	// blur的时候 验证手机号码格式以及唯一性
	checkPhoneOnBlur: function(data) {
		this.callback = {
			callback: function() {}
		};
		var _this = this;
		var status;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>手机号必须由11位纯数字组成</span></p>";
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
				$("." + data.elm).parent().append(ts);

				$("." + data.elm).addClass("red");
				status = false;
			} else {
				$("." + data.elm).siblings('.' + data.cls).remove();
				status = _this.checkPhoneOnly(data.elm, data.cls);
				// console.log(status);
			}
			data.callback(status);
		});
	},
	// 验证手机号码唯一性
	checkPhoneOnly: function(elm, cls) {
		var ts = "<p class=" + cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>该手机号尚未注册拓道金服，请先注册！</span></p>";
		var flag;
		var value = $("." + elm).val();
		$.ajax({
			type: "POST",
			url: "http://72.127.2.37/api/router/user/validateMobileRegistered",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("accessId", "accessId");
				xhr.setRequestHeader("accessKey", "accessKey");
				xhr.setRequestHeader("sign", "NO");
			},
			data: {
				mobile: value
			},
			async: false,
			success: function(data) {
				if (value != "" && data.content == true) {
					flag = true;
					$("." + elm).removeClass("red");
					$("." + elm).siblings('.' + cls).remove();
				} else {
					flag = false;
					$("." + elm).parent().append(ts);
					$("." + elm).addClass("red");
				}
			}
		});
		if (flag) {
			return true;
		} else {
			return false;
		}
	},
	// keyup的时候验证手机号码格式
	checkPhoneKey: function(data) {
		this.callback = {
			callback: function() {}
		};
		var _this = this;
		var status;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>手机号必须由11位纯数字组成</em></p>";
		$("." + data.elm).on("keyup", function() {
			var val = $("." + data.elm).val();
			if (val.length >= 11) {
				if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
					if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
						return false;
					} else {
						$("." + data.elm).parent().append(ts);
					}
					$("." + data.elm).addClass("red");
					status = false;
				} else {
					$("." + data.elm).siblings('.' + data.cls).remove();
					$("." + data.elm).removeClass("red");
					status = true;
				}
			}
			data.callback(status);
		});
	},
	// blur的时候验证手机号码格式
	checkPhoneBlur: function(data) {
		this.callback = {
			callback: function() {}
		};
		var _this = this;
		var status;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>手机号必须由11位纯数字组成</em></p>";
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			if (val == "" || !(/^1[34578]\d{9}$/.test(val))) {
				if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
					return false;
				} else {
					$("." + data.elm).parent().append(ts);
				}
				$("." + data.elm).addClass("red");
				status = false;
			} else {
				$("." + data.elm).siblings('.' + data.cls).remove();
				$("." + data.elm).removeClass("red");
				status = true;
			}
			data.callback(status);
		});
	},
	// 验证银行卡号
	checkBankNum: function(data) {
		this.callback = {
			callback: function() {}
		};
		var _this = this;
		var flag;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>请输入正确的银行卡号！</em></p>";
		var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			val = val.replace(/\s/g, "");
			if (val == "" || !(reg.test(val))) {
				flag = false;
				$("." + data.elm).addClass('red');
				if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
					return false;
				} else {
					$("." + data.elm).parent().append(ts);
				}
			} else {
				flag = true;
				$("." + data.elm).removeClass('red');
				$("." + data.elm).siblings('.' + data.cls).remove();
			}
			data.callback(flag);
		});
	},
	// 验证支付密码长度
	checkPaynum: function(data) {
		this.callback = {
			callback: function() {}
		};
		var flag;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>支付密码必须是6位数字！</em></p>";
		var _this = this;
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			var length = $("." + data.elm).val().length;
			if (length < 6) {
				if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
					return false;
				} else {
					$("." + data.elm).parent().append(ts);
				}
				$("." + data.elm).addClass("red");
				flag = false;
			} else if (length == 6) {
				$("." + data.elm).siblings('.' + data.cls).remove();
				$("." + data.elm).removeClass('red');
				flag = true;
			}
			data.callback(flag);
		});
	},
	// 验证金额
	checkMoney: function(data) {
		this.callback = {
			callback: function() {}
		};
		var flag;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>充值金额为100元起！</em></p>";
		var _this = this;
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			if (val < 100) {
				if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
					return false;
				} else {
					$("." + data.elm).parent().append(ts);
				}
				$("." + data.elm).addClass("red");
				flag = false;
			} else {
				$("." + data.elm).siblings('.' + data.cls).remove();
				$("." + data.elm).removeClass('red');
				flag = true;
			}
			data.callback(flag);
		});
	},
	// 快捷充值验证金额
	checkMoneyFast: function(data) {
		this.callback = {
			callback: function() {}
		};
		var flag;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>本次充值金额范围：100元-5万元！</em></p>";
		var _this = this;
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			if (val < 100 || val > 50000) {
				if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
					return false;
				} else {
					$("." + data.elm).parent().append(ts);
				}
				$("." + data.elm).addClass("red");
				flag = false;
			} else {
				$("." + data.elm).siblings('.' + data.cls).remove();
				$("." + data.elm).removeClass('red');
				flag = true;
			}
			data.callback(flag);
		});
	},
	checkCashMoney: function(data) {
		this.callback = {
			callback: function() {}
		};
		var flag;
		var ts = "<p class=" + data.cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<em class=wz>单笔体现范围：100元-1000万元！</em></p>";
		var _this = this;
		$("." + data.elm).on("blur", function() {
			var val = $("." + data.elm).val();
			if (val < 100 || val > 10000000) {
				$("." + data.elm).parent().append(ts);
				$("." + data.elm).addClass("red");
				flag = false;
			} else {
				$("." + data.elm).siblings('.' + data.cls).remove();
				$("." + data.elm).removeClass('red');
				flag = _this.moneyOnly(data.elm, data.cls);
			}
			data.callback(flag);
		});
	},
	moneyOnly: function(elm, cls) {
		var ts = "<p class=" + cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>您输入的金额大于可提现金额</span></p>";
		var flag;
		var number = 500;
		var value = $("." + elm).val();
		if (value != "" && value <= number) {
			flag = true;
			$("." + elm).removeClass("red");
			$("." + elm).siblings('.' + cls).remove();
		} else {
			flag = false;
			if ($("." + elm).parent().find("." + cls).length > 0) {
				return false;
			} else {
				$("." + elm).parent().append(ts);
			}
			$("." + elm).addClass("red");
		}
		return flag;
	},
	// 投资详情页输入金额
	inpMoneyOnkey: function(data) {
		var _this = this;
		this.callback = {
			callback: function() {}
		};
		$("." + data.elm).on("keyup", function() {
			// 可以余额
			var in_money = data.balance;
			// 可投金额
			var bal_money = data.invest;
			var inp = $(this);
			var val = $(this).val();
			var apen = $(this).parent();
			var x = data.btn_x;
			_this.btn_x(val, inp, x);
			_this.import_money(inp, apen, val, in_money, bal_money);
			data.callback(inp);
		});
	},
	inpMoneyOnFocus: function(data) {
		var _this = this;
		$("." + data.inp).on("focus", function() {
			var inp = $("." + data.inp);
			var val = inp.val();
			var x = data.btn_x;
			_this.btn_x(val, inp, x);
		});
	},
	inpMoneyOnClick: function(data) {
		var _this = this;
		this.callback = {
			callback: function() {}
		};
		$("." + data.elm).on("click", function() {
			// 可以余额
			var in_money = data.balance;
			// 可投金额
			var bal_money = data.invest;
			if (in_money >= bal_money) {
				$("." + data.input).val(bal_money);
			} else {
				$("." + data.input).val(in_money);
			}
			var inp = $("." + data.input);
			var val = $("." + data.input).val();
			var apen = $("." + data.input).parent();
			_this.import_money(inp, apen, val, in_money, bal_money);
			data.callback(inp);
		});
	},
	// 判断输入金额
	import_money: function(inp, apen, money, in_money, bal_money) {
		if (money != "" && money != 0 && money < 100 && bal_money < 500) {
			this.input_mess(inp, true, apen, "不得低于起投金额100元！");
			return false;
		} else if (money != "" && money != 0 && money < 500 && bal_money >= 500) {
			this.input_mess(inp, true, apen, "不得低于起投金额500元！");
			return false;
		} else if (money != "" && money != 0 && money > bal_money) {
			this.input_mess(inp, true, apen, "您输入的金额大于当前剩余可投金额！");
			return false;
		} else if (money != "" && money != 0 && money > in_money) {
			this.input_mess(inp, true, apen, "余额不足");
			return false;
		} else if (money != "" && money != 0 && money > 500000) {
			this.input_mess(inp, true, apen, "单笔限额为500,000元！");
			return false;
		} else {
			this.input_mess(inp, false, apen, "");
		}
	},
	// input状态错误提示
	input_mess: function(inp, boole, apen, str) {
		var txts = '<span class="in_span"><i class="iconfont">&#xe671;</i>' + str + '</span>';
		if (boole == true) {
			if ($(".in_span").length <= 0) {
				apen.addClass('bor_col');
				apen.append(txts);
				inp.css("color", "red");
			} else {
				$(".in_span").remove();
				apen.append(txts);
			}
		} else if (boole == false) {
			apen.removeClass("bor_col");
			$(".in_span").remove();
			inp.css("color", "#333");
		}
	},
	btn_x: function(val, thi, x) {
		if (val == '0.00') {
			thi.val('');
		} else {
			thi.val(thi.val().replace(/\.00/, '').replace(/(\.\d)0/, '$1'));
		};
		if (val != "") {
			$("." + x).show();
		} else {
			$("." + x).hide();
		}
	}
};
module.exports = _regular;