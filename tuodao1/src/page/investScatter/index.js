require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td 				= require('util/td.js');
var _invest 			= require('util/invest/index.js');
var _paging 			= require('util/paging/index.js');
var _apiInvest 			= require('api/product-api.js');
var _apiInvests 		= require('api/trade-api.js');
var investListScatter 	= require('./list_scatter.string');
var invest = {
	init : function(){
		this.addHtml();
		this.eventFn();
	},
	addHtml : function(){
		var params = {
			productType: 0,
			currentPage: 1,
			pageSize: 10
		};
		invest.getListScatter(params);
	},
	// 散标项目
	getListScatter : function(params){
		_apiInvest.getInvestList(params,function(res){
			console.log(res)
			listHtml = _td.renderHtml(investListScatter,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(listHtml);
			_invest.setShow("list_scatter");
			_invest.setTips();
			_paging.paging("pageList",res.content.total,10,function(e){
				params.currentPage = e.current;
				_apiInvest.getInvestList(params,function(res){
					listHtml = _td.renderHtml(investListScatter,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(listHtml);
					_invest.setShow("list_scatter");
					_invest.setTips();
				},function(err){
					console.log(err);
				});
			});
		},function(err){
			console.log(err);
		});
	},
	eventFn : function(){
		$(document).on("click", ".invest_list_top li", function() {
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
		});
		invest.scatterTab();
	},
	scatterTab : function(){
		$(".invest_nav_data li").on("click",function(){
			var start = $(this).attr("start");
			var end = $(this).attr("end");
			var status = $(this).attr("status");
			$(".invest_nav_mou li").attr("start",start);
			$(".invest_nav_mou li").attr("end",end);
			var dataListt = {
				productType: 0,
				productPeriodStart: start,
				productPeriodEnd: end,
				refundWay:status,
				currentPage: 1,
				pageSize: 10
			};
			invest.getListScatter(dataListt);
		});
		$(".invest_nav_mou li").on("click",function(){
			var start = $(this).attr("start");
			var end = $(this).attr("end");
			var status = $(this).attr("status");
			$(".invest_nav_data li").attr("status",status);
			var dataListt = {
				productType: 0,
				productPeriodStart: start,
				productPeriodEnd: end,
				refundWay:status,
				currentPage: 1,
				pageSize: 10
			};
			invest.getListScatter(dataListt);
		});
	}
};
$(function() {
	invest.init();
});
