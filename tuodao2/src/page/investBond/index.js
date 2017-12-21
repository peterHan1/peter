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
			var lists = res.content.list;
			invest.getHtmlFn(lists);
			_paging.paging("pageList",res.content.total,10,function(e){
				_apiInvests.getInvestListBond(type,e.current,10,function(res){
					var lists = res.content.list;
					invest.getHtmlFn(lists);
				},function(err){
					console.log(err);
				});
			});
		},function(err){
			console.log(err);
		});
	},
	getHtmlFn : function(lists){
		for(var i in lists){
			var plan = _invest.setBarShow(lists[i].account,lists[i].lastAccount);
			var finTxt = invest.setFinish(lists[i].finished);
			lists[i].btnTxt = finTxt.txt;
			lists[i].btnCla = finTxt.clas;
			lists[i].parCla = finTxt.cla;
			lists[i].barTxt = plan.planTxt;
			lists[i].barxx = plan.barWin;
		}
		listHtml = _td.renderHtml(investListBond,{
			list:lists,
		});
		$('.invest_list_bot').html(listHtml);
	},
	eventFn : function(){
		$(".bond_tab li").on("click",function(){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var type = $(this).attr("type");
			invest.getListBond(type);
		});
	},
	setFinish:function(bool){
		if(bool == true){
			return {"txt":"已抢完","clas":"finish","cla":"finish"};
		}else{
			return {"txt":"立即投资","clas":"btn","cla":"expect"};
		}
	}
};
$(function() {
	invest.init();
});
