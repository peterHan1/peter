require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/laydate/index.js');

var _tips 		= require('util/tips/index.js');
var _td 		= require('util/td.js');
var _paging 	= require('util/paging/index.js');
var _apiInvest 	= require('api/trade-api.js');
var investSift 	= require('./Invest_sift.string');
var investSiftnull 	= require('./Invest_siftnull.string');

var ucInvest = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		this.eventFn(headerData);
		this.addHtml(headerData,"1","","",10,1);
	},
	addHtml : function(headerData,sta,startime,endtime,pagesize,current){
		_apiInvest.getSift(headerData,sta,startime,endtime,pagesize,current,function(res){
			if(res.content == null){
				listnullHtml = _td.renderHtml(investSiftnull);
				$(".table_list").html(listnullHtml);
			}else{
				ucInvest.setSta(res);
				listSiftHtml = _td.renderHtml(investSift,{
					list:res.content.list,
				});
				$(".table_list").html(listSiftHtml);
				ucInvest.setShow("td_sta");
				_paging.paging("pageList",res.content.total,10,function(e){
					_apiInvest.getSift(headerData,sta,startime,endtime,pagesize,e.current,function(res){
						listSiftHtml = _td.renderHtml(investSift,{
							list:res.content.list,
						});
						$(".table_list").html(listSiftHtml);
						ucInvest.tipsHover();
						ucInvest.trColor();
					});
				});
				ucInvest.tipsHover();
				ucInvest.trColor();
			}
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
	eventFn : function(headerData){
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
					ucInvest.addHtml(headerData,sta,dates,endTime,10,1);
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
					ucInvest.addHtml(headerData,sta,startTime,dates,10,1);
			  	}
			});
		});
		$(".uc_invest_tabL li").on("click",function(){
			var sta = $(this).attr("status");
			$(".uc_invest_tabR").attr("status",sta);
			$(this).addClass('on').siblings('li').removeClass('on');
			ucInvest.addHtml(headerData,sta,"","",10,1);
		});
	},
	dataNull : function(el,num,str){
		var datanull = '<tr class="null_data"><td colspan='+num+'><div class="null_data_bg"></div><p>'+str+'</p></td></tr>';
		$("."+el).html(datanull);
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