require('./uc.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');

var _td			= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apigetuc 	= require('api/user-api.js');
var _returnmon 	= require('util/return_date/date_time.js');
var echarts 	= require('util/echarts/echarts.common.min.js');
var getUserMon	= require('./getUserMon.string');
var getUserEch	= require('./getUserEch.string');


var uc = {
	init : function(){
		this.signIn();
		this.trColor();
		this.recommend();
		this.returnMon();
		this.addHtml();
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
	},
	signIn : function(){
		// 签到
		$("#sigin_clik").on("click",function(){
			if($(this).is('.sigin_btn_yet')){
				return false;
			}else{
				var day = parseInt($(".day2").html())+1;
				var integral = parseInt($(".sign_integral").html())+1;
				if (day < 10) {
					day = "0"+day;
				}
				$(".sign_integral").html(integral);
				$(this).removeClass('sigin_clik');
				$(this).addClass('sigin_btn_yet');
				$(this).find('span').html("今日已签到，积分+6");
				$(".animat").animate({top:'-200px'},function(){
					$(".animat").remove();
				});
				$(".day1").fadeOut();
				$(".day2").fadeIn();
				$(".day2").html(day);
				$(".day").animate({marginTop:'-80px'},function(){
					$(".day").css("marginTop","0");
				});
			};
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
	// 回款日历加载函数
	returnMon : function(){
		_returnmon.returnMoney(function(yyyy,mm){
			// $.ajax({
			// 	url: './time.json',
			// 	dataType: "json",
			// 	type: 'get',
			// 	success:function(data){
			$(".re_money_tbody").empty();
			$.each(dataTxt,function(i,item){
				var todays = new Date().setHours(0,0,0,0);
				var tim = (item.reutrnDate)*1;
				var times =  new Date(tim);
				var msec = times.getTime();
				if( times.getFullYear() == yyyy){
					if( (times.getMonth()+1 ) == mm){
						var tr ='<tr><td class="return_td_date">'+ getMoth((item.reutrnDate)*1) +'</td><td class="return_td_name"><a href="">'+item.name+'</a></td><td class="return_td_type">'+item.type+'</td><td class="return_td_money">'+item.money+'元</td></tr>';
						$(".re_money_tbody").append(tr);
						if(msec >= todays){
							var today = times.getDate();
							var lastNum = $(".data_lastMonth").length;
							$(".data_table .data_table_td").eq(today+lastNum-1).addClass("await_money");
						}else{
							var today = times.getDate();
							var lastNum = $(".data_lastMonth").length;
							$(".data_table .data_table_td").eq(today+lastNum-1).addClass("yet_money");
						}
					}
				};
			});
			if(!$('.re_money_tbody tr').html()){
				var dates = yyyy+'年'+mm+'月';
				var htm = '<div class="return_noData"><div class="return_noData_bg"></div><p>'+dates+'没有回款信息</p></div>';
				$(".re_money_tbody").html(htm);
				$(".re_money").html("0.00");
			}
			// 得到总页数
			$(".zxf_pagediv").createPage({
				// 页数
				pageNum: 2,
				// 当前页
				current: 1,
				// 显示条数
				shownum: 10,
				backfun: function(e) {
					console.log(e.current);
					// $("#data-container").html(thisDate(e.current));
				}
			});
			// }
			// });
		},function(ht_html,zero,mid,thisy,thism,thisd){
			// $.ajax({
			// 	url: 'time.json',
			// 	dataType: "json",
			// 	type: 'get',
			// 	success:function(data){
			$.each(dataTxt,function(i,item){
				if(item.reutrnDate >=  zero && item.reutrnDate <= mid){
					var tr ='<tr><td class="return_td_date">'+ getMoth((item.reutrnDate)*1) +'</td><td class="return_td_name"><a href="">'+item.name+'</a></td><td class="return_td_type">'+item.type+'</td><td class="return_td_money">'+item.money+'元</td></tr>';
					$(".re_money_tbody").append(tr);
					$(".re_money").html(this.await);
				};
			});
			if(!$('.re_money_tbody tr').html()){
				var dates = thisy+'年'+thism+'月'+thisd+'日';
				var htm = '<div class="return_noData"><div class="return_noData_bg"></div><p>'+dates+'没有回款信息</p></div>';
				// var tr = "<tr><td colspan='4'>当前没有回款信息666</td></tr>";
				$(".re_money_tbody").html(htm);
				$(".re_money").html("0.00");
			}
			// }
			// });
		});
		function getMoth(str){
			var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
			return oTime;
		};
	},
	addHtml : function(){
		var userId=document.cookie.split(";")[0].split("=")[1];
		var userData = {
			userId : "18539123451-lwvm5mx68dr2wxzqgnuc",
			loginPassword:"e10adc3949ba59abbe56e057f20f883e",
			loginSource:1

		};
		_apigetuc.getUser(userData,function(res){
			var dueInPrincipal = res.content.dueInPrincipal;
			var dueInInterest = res.content.dueInInterest;
			var usableFund = res.content.usableFund;
			var freezeFund = res.content.freezeFund;
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