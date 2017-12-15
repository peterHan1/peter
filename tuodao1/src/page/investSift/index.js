require('page/common/top/index.js');
require('page/common/nav/index.js');
var _td 			= require('util/td.js');
var _invest 		= require('util/invest/index.js');
var _paging 		= require('util/paging/index.js');
var _apiInvest 		= require('api/product-api.js');
var _apiInvests 	= require('api/trade-api.js');
var investListSift 	= require('./list_sift.string');
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
			var lists = res.content.list;
			for(i in lists){
				var time = lists[i].serverTime;
				var start = lists[i].availableInvestTime;
				var btn = invest.setCount(time,start);
				lists[i].showBtn=btn.txt;
				lists[i].clas=btn.cla;
			};
			listHtml = _td.renderHtml(investListSift,{
				list:lists,
			});
			$('.invest_list_bot').html(listHtml);
			_invest.setShow("list_sift");
			_invest.setTips();
			_paging.paging("pageList",res.content.total,10,function(e){
				params.currentPage = e.current;
				_apiInvest.getInvestList(params,function(res){
					listHtml = _td.renderHtml(investListSift,{
						list:res.content.list,
					});
					$('.invest_list_bot').html(listHtml);
					_invest.setShow("list_sift");
					_invest.setTips();
				},function(err){
					console.log(err);
				});
			});
		},function(err){
			console.log(err);
		});
	},
	setCount : function(time,start){
		if(start > time){
			var startTime = _invest.setTime(2,start);
			var startTxt;
			var st = (start-time) / 1000;
			var t = st / (60*60*24);
			if(t < 1){
				startTxt = startTime;
			}else if(t >= 1 && t < 2){
				startTxt = "明天" + startTime + "开抢";
			}else if(t>=2 && t < 3){
				startTxt = "后天" + startTime + "开抢";
			}else{
				startTxt = "即将开抢";
			}
			return {"txt":startTxt,"cla":"btn_tim"};
		}else{
			return {"txt":"立即加入","cla":"btn"};
		}
	},
	eventFn : function(){
		$(".sift_tab li").on("click",function(){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
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
	}
};
$(function() {
	invest.init();
});
