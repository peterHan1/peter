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
				if ($("." + data.elm).parent().find("." + data.cls).length > 0) {
					return false;
				} else {
					$("." + data.elm).parent().append(ts);
				}
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
	// 验证密码正确性
	checkPassword: function(elm, cls) {
		var data = "123";
		var flag;
		var ts = "<p class=" + cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>密码错误，请重新输入</span></p>";
		var values = $("." + elm).val();
		if (values != "" && values === data) {
			flag = true;
			$("." + elm).siblings('.' + cls).remove();
			$("." + elm).removeClass("red");
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
	// 验证手机号码唯一性
	checkPhoneOnly: function(elm, cls) {
		var ts = "<p class=" + cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>该手机号码尚未注册拓道金服</span></p>";
		var flag;
		var number = "1";
		var value = $("." + elm).val();
		if (value != "" && number == "1") {
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
				flag=_this.moneyOnly(data.elm,data.cls);
			}
			data.callback(flag);
		});
	},
	moneyOnly: function(elm, cls) {
		var ts = "<p class=" + cls + ">&nbsp;<i class=iconfont>&#xe671;</i>&nbsp;<span class=wz>您输入的金额大于可提现金额</span></p>";
		var flag;
		var number = 500;
		var value = $("." + elm).val();
		if (value != "" && value<=number) {
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
	}
};
module.exports = _regular;