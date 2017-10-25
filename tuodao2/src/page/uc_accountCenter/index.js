require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require("./uc_accountCenter.scss");
require('util/layer/layer.js');
require('util/layer/layer.scss');
var _inp = require('util/yz.js');
$(function() {
	_inp.focus("input");
	_inp.blur("input");
	_inp.mouseover("input");
	_inp.mouseleave("input");
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
	// 上传按钮
	$(".upload_btn").on("click",function(){
		$(".inp_file").click();
	});
	// 添加地址弹窗
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
		}else{
			return false;
		}
	});
	$(".adress .adress_top a").on("click", function() {
		layer.open({
			type: 1,
			title: '修改地址',
			skin: 'add_adress',
			area: ['560px', '391px'],
			content: $('#add_adress')
		});
	});
	$(".username").on("input propertychange", function() {
		checkEmpty();
	});
	$(".phonenum").on("input propertychange", function() {
		checkEmpty();
	});
	$(".useradress").on("input propertychange", function() {
		checkEmpty();
	});

	function checkEmpty() {
		var name = $(".username").val();
		var phone = $(".phonenum").val();
		var adr = $(".useradress").val();
		if (name != "" && phone != "" && adr != "") {
			$("#add_adress .sure").addClass("kd");
		} else {
			$("#add_adress .sure").removeClass("kd");
		}
	}

	del(".username",".add_adress .sure");
	del(".phonenum",".add_adress .sure");
	// 清空按钮
	function del(name,el) {
		$(name).on("focus", function() {
			if ($(name).val() == "") {
				$(this).siblings(".del").hide();
			} else {
				$(this).siblings(".del").show();
			}
		});
		$(name).on("blur", function() {
			setTimeout(function() {
				$(name).siblings(".del").hide();
			}, 300);
		});
		$(name).on("keyup", function() {
			if ($(this).val() == "") {
				$(this).siblings(".del").hide();
			} else {
				$(this).siblings(".del").show();
			}
		});
		$(".del").on("click", function() {
			$(this).siblings(name).val("");
			$(el).removeClass("kd");
			$(el).on("mouseover", function() {
				$(this).removeClass('color');
			});
		});
	}
	// 问号显示
	$(".bank_cg .bank_card i.dl b").on("mouseover",function(){
		$(".bank_cg .bank_card i.ts").show();
	});
	$(".bank_cg .bank_card i.dl b").on("mouseleave",function(){
		$(".bank_cg .bank_card i.ts").hide();
	});
});