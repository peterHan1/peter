var _tips = require('util/tips/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

$(function(){
	$(".layer_date").on("click",function(event){
		if(event.target==this){
			laydate({
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
		}
	});
	$(".uc_invest_tabL li").on("click",function(){
		$(this).addClass('on').siblings('li').removeClass('on');
	});
	$(".uc_bondTab li").on("click",function(){
		var ind = $(this).index();
		$(this).addClass('on').siblings('li').removeClass('on');
		$(".uc_invest_com").eq(ind).show().siblings(".uc_invest_com").hide();
	});
	$(".hint").mouseover(function(){
		_tips.getTipsRight($(this),-10);
	});
	$(".hint").mouseout(function(){
		$(this).find('.tips').hide();
	});
	$(".sub_psw").keyup(function(){
		if($(this).val() != ""){
			$(".sub_btn").addClass("affirm_btn");
		}else{
			$(".sub_btn").removeClass("affirm_btn");
		}
	});
	// 申请转让
	$(".transfer_clk a").on("click",function(){
		layer.open({
			type: 1,
			title: '',
			closeBtn: 0,
			area: ['740px', '594px'],
			content: $('#bond_show')
		});
	});
	$(".close_btn").on("click",function(){
		layer.closeAll();
	});
	// 确认转让点击
	$(document).on("click",".affirm_btn",function(){
		var psw = $(".sub_psw").val();
		if(psw != "123"){
			show_mess("密码错误，请重新输入");
		}else{
			if($(".mess").length > 0){
				$(".mess").remove();
			}
			$(".bond_formM").removeClass("cur_money");
			$(".input_pwd").removeClass("psw_mes");
			$(".bond_show_box").hide();
			$(".bond_show_ok").show();
		}
	});
	$(".bond_ok_close").on("click",function(){
		layer.closeAll();
		window.location.reload();
	});
	$(".bond_show_now").on("click",function(){
		layer.closeAll();
		window.location.reload();
	});
	// top提示错误
	function show_mess(str){
		var txt = "<span class='mess'><i class='iconfont'>&#xe671;</i>"+ str +"</span>";
		$(".bond_formM").addClass("cur_money");
		$(".input_pwd").addClass("psw_mes");
		if($(".mess").length > 0){
			$(".mess").remove();
		}
		$(".bond_formM").append(txt);
	};
	// 得到总页数
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 10,
		// 当前页
		current: 1,
		// 显示条数
		shownum: 10,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
	trColor('tbody_list');
	trColor('transfer_list');
	trColor('transfers_list');
	trColor('transfer_list');
	// 各行变色
	function trColor(id){
		var trs=document.getElementById(id).getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	}
});