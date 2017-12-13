require('./invest.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td 				= require('util/td.js');
var _paging 			= require('util/paging/index.js');
var _apiInvest 			= require('api/product-api.js');
var _apiInvests 		= require('api/trade-api.js');
var investListSift 		= require('./list_sift.string');
var invest = {
	init : function(){
		this.addHtml();
		this.eventFn();
	},
	addHtml : function(){
		var params = {
			productType: 1,
			currentPage: 1,
			pageSize: 10
		};
		invest.getListSift(params);
	},
	getListSift : function(params){
		// 精选计划
		_apiInvest.getInvestList(params,function(res){
			console.log(res);
			invest.setData(res);
			listHtml = _td.renderHtml(investListSift,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(listHtml);
			invest.setShow("list_sift");
			_paging.paging("pageList",res.content.total,10,function(e){
				params.currentPage = e.current;
				_apiInvest.getInvestList(params,function(res){
					invest.setData(res);
					listHtml = _td.renderHtml(investListSift,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(listHtml);
					invest.setShow("list_sift");
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(err){
			console.log(err);
		});
	},
	siftTab : function(){
		$(".sift_tab li").on("click",function(){
			var start = $(this).attr("start");
			var end = $(this).attr("end");
			var dataListt = {
				productType			: 1,
				productPeriodStart	: start,
				productPeriodEnd	: end,
				currentPage 		: 1,
				pageSize 			: 10
			};
			invest.getListSift(dataListt);
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
	},
	// 精选计划、散标
	setData : function(res){
		var resList = res.content.list;
		// 还款方式
		$.each(resList,function(i){
			var type = resList[i].refundWay;
			if(resList[i].refundWay == "0"){
				resList[i].refundWay = "等额本息";
			}else if(resList[i].refundWay == "1"){
				resList[i].refundWay = "按月付息";
			}else if(resList[i].refundWay == "2"){
				resList[i].refundWay = "按天付息";
			}
		});
		// 投资期限单位
		$.each(resList,function(i){
			if(resList[i].periodUnit == "0"){
				resList[i].periodUnit = "天";
			}else if(resList[i].periodUnit == "1"){
				resList[i].periodUnit = "个月";
			}else if(resList[i].periodUnit == "2"){
				resList[i].periodUnit = "年";
			}
		});
	},
	eventFn : function(){
		$(document).on("click", ".invest_list_top li", function() {
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
		});
		invest.siftTab();
	}
};
$(function() {
	invest.init();
});
