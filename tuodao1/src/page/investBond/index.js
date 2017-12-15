require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td 			= require('util/td.js');
var _invest 		= require('util/invest/index.js');
var _paging 		= require('util/paging/index.js');
var _apiInvest 		= require('api/product-api.js');
var _apiInvests 	= require('api/trade-api.js');
var investListBond 	= require('./list_bond.string');
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
			_invest.setUnit(res);
			listHtml = _td.renderHtml(investListBond,{
				list:res.content.list,
			});
			$('.invest_list_bot').html(listHtml);
			_invest.setShow("list_bond");
			_paging.paging("pageList",res.content.total,10,function(e){
				_apiInvests.getInvestListBond(type,e.current,10,function(res){
					_invest.setUnit(res);
					listHtml = _td.renderHtml(investListBond,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(listHtml);
					_invest.setShow("list_bond");
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
};
$(function() {
	invest.init();
});
