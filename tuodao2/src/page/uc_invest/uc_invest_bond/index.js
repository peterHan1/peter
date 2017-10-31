require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');
var _td = require('util/td.js');
var _apiInvest = require('api/ucInListBond-api.js');
var bondAble = require('./Invest_bondAble.string');
var bondTran = require('./Invest_bondTran.string');
var bondYet= require('./Invest_bondYet.string');

var ucInvest = {
	init : function(){
		this.urlEach();
		this.inputUp();
		this.statusHtml();
		this.addAbleHtml('0','','','10','1');
	},
	urlEach : function(){
		$('.uc_bondTab a').each(function () {
			if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
				var sta = $(this).attr("status");
				var index = $(this).parent().index();
				$(this).addClass('on');
				$(".uc_invest_com").eq(index).show().siblings(".uc_invest_com").hide();
				if(sta == "0"){
					$(".uc_invest_tabR").attr("status",sta);
					ucInvest.addAbleHtml('0','','','10','1');
				}else if(sta == "1"){
					$(".uc_invest_tabR").attr("status",sta);
					ucInvest.addTranHtml('transfer_list','1','','','10','1');
				}else if(sta == "2"){
					$(".uc_invest_tabR").attr("status",sta);
					ucInvest.addTranHtml('transfers_list','2','','','10','1');
				}else if(sta == "3"){
					$(".uc_invest_tabR").attr("status",sta);
					ucInvest.addYetHtml('3','','','10','1');
					$(".uc_invest_tabL").show();
				}else{
					$(".uc_invest_tabL").hide();
				};
			} else {
				$(this).removeClass('on');
			};

		});
	},
	addAbleHtml : function(sta,startime,endtime,pagesize,current){
		_apiInvest.getBond(sta,startime,endtime,pagesize,current,function(res){
			listBondHtml = _td.renderHtml(bondAble,{
				list:res.content.list,
			});
			$("#tbody_list").html(listBondHtml);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				listBondHtml = _td.renderHtml(bondAble,{
					list:res.content.list,
				});
				$("#tbody_list").html(listBondHtml);
				ucInvest.trColor();
				ucInvest.tipsHover();
				ucInvest.eventFn();
			});
			ucInvest.trColor();
			ucInvest.tipsHover();
			ucInvest.eventFn();
		},function(){
			console.log("请求失败");
		});
	},
	addTranHtml : function(el,sta,startime,endtime,pagesize,current){
		_apiInvest.getBond(sta,startime,endtime,pagesize,current,function(res){
			listBondHtml = _td.renderHtml(bondTran,{
				list:res.content.list,
			});
			$("#"+el).html(listBondHtml);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				listBondHtml = _td.renderHtml(bondTran,{
					list:res.content.list,
				});
				$("#"+el).html(listBondHtml);
				ucInvest.trColor();
				ucInvest.tipsHover();
				ucInvest.eventFn();
			});
			ucInvest.trColor();
			ucInvest.tipsHover();
			ucInvest.eventFn();
		},function(){
			console.log("请求失败");
		});
	},
	addYetHtml : function(sta,startime,endtime,pagesize,current){
		_apiInvest.getBond(sta,startime,endtime,pagesize,current,function(res){
			listBondHtml = _td.renderHtml(bondYet,{
				list:res.content.list,
			});
			$("#yet_list").html(listBondHtml);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				listBondHtml = _td.renderHtml(bondYet,{
					list:res.content.list,
				});
				$("#yet_list").html(listBondHtml);
				ucInvest.trColor();
				ucInvest.tipsHover();
				ucInvest.eventFn();
			});
			ucInvest.trColor();
			ucInvest.tipsHover();
			ucInvest.eventFn();
		},function(){
			console.log("请求失败");
		});
	},
	statusHtml : function(){
		$(".uc_invest_tabL li").on("click",function(){
			var sta = $(this).attr("status");
			$(this).addClass('on').siblings('li').removeClass('on');
			
		});
	},
	eventFn : function(){
		$(".start_date").on("click",function(){
			laydate({
				elem: '#start_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
		});
		$(".end_date").on("click",function(){
			laydate({
				elem: '#end_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
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
		function show_mess(str){
			var txt = "<span class='mess'><i class='iconfont'>&#xe671;</i>"+ str +"</span>";
			$(".bond_formM").addClass("cur_money");
			$(".input_pwd").addClass("psw_mes");
			if($(".mess").length > 0){
				$(".mess").remove();
			}
			$(".bond_formM").append(txt);
		};
	},

	tipsHover : function(){
		$(".td_name").mouseover(function(){
			_tips.getTipsRight($(this),16);
		});
		$(".td_name").mouseout(function(){
			$(this).find('.tips').hide();
		});
	},
	inputUp : function(){
		$(".sub_psw").keyup(function(){
			if($(this).val() != ""){
				$(".sub_btn").addClass("affirm_btn");
			}else{
				$(".sub_btn").removeClass("affirm_btn");
			}
		});
	},
	trColor : function(){
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
	}
};
$(function(){
	ucInvest.init();
});