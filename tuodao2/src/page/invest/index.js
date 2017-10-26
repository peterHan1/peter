require('./invest.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td = require('util/td.js');
var _apiInvest = require('api/invest_list-api.js');
var investListSift = require('./invest_list_sift.string');
var investListScatter = require('./invest_list_scatter.string');
var investListBond = require('./invest_list_bond.string');
var invest = {
	init : function(){
		this.eachA();
		this.eventFn();
	},
	eachA : function(){
		//  0：散标 1:精选计划
		$('.invest_tab a').each(function() {
			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
				$(this).addClass('on');
				var productType = $(this).attr("productType");
				console.log("type: " + productType);
				var index = $(this).parent().index();
				$(".invest_list_bot ul").eq(index).show().siblings().hide();
				$(".invest_list_top ul").eq(index).show().siblings("ul").hide();
				if(productType == "sift"){
					var type = 1;
					invest.getListSift(type);
				}else if(productType == "scatter"){
					var type = 0;
					invest.getListScatter(type);
				}else if (productType == "bond") {
					$(".invest_list_txt").show();
					invest.getListBond(0);
				} else {
					$(".invest_list_txt").hide();
				}
			} else {
				$(this).removeClass('on');
			};

		});
	},
	getListSift : function(type){
		// 精选计划
		_apiInvest.getInvestList(type,1,10,function(res){
			invest.setData(res);
			bannerHtml = _td.renderHtml(investListSift,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(bannerHtml);
			invest.setShow("list_sift");
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getInvestList(type,e.current,10,function(res){
					invest.setData(res);
					bannerHtml = _td.renderHtml(investListSift,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(bannerHtml);
					invest.setShow("list_sift");
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	// 散标项目
	getListScatter : function(type){
		_apiInvest.getInvestList(type,1,10,function(res){
			invest.setData(res);
			bannerHtml = _td.renderHtml(investListScatter,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(bannerHtml);
			invest.setShow("list_scatter");
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getInvestList(type,e.current,10,function(res){
					invest.setData(res);
					bannerHtml = _td.renderHtml(investListScatter,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(bannerHtml);
					invest.setShow("list_scatter");
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	// 债权转让
	getListBond : function(type){
		_apiInvest.getInvestListBond(type,1,10,function(res){
			invest.setUnit(res);
			bannerHtml = _td.renderHtml(investListBond,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(bannerHtml);
			invest.setShow("list_bond");
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getInvestListBond(type,e.current,10,function(res){
					invest.setUnit(res);
					bannerHtml = _td.renderHtml(investListBond,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(bannerHtml);
					invest.setShow("list_bond");
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
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
			var totalM = $(this).find('.totalMoney').html();
			var resM = $(this).find('.resMoney').html();
			var plan = Math.floor((totalM-resM)/totalM*100);
			if(plan == 0){
				plan=100;
			}else{
				plan = plan;
			};
			$(this).find($(".bar")).width(plan);
			$(this).find($(".barNum")).html(plan);
			// 满标 年化率颜色和按钮状态
			var btnStatus = $(this).find('.butt').attr("status");
			if(btnStatus == 0){
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
	}
};
$(function() {
	invest.init();
});