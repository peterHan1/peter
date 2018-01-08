require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require("./uc_accountCenter.scss");
require('util/layer/layer.js');
require('util/layer/layer.scss');

var _td = require('util/td.js');
var _del = require('util/delButton.js');
var _user = require('api/user-api.js');

var headerData = {
		'accessId' : unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	};

var accountSet = {
	init: function() {
		this.load();
		this.inputDel();
		this.uploadPhoto();
		this.addAdress();
		this.changeAdress();
		this.buttonVerify();
		this.checkEmpty();
		this.tsShow();
	},
	load: function() {
		// 获取账户设置信息接口
		_user.getAccountSetting(headerData,function(res) {
			// 是否开通存管账户
			var isOpenDeposit = res.content.isOpenDeposit;
			if (isOpenDeposit == 1) {
				$(".cg_zh .no_dl").hide();
				$(".cg_zh .dl").show();
				$(".zh_pass .pay_pass .no_dl").hide();
				$(".zh_pass .pay_pass .dl").show();
			} else {
				$(".cg_zh .no_dl").show();
				$(".cg_zh .dl").hide();
				$(".zh_pass .pay_pass .no_dl").show();
				$(".zh_pass .pay_pass .dl").hide();
			}
			// 是否绑定银行卡
			var isBindBank = res.content.isBindBank;
			var bankNum = res.content.bankNum;
			var bankName = res.content.bankName;
			if (isBindBank == 1) {
				$(".bank_card .no_dl").hide();
				$(".bank_card .dl").show();
				$(".bank_card .bank .banknum").html(bankNum);
				$(".bank_card .bank .bankname").html(bankName);
			} else {
				$(".bank_card .no_dl").show();
				$(".bank_card .dl").hide();
			}
			// 登录密码强弱
			var pwSecurityLevel = res.content.pwSecurityLevel;
			if (pwSecurityLevel == 0) {
				$(".login_pass i b").html("弱");
				$(".login_pass i b").attr("class", "low");
			} else if (pwSecurityLevel == 1) {
				$(".login_pass i b").html("强");
				$(".login_pass i b").attr("class", "mid");
			} else {
				$(".login_pass i b").html("最高");
				$(".login_pass i b").attr("class", "strong");
			}
			// 是否有收件人信息
			var hasConsigneeInfo = res.content.hasConsigneeInfo;
			if (hasConsigneeInfo == 0) {
				return;
			} else {
				$(".adress .change_adr").show();
				$(".adress .adress_text .add_adr").hide();
				$(".adress .adress_text .adr_ts").hide();
				$(".adress .adress_text .adr_box").show();
				var consignee = res.content.consignee;
				var consigneeMobile = res.content.consigneeMobile;
				var consigneeAddress = res.content.consigneeAddress;
				$(".adr_box .adr_name span").html(consignee);
				$(".adr_box .adr_phone span").html(consigneeMobile);
				$(".adr_box .adr_adr span").html(consigneeAddress);
			}
		});
	},
	// input框输入时删除文本按钮
	inputDel: function() {
		_del.inptxtDel(".username", ".add_adress .sure");
		_del.inptxtDel(".phonenum", ".add_adress .sure");
	},
	// 上传头像
	uploadPhoto: function() {
		$(".head_box .change_btn").on("click", function() {
			layer.open({
				type: 1,
				title: '更换头像',
				skin: 'change_box',
				area: ['560px', '350px'],
				content: $('#change_box')
			});
		});
		$(".change_box .anniu .cancel").on("click", function() {
			layer.closeAll();
		});
		$(".change_box .anniu .sure").on("click", function() {
			layer.closeAll();
		});
		// 	// 上传按钮
		$(".upload_btn").on("click", function() {
			$(".inp_file").click();
		});
	},
	// 添加地址
	addAdress: function() {
		$(".adress_text a").on("click", function() {
			layer.open({
				type: 1,
				title: '添加地址',
				skin: 'add_adress',
				area: ['560px', '391px'],
				content: $('#add_adress')
			});
		});
		$(".add_adress .anniu .cancel").on("click", function() {
			layer.closeAll();
		});
		$(".add_adress .anniu .sure").on("click", function() {
			if ($(this).hasClass('kd')) {
				var name = $(".username").val();
				var phone = $(".phonenum").val();
				var adr = $(".useradress").val();
				layer.closeAll();
				var data = {
					consignee: name,
					consigneeMobile: phone,
					consigneeAddress: adr
				};
				_user.updateConsigneeInfo(headerData,data, function(res) {
					$(".adress .adress_text .adr_name").find('span').html(name);
					$(".adress .adress_text .adr_phone").find('span').html(phone);
					$(".adress .adress_text .adr_adr").find('span').html(adr);
					$(".adress .adress_text .adr_box").show();
					$(".adress .adress_text .adr_ts").hide();
					$(".adress .adress_text a").hide();
					$(".adress .adress_top a").show();
				});
			} else {
				return false;
			}
		});
	},
	// 修改地址弹窗
	changeAdress: function() {
		$(".adress .adress_top a").on("click", function() {
			layer.open({
				type: 1,
				title: '修改地址',
				skin: 'add_adress',
				area: ['560px', '391px'],
				content: $('#add_adress')
			});
		});
	},
	// input触发验证函数
	buttonVerify: function() {
		var _this = this;
		$(".username").on("input propertychange", function() {
			_this.checkEmpty();
		});
		$(".phonenum").on("input propertychange", function() {
			_this.checkEmpty();
		});
		$(".useradress").on("input propertychange", function() {
			_this.checkEmpty();
		});
	},
	checkEmpty: function() {
		var name = $(".username").val();
		var phone = $(".phonenum").val();
		var adr = $(".useradress").val();
		if (name != "" && phone != "" && adr != "") {
			$("#add_adress .sure").addClass("kd");
		} else {
			$("#add_adress .sure").removeClass("kd");
		}
	},
	tsShow: function() {
		$(".bank_cg .bank_card i.dl b").on("mouseover", function() {
			$(".bank_cg .bank_card i.ts").show();
		});
		$(".bank_cg .bank_card i.dl b").on("mouseleave", function() {
			$(".bank_cg .bank_card i.ts").hide();
		});
	}
};
$(function() {
	accountSet.init();
});