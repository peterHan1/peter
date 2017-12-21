require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td = require('util/td.js');
var _invest = require('util/invest/index.js');
var _paging = require('util/paging/index.js');
var _apiInvest = require('api/product-api.js');
var _apiInvests = require('api/trade-api.js');
var investListScatter = require('./list_scatter.string');
var invest = {
	init: function() {
		this.addHtml();
		this.eventFn();
	},
	addHtml: function() {
		var params = {
			productType: 0,
			currentPage: 1,
			pageSize: 10
		};
		invest.getListScatter(params);
	},
	// 散标项目
	getListScatter: function(params) {
		_apiInvest.getInvestList(params, function(res) {
			var lists = res.content.list;
			invest.getHtmlFn(lists);
			_paging.paging("pageList",res.content.total, 10, function(e) {
				params.currentPage = e.current;
				_apiInvest.getInvestList(params, function(res) {
					var lists = res.content.list;
					invest.getHtmlFn(lists);
				}, function(err) {
					console.log(err);
				});
			});
		}, function(err) {
			console.log(err);
		});
	},
	getHtmlFn : function(lists){
		for (i in lists) {
			var plan = _invest.setBarShow(lists[i].borrowAmount, lists[i].surplusInvestAmount);
			var tipType = _invest.setTips(lists[i].defineType);
			var btn = _invest.setCount(lists[i].borrowFullStatus,lists[i].serverTime, lists[i].availableInvestTime,"立即投资");
			lists[i].showBtn = btn.txt;
			lists[i].btnClas = btn.btnCla;
			lists[i].txtClas = btn.txtCla;
			lists[i].tipsType = tipType;
			lists[i].barTxt = plan.planTxt;
			lists[i].barxx = plan.barWin;
		};
		listHtml = _td.renderHtml(investListScatter, {
			list: lists,
		});
		$('.invest_list_bot').html(listHtml);
	},
	eventFn: function() {
		$(".invest_nav_data li").on("click", function() {
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var start = $(this).attr("start");
			var end = $(this).attr("end");
			var status = $(this).attr("status");
			$(".invest_nav_mou li").attr("start", start);
			$(".invest_nav_mou li").attr("end", end);
			var dataListt = {
				productType: 0,
				productPeriodStart: start,
				productPeriodEnd: end,
				refundWay: status,
				currentPage: 1,
				pageSize: 10
			};
			invest.getListScatter(dataListt);
		});
		$(".invest_nav_mou li").on("click", function() {
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var start = $(this).attr("start");
			var end = $(this).attr("end");
			var status = $(this).attr("status");
			$(".invest_nav_data li").attr("status", status);
			var dataListt = {
				productType: 0,
				productPeriodStart: start,
				productPeriodEnd: end,
				refundWay: status,
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