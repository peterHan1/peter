require('page/common/uc-menu/index.js');
require('./uc.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
var _td			= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apiUser 	= require('api/user-api.js');
var _apiReturn 	= require('api/trade-api.js');
var _apiProduct = require('api/product-api.js');
var _apigetOper = require('api/operate-api.js');
var _returnmon 	= require('util/return_date/date_time.js');
var echarts 	= require('util/echarts/echarts.common.min.js');
var returnList 	= require('./returnList.string');
var getUserEch	= require('./getUserEch.string');
var getUsersign	= require('./getUserSign.string');
var getUserInt	= require('./getUserInt.string');
var productList	= require('./productList.string');
var _paging 	= require('util/paging/index.js');


var uc = {
	init : function(){
		var _this = this;
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		_this.signIn(headerData);
		_td.trColor('table_list');
		_this.addMoneyHtml(headerData);
		_this.monthStatus(headerData);
		_this.productUcList(headerData);
	},
	signIn : function(headerData){
		var _this = this;
		_apigetOper.getUserOper(headerData,function(res){
			var day = res.content[0].cumulativeSignTmes;
			if(day == null || day == undefined){
				res.content[0].cumulativeSignTmes = "0";
			}else if(day < 10){
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
			_this.numStatus();
			_this.signInClick(headerData);
			_this.singStatus(headerData);
		},function(err){
			_this.logout(err);
		});
	},
	numStatus : function(){
		$.each($(".p_num"),function(i){
			if($(this).attr("num") <= 0){
				$(this).addClass("num_null");
			}
		});
	},
	singStatus : function(headerData){
		var _this = this;
		_apigetOper.userSign(headerData,function(res){
			var num = res.content.signScore;
			var bool = res.content.ifSign;
			if(bool == true){
				$("#sigin_clik").addClass('sigin_btn_yet');
				$("#sigin_clik").find('span').html("今日已签到，积分+"+num);
			}else{
				$("#sigin_clik").addClass('sigin_clik');
			}
		},
		function(err) {
			_this.logout(err);
		});
	},
	signInClick : function(headerData){
		var _thiss = this;
		// 签到
		$("#sigin_clik").on("click",function(){
			var _this = $(this);
			if($(this).is('.sigin_btn_yet')){
				return false;
			}else{
				_apigetOper.addUserSign(headerData,function(res){
					var num = res.content;
					_thiss.signAnimate(_this,num);
				},function(err){
					layer.msg(err.msg + "签到失败", {
						time: 2000
					});
				});
			};
		});
	},
	signAnimate : function(el,num){
		var day = $(".day2").html()*1 + 1;
		var integral = $(".sign_integral").html()*1 + (num*1);
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
	addMoneyHtml : function(headerData){
		var _this = this;
		_apiReturn.getInvestUc(headerData,function(res){
			var com = res.content;
			var dueInPrincipal = com.totalAwaitCapitalValue;
			var dueInInterest = com.totalAwaitInterestValue;
			var usableFund = com.totalBalanceValue;
			var freezeFund = com.totalFrostValue;
			userEchartHtml = _td.renderHtml(getUserEch,{
				content:com,
			});
			$(".user_earning").html(com.totalEarnings);
			$(".user_await").html(com.totalAwait);
			$(".user_balan").html(com.totalBalance);
			$('.eachart').html(userEchartHtml);
			_this.tipsHover();
			_this.addEchar(dueInPrincipal,dueInInterest,usableFund,freezeFund);
		},function(err){
			_this.logout(err);
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
	monthStatus : function(headerData){
		var _this = this;
		_returnmon.returnMoney();
		var year = $(".f_year").html();
		var month = $(".f_month").html()*1;
		if(month < 10){
			month = "0" + month;
		};
		var dataMonth = year+"-"+month;
		_this.dayStatus(headerData,dataMonth);
		_this.getMoney(headerData,dataMonth);
		_this.getReturnList(headerData,dataMonth,1,4,1);
		_returnmon.clickMontn({
			left: "data_top_btn_l",
			right: "data_top_btn_r",
			callback: function(yy,mm) {
				if(mm < 10){
					mm = "0" + mm;
				};
				dataMonth = yy+"-"+mm;
				_this.dayStatus(headerData,dataMonth);
				_this.getMoney(headerData,dataMonth);
				_this.getReturnList(headerData,dataMonth,1,4,1);
				_this.dayContent(headerData);
			}
		});
		_this.dayContent(headerData);
	},
	// 点击某天的信息展示
	dayContent : function(headerData){
		var _this = this;
		_returnmon.clickDay({
			elm: "data_number",
			callback: function(day) {
				var getday = day;
				_this.getReturnList(headerData,getday,0,4,1);
			}
		});
	},
	// 获取本息
	getMoney : function(headerData,month){
		var _this = this;
		_apiReturn.getMonthMoney(headerData,month,function(res){
			$(".re_money").html(res.content);
		},function(err){
			_this.logout(err);
		});
	},
	// 给当月某天有回款的添加样式
	dayStatus : function(headerData,month){
		var _this = this;
		_apiReturn.getMonth(headerData,month,function(res){
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
		},function(err){
			_this.logout(err);
		});
	},
	getReturnList : function(headerData,day,type,pagesize,current){
		var _this = this;
		_apiReturn.getRturnList(headerData,day,type,pagesize,current,function(res){
			_this.setType(res);
			retList = _td.renderHtml(returnList,{
				list:res.content.list,
			});
			$('.re_money_tbody').html(retList);
			_paging.paging("pageList",res.content.total,pagesize,function(e){
				_apiReturn.getRturnList(headerData,day,type,pagesize,e.current,function(res){
					_this.setType(res);
					retList = _td.renderHtml(returnList,{
						list:res.content.list,
					});
					$('.re_money_tbody').html(retList);
					_this.tipsHover();
					_td.trColor('table_list');
				},function(err){
					console.log(err);
				});
			});
			_this.tipsHover();
			_td.trColor('table_list');
		},function(err){
			_this.logout(err);
		});
	},
	productUcList: function(headerData){
		var _this = this;
		_apiProduct.getProductUcList(headerData,function(res){
			paoductHtml = _td.renderHtml(productList,{
				planOut:res.content.planOut,
				borrowOut:res.content.borrowOut,
			});
			$(".productHt").html(paoductHtml);
			_this.recommend();
		},function(err){
			console.log(err);
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
	recommend : function(){
		$('.recommends_list li').hover(function(){
			var type = $(this).attr("type");
			if(type == 1){
				var htm = '<div class="now_invest">立即加入</div>';
			}else{
				var htm = '<div class="now_invest">立即投资</div>';
			}
			$(this).find('.pro_list').append(htm);
		},function(){
			$(this).find('.now_invest').remove();
		});
	},
	logout: function(err){
		if(err.code == 100105){
			_td.doLogin();
		}else{
			console.log(err);
		}
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
		});
	}
};
$(function(){
	uc.init();
});
