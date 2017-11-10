require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/laydate/index.js');

var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging		= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var investSift 	= require('./Invest_scatter.string');

var ucInvest = {
	init : function(){
		this.eventFn();
		this.addHtml("","","","","");
	},
	addHtml : function(sta,startime,endtime,pagesize,current){
		_apiInvest.getScstter(sta,startime,endtime,pagesize,current,function(res){
			// if(res.content != null){
				console.log(res);
				ucInvest.resStatus(res);
				listSiftHtml = _td.renderHtml(investSift,{
					list:res.content.list,
				});
				$("#tbody_list").html(listSiftHtml);
				ucInvest.setShow("coupon_con");
				_paging.paging("pageList",res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
					_apiInvest.getScstter(sta,startime,endtime,pagesize,e.current,function(res){
						ucInvest.resStatus(res);
						listSiftHtml = _td.renderHtml(investSift,{
							list:res.content.list,
						});
						$("#tbody_list").html(listSiftHtml);
						ucInvest.setShow("coupon_con");
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
	resStatus : function(res){
		var resList = res.content.list;
		// 状态
		$.each(resList,function(i){
			if(resList[i].status == 1){
				resList[i].status = "募集中";
			}else  if(resList[i].status == 2){
				resList[i].status = "待回款";
			}else if(resList[i].status == 5){
				resList[i].status = "已回款";
			}
		});
	},
	setShow : function(el){
		var tdList = $("."+el);
		$.each(tdList,function(i){
			var ht = $(this).html();
			if(ht == 1){
				$(this).html("抵用券");
				$(this).siblings(".unit").html("元");
			}else if(ht == 2){
				$(this).html("加息券");
				$(this).siblings(".unit").html("%");
			}else if(ht == 0){
				$(this).parent("td").html("-");
			}
		});
	},
	eventFn : function(){
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
					ucInvest.addHtml(sta,dates,endTime,"","");

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
					ucInvest.addHtml(sta,startTime,dates,"","");
			  	}
			});
		});
		$(".uc_invest_tabL li").on("click",function(){
			var sta = $(this).attr("status");
			$(this).addClass('on').siblings('li').removeClass('on');
			ucInvest.addHtml(sta,"","","","");

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