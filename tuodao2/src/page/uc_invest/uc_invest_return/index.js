require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');

var _tips 		= require('util/tips/index.js');
var _returnmon 	= require('util/return_date/date_time.js');
var _td 		= 	require('util/td.js');
var _apiReturn 	= 	require('api/trade-api.js');
var returnList 	= 	require('./returnList.string');

var ucInvest = {
	init : function(){
		this.sumMoney();
		this.monthStatus();
	},

	// 待收总额
	sumMoney : function(){
		_apiReturn.getsumMoney(function(res){
			$(".sum_money").html(res.content);
		},function(){
			console.log("请求失败");
		});
	},
	// 月份日期状态
	monthStatus : function(){
		_returnmon.returnMoney();
		var year = $(".f_year").html();
		var month = $(".f_month").html();
		var dataMonth = year+"-"+month;
		console.log("初始化 年-月：" + dataMonth);
		ucInvest.dayStatus();
		ucInvest.getMoney(1,1);
		ucInvest.getReturnList(dataMonth,1,5,1);
		_returnmon.clickMontn({
			left: "data_top_btn_l",
			right: "data_top_btn_r",
			callback: function(yy,mm) {
				dataMonth = yy+"-"+mm;
				console.log("点击后 年-月：" + dataMonth);
				ucInvest.dayStatus();
				ucInvest.getMoney(1,1);
				ucInvest.getReturnList(dataMonth,1,5,1);
				ucInvest.dayContent();
			}
		});
		ucInvest.dayContent();
	},
	// 点击某天的信息展示
	dayContent : function(){
		_returnmon.clickDay({
			elm: "data_number",
			callback: function(day) {
				var getday = day;
				ucInvest.getMoney(getday,0);
				ucInvest.getReturnList(getday,1,5,1);
			}
		});
	},
	// 获取本息
	getMoney : function(day,type){
		_apiReturn.getMoney(day,type,function(res){
			$(".per_money").html(res.content.preCollection);
			$(".real_money").html(res.content.realCollection);
		},function(){
			console.log("请求失败");
		});
	},
	// 给当月某天有回款的添加样式
	dayStatus : function(){
		_apiReturn.getMonth(function(res){
			$.each(res.content,function(i,key){
				var day = key.day;
				var status = key.status;
				var clas = "";
				if(status == 0){
					clas = "await_money";
				}else{
					clas = "yet_money";
				}
				$(".data_table .data_number").eq(day-1).addClass(clas);

			});
		},function(){
			console.log("请求失败");
		});
	},
	getReturnList : function(day,type,pagesize,current){
		_apiReturn.getRturnList(day,type,pagesize,current,function(res){
			ucInvest.setType(res);
			retList = _td.renderHtml(returnList,{
				list:res.content.list,
			});
			$('#tbody_list').html(retList);
			ucInvest.setStatus();
			_apiReturn.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiReturn.getRturnList(day,type,pagesize,current,function(res){
					ucInvest.setType(res);
					retList = _td.renderHtml(returnList,{
						list:res.content.list,
					});
					$('#tbody_list').html(retList);
					ucInvest.setStatus();
					ucInvest.tipsHover();
					ucInvest.trColor();
				},function(){
					console.log("请求失败");
				});
			});
			ucInvest.tipsHover();
			ucInvest.trColor();
		},function(){
			console.log("请求失败");
		});
	},
	// 回款类型
	setType: function(res){
		var resList = res.content.list;
		// 剩余期限单位
		$.each(resList,function(i){
			if(resList[i].type == "0"){
				resList[i].type = "本息";
			}else if(resList[i].type == "1"){
				resList[i].type = "收益";
			}
		});
	},
	setStatus : function(){
		$.each($(".return_td_status"),function(i){
			var sta = $(this).attr("status");
			if(sta == "0"){
				$(this).addClass("underway_money");
				$(this).html("未回款");
			}else if(sta == "1"){
				$(this).addClass("return_money");
				$(this).html("已回款");

			}
		});
	},
	sumMoney : function(){
		_apiReturn.getsumMoney(function(res){
			$(".sum_money").html(res.content);
		},function(){
			console.log("请求失败");
		});
	},
	tipsHover : function(){
		$(".return_td_name").mouseover(function(){
			_tips.getTipsRight($(this),15);
		});
		$(".return_td_name").mouseout(function(){
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
