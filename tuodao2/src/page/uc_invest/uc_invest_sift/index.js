require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
var _tips = require('util/tips/index.js');
var _td = require('util/td.js');
var _apiInvest = require('api/ucInListSift-api.js');
var investSift = require('./Invest_sift.string');

var ucInvest = {
	init : function(){
		var userId = "18539123451-lwvm5mx68dr2wxzqgnuc";
		this.eventFn();
		this.page();
		this.addHtml(userId,"","","","","");
	},
	addHtml : function(userId,sta,startime,endtime,pagesize,current){
		_apiInvest.getSift(userId,sta,startime,endtime,pagesize,current,function(res){
			console.log("userId: " + userId);
			console.log("userId: " + sta);
			console.log("startime: " + startime);
			console.log("endtime: " + endtime);
			console.log("pagesize: " + pagesize);
			console.log("current: " + current);
			listSiftHtml = _td.renderHtml(investSift,{
				list:res.content.list,
			});
			$("#tbody_list").html(listSiftHtml);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getSift(dataList,function(res){
					listSiftHtml = _td.renderHtml(investSift,{
						list:res.content.list,
					});
					$("#tbody_list").html(listSiftHtml);
					ucInvest.trColor();
				});
			});
			ucInvest.tipsHover();
			ucInvest.trColor();
		},function(){
			console.log("请求失败");
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
		$(".uc_invest_tabL li").on("click",function(){
			$(this).addClass('on').siblings('li').removeClass('on');
		});
	},
	tipsHover : function(){
		$(".td_name").mouseover(function(){
			_tips.getTipsRight($(this),15);
		});
		$(".td_name").mouseout(function(){
			$(this).find('.tips').hide();
		});
	},
	trColor : function(){
		var trs=document.getElementById("tbody_list").getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	},
	page : function(){
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
	}
};
$(function(){
	ucInvest.init();
});