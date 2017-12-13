require('./invest.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td 				= require('util/td.js');
var _paging 			= require('util/paging/index.js');
var _apiInvest 			= require('api/product-api.js');
var _apiInvests 		= require('api/trade-api.js');
var investListBond 		= require('./list_bond.string');
var invest = {
	init : function(){
		this.addHtml();
		this.eventFn();
	},
	addHtml : function(){
		invest.getListBond(0);
	},
	// 债权转让
	getListBond : function(type){
		_apiInvests.getInvestListBond(type,1,10,function(res){
			invest.setUnit(res);
			listHtml = _td.renderHtml(investListBond,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(listHtml);
			invest.setShow("list_bond");
			_paging.paging("pageList",res.content.total,10,function(e){
				_apiInvests.getInvestListBond(type,e.current,10,function(res){
					invest.setUnit(res);
					listHtml = _td.renderHtml(investListBond,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(listHtml);
					invest.setShow("list_bond");
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	eventFn : function(){
		$(".bond_tab li").on("click",function(){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var type = $(this).attr("type");
			invest.getListBond(type);
		});
	},
	// 债权转让
	setUnit : function(res){
		var resList = res.content.list;
		// 剩余期限单位
		$.each(resList,function(i){
			if(resList[i].periodType == "0"){
				resList[i].periodType = "天";
			}else if(resList[i].periodType == "1"){
				resList[i].periodType = "个月";
			}else if(resList[i].periodType == "2"){
				resList[i].periodType = "年";
			}
		});
	},
	setShow : function(ul){
		$("."+ul).find("li").each(function(){
			// 加入进度
			var totalM = $(this).find('.totalMoney').html()*1;
			var resM = $(this).find('.resMoney').html()*1;
			var plan = Math.floor((totalM-resM)/totalM*100);
			if(totalM == resM){
				plan = 0;
			}else{
				plan = plan;
			}
			$(this).find($(".bar")).width(plan);
			$(this).find($(".barNum")).html(plan);
			// 满标 年化率颜色和按钮状态
			var btnStatus = $(this).find('.butt').attr("status");
			if(btnStatus == 0 || btnStatus == "false"){
				$(this).find('.butt').removeClass('btn').addClass("finish").html("已抢完");
				$(this).find('.expect').addClass("finish");
			}
			// 有无奖励
			var awardStatus = $(this).find('.award').attr("award");
			if(awardStatus == 0){
				$(this).find('.award').remove();
			}
		});
	}
};
$(function() {
	invest.init();
});
