require('./uc.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td			= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apigetuc 	= require('api/user-api.js');
var _apiReturn 	= require('api/trade-api.js');
var _apigetOper = require('api/operationCenter-api.js');
var _returnmon 	= require('util/return_date/date_time.js');
var echarts 	= require('util/echarts/echarts.common.min.js');
var returnList 	= require('./returnList.string');
var getUserMon	= require('./getUserMon.string');
var getUserEch	= require('./getUserEch.string');
var getUsersign	= require('./getUserSign.string');
var getUserInt	= require('./getUserInt.string');
var _paging 	= require('util/paging/index.js');


var uc = {
	init : function(){
		this.signIn();
		this.trColor();
		this.recommend();
		this.addMoneyHtml();
		this.monthStatus();
	},
	signIn : function(){
		_apigetOper.getUserOper(function(res){
			var day = res.content[0].cumulativeSignTmes;
			if(day < 10){
				res.content[0].cumulativeSignTmes = "0"+day;
			};
			userSigntHtml = _td.renderHtml(getUsersign,{
				content:res.content,
			});
			userIntHtml = _td.renderHtml(getUserInt,{
				content:res.content,
			});
			$('.sign').html(userSigntHtml);
			$('.welfare').html(userIntHtml);
			uc.numStatus();
			uc.signInClick();
			uc.singStatus();
		},function(){
			console.log("请求失败");
		});
	},
	numStatus : function(){
		$.each($(".p_num"),function(i){
			if($(this).attr("num") == 0){
				$(this).addClass("num_null");
			}
		});
	},
	singStatus : function(){
		_apigetOper.userSign(function(res){
			var num = res.content.signScore;
			var bool = res.content.ifSign;
			if(bool == true){
				$("#sigin_clik").addClass('sigin_btn_yet');
				$("#sigin_clik").find('span').html("今日已签到，积分+"+num);
				
			}else{
				$("#sigin_clik").addClass('sigin_clik');
			}
		},
		function() {
			console.log("请求失败");
		});
	},
	signInClick : function(){
		// 签到
		$("#sigin_clik").on("click",function(){
			var _this = $(this);
			if($(this).is('.sigin_btn_yet')){
				return false;
			}else{
				_apigetOper.userSign(function(res){
					var num = res.content.signScore;
					uc.signAnimate(_this,num);
				},function(){
					console.log("签到失败");
				});
			};
		});
	},
	signAnimate : function(el,num){
		var day = parseInt($(".day2").html())+1;
		var integral = parseInt($(".sign_integral").html()) + (num*1);
		if (day < 10) {
			day = "0" + day;
		}
		$(".sign_integral").html(integral);
		el.removeClass('sigin_clik');
		el.addClass('sigin_btn_yet');
		el.find('span').html("今日已签到，积分+"+num);
		$(".animat").animate({
			top: '-200px'
		}, function() {
			$(".animat").remove();
		});
		$(".day1").fadeOut();
		$(".day2").fadeIn();
		$(".day2").html(day);
		$(".day").animate({
			marginTop: '-80px'
		}, function() {
			$(".day").css("marginTop", "0");
		});
	},
	addMoneyHtml : function(){
		var userId=document.cookie.split(";")[0].split("=")[1];
		var userData = {
			userId : "18539123451-lwvm5mx68dr2wxzqgnuc",
			loginPassword:"e10adc3949ba59abbe56e057f20f883e",
			loginSource:1

		};
		_apiReturn.getInvestUc(function(res){
			console.log(res);
			var dueInPrincipal = res.content.totalAwaitCapitalValue;
			var dueInInterest = res.content.totalAwaitInterestValue;
			var usableFund = res.content.totalBalanceValue;
			var freezeFund = res.content.totalFrostValue;
			userMoneyHtml = _td.renderHtml(getUserMon,{
				content:res.content,
			});
			userEchartHtml = _td.renderHtml(getUserEch,{
				content:res.content,
			});
			$('.getUserMo').html(userMoneyHtml);
			$('.eachart').html(userEchartHtml);
			uc.tipsHover();
			uc.addEchar(dueInPrincipal,dueInInterest,usableFund,freezeFund);
		},function(){
			console.log("请求失败");
		});
	},
	addEchar : function(dueInPrincipal,dueInInterest,usableFund,freezeFund){
		var myChart = echarts.init(document.getElementById('eachart_main'));
		var nameM = ['待收本金','待收利息','可用余额','冻结金额'];
		var dataM = [dueInPrincipal,dueInInterest,usableFund,freezeFund];
		var option = {
		    legend: {
				orient: 'vertical',
				top:'100',
				x: 'right',
				align:'left',
				itemHeight:'25',
				data:nameM
			},
			color:['#ff9691', '#87da87','#56c1f2','#fccd6e'],
			series: [
				{
					type:'pie',
					radius: ['100%', '90%'],
					legendHoverLink:false,
					avoidLabelOverlap: false,
					hoverAnimation:false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:dataM
				}
			]
		};
		myChart.setOption(option);
	},
	// 月份日期状态
	monthStatus : function(){
		_returnmon.returnMoney();
		var year = $(".f_year").html();
		var month = $(".f_month").html();
		var dataMonth = year+"-"+month;
		console.log("初始化 年-月：" + dataMonth);
		uc.dayStatus();
		uc.getMoney(1,1);
		uc.getReturnList(dataMonth,1,5,1);
		_returnmon.clickMontn({
			left: "data_top_btn_l",
			right: "data_top_btn_r",
			callback: function(yy,mm) {
				dataMonth = yy+"-"+mm;
				console.log("点击后 年-月：" + dataMonth);
				uc.dayStatus();
				uc.getMoney(1,1);
				uc.getReturnList(dataMonth,1,5,1);
				uc.dayContent();
			}
		});
		uc.dayContent();
	},
	// 点击某天的信息展示
	dayContent : function(){
		_returnmon.clickDay({
			elm: "data_number",
			callback: function(day) {
				var getday = day;
				uc.getMoney(getday,0);
				uc.getReturnList(getday,1,5,1);
			}
		});
	},
	// 获取本息
	getMoney : function(day,type){
		_apiReturn.getMoney(day,type,function(res){
			$(".re_money").html(res.content.preCollection);
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
			uc.setType(res);
			retList = _td.renderHtml(returnList,{
				list:res.content.list,
			});
			$('.re_money_tbody').html(retList);
			_paging.paging("pageList",res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiReturn.getRturnList(day,type,pagesize,current,function(res){
					uc.setType(res);
					retList = _td.renderHtml(returnList,{
						list:res.content.list,
					});
					$('.re_money_tbody').html(retList);
					uc.tipsHover();
					uc.trColor();
				},function(){
					console.log("请求失败");
				});
			});
			uc.tipsHover();
			uc.trColor();
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
	trColor : function(){
		trColor('table_list');
		// 各行变色
		function trColor(id){
			var trs=document.getElementById(id).getElementsByTagName("tr");
			for(var i=0;i<trs.length;i++){
				if(i%2==0){
					trs[i].className +=" trColor";
				}
			};
		}
	},
	recommend : function(){
		$('.recommends_list li').hover(function(){
			var html = '<div class="now-invest">立即加入</div>';
			$(this).find('.pro-list').append(html);
		},function(){
			$(this).find('.now-invest').remove();
		});
	},
	tipsHover : function(){
		$(".hint").mouseover(function(){
			_tips.getTipsRight($(this),0);
		});
		$(".hint").mouseout(function(){
			$(this).find('.tips').hide();
		});
		$(".hint_sign").mouseover(function(){
			var _tips = $(this).find('.tips');
			var jtHtml = '<span class="b"></span><span class="t"></span>';
			_tips.append(jtHtml);
			_tips.show();
			_tips.css({'margin-top':-23+'px','margin-left':-200+'px'});

		});
		$(".hint_sign").mouseout(function(){
			$(this).find('.tips').hide();
			// $(".tips").find("span").remove();
		});
	}
};
$(function(){
	uc.init();
});

var dataTxt = [
	{"name":"梅德赛斯奔驰s601","await":"1,000.00","yet":"1,111.00","reutrnDate":"1507601410000","type":"收益","status":"已回款","periods":"1/6","money":"500.00"},
	{"name":"梅德赛斯奔驰s602","await":"1,000.00","yet":"1,111.00","reutrnDate":"1510366210000","type":"本息","status":"待回款","periods":"1/1","money":"100.00"},
	{"name":"梅德赛斯奔驰s603","await":"1,000.00","yet":"1,111.00","reutrnDate":"1506823810000","type":"本息","status":"已回款","periods":"1/5","money":"200.00"},
	{"name":"梅德赛斯奔驰s604","await":"5555.00","yet":"2,222.00","reutrnDate":"1513051930000","type":"收益","status":"待回款","periods":"-","money":"300.00"},
];