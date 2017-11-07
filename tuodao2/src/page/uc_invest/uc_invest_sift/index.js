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
		this.eventFn(userId);
		this.addHtml(userId,"","","","","");
	},
	addHtml : function(userId,sta,startime,endtime,pagesize,current){
		_apiInvest.getSift(userId,sta,startime,endtime,pagesize,current,function(res){
			// if(res.content != null){
				console.log(res);
				ucInvest.setSta(res);
				listSiftHtml = _td.renderHtml(investSift,{
					list:res.content.list,
				});
				$("#tbody_list").html(listSiftHtml);
				ucInvest.setShow("td_sta");
				_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
					_apiInvest.getSift(userId,sta,startime,endtime,pagesize,e.current,function(res){
						listSiftHtml = _td.renderHtml(investSift,{
							list:res.content.list,
						});
						$("#tbody_list").html(listSiftHtml);
						ucInvest.tipsHover();
						ucInvest.trColor();
					});
				});
				ucInvest.tipsHover();
				ucInvest.trColor();
			// }else{
				// var dataNones='<tr><td colspan="8"><div class="null_data" colspan="8"><div class="null_data_bg"></div><p>当前没有加入记录</p></div></td></tr>';
				// $("#tbody_list").html(dataNones);
			// }
		},function(){
			console.log("请求失败");
		});
	},
	setShow : function(el){
		var tdList = $("."+el);
		$.each(tdList,function(i){
			var ht = $(this).html();
			if(ht == 0){
				$(this).html("待回款");
			}else if(ht == 1){
				$(this).html("匹配中");
			}else if(ht == 2){
				$(this).html("已回款");
			}else if(ht == 3){
				$(this).html("已撤标");
			}
		});
	},
	setSta : function(res){
		var resList = res.content.list;
		// 状态
		$.each(resList,function(i){
			if(resList[i].status == "待回款"){
				resList[i].status = "0";
			}else if(resList[i].status == "匹配中"){
				resList[i].status = "1";
			}else  if(resList[i].status == "已回款"){
				resList[i].status = "2";
			}else if(resList[i].status == "已撤标"){
				resList[i].status = "3";
			}
		});
	},
	eventFn : function(userId){
		$(".start_date").on("click",function(){
			var _this = $(this);
			var sta = $(this).parent(".uc_invest_tabR").attr("status");
			var endTime = $("#end_date").attr('endDate');
			laydate({
				elem: '#start_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		$("#start_date").attr("startDate",dates);
					ucInvest.addHtml(userId,sta,dates,endTime,"","");

			  	}
			});
		});
		$(".end_date").on("click",function(){
			var _this = $(this);
			var sta = $(this).parent(".uc_invest_tabR").attr("status");
			var startTime = $("#start_date").attr('startDate');
			laydate({
				elem: '#end_date',
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		$("#end_date").attr("endDate",dates);
					ucInvest.addHtml(userId,sta,startTime,dates,"","");
			  	}
			});
		});
		$(".uc_invest_tabL li").on("click",function(){
			var sta = $(this).attr("status");
			$(".uc_invest_tabR").attr("status",sta);
			$(this).addClass('on').siblings('li').removeClass('on');
			ucInvest.addHtml(userId,sta,"","","","");
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
	}
};
$(function(){
	ucInvest.init();
});