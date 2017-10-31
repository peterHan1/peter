require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require("./uc_accountCenter.scss");
require('util/layer/layer.js');
require('util/layer/layer.scss');


var _inp = require('util/yz.js');
var _del = require('util/delButton.js');

var accountSet = {
	init: function() {
		this.inputMutual();
		this.inputDel();
		this.uploadPhoto();
		this.addAdress();
		this.changeAdress();
		this.buttonVerify();
		this.checkEmpty();
		this.tsShow();
	},
	// input框交互样式
	inputMutual: function() {
		_inp.focus("input");
		_inp.blur("input");
		_inp.mouseover("input");
		_inp.mouseleave("input");
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
				$(".adress .adress_text .adr_name").find('span').html(name);
				$(".adress .adress_text .adr_phone").find('span').html(phone);
				$(".adress .adress_text .adr_adr").find('span').html(adr);
				$(".adress .adress_text .adr_name").show();
				$(".adress .adress_text .adr_phone").show();
				$(".adress .adress_text .adr_adr").show();
				$(".adress .adress_text .adr_ts").hide();
				$(".adress .adress_text a").hide();
				$(".adress .adress_top a").show();
				layer.closeAll();
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