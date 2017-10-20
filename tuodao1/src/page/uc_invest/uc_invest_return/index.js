require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
var _tips = require('util/tips/index.js');
require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('util/return_date/date_time.js');
require('util/paging/page.scss');
require('util/paging/page.js');
$(function(){
	var trs=document.getElementById("tbody_list").getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++){
		if(i%2==0){
			trs[i].className +=" trColor";
		}
	};
	$(".return_td_name").mouseover(function(){
		_tips.getTipsRight($(this),15);
	});
	$(".return_td_name").mouseout(function(){
		$(this).find('.tips').hide();
	});
});
// 回款日历两个加载函数
window.time_list = function(yyyy,mm){
	// $.ajax({
	// 	url: './time.json',
	// 	dataType: "json",
	// 	type: 'get',
	// 	success:function(data){
	$(".re_money_tbody").empty();
	$.each(dataTxt,function(i,item){
		var todays = new Date().setHours(0,0,0,0);
		var time = parseInt(item.time);
		var times =  new Date(time);
		var msec = times.getTime();
		if( times.getFullYear() == yyyy){
			if( (times.getMonth()+1 ) == mm){
				var tr ='<tr><td class="padd_left">'+ getMoth(parseInt(item.time)) +'</td><td class="return_td_name"><a href="">'+item.name+'</a><div class="tips left-tips">'+item.name+'</div></td><td class="return_td_periods">'+item.periods+'</td><td class="return_td_type">'+item.type+'</td><td class="return_td_money">'+item.money+'元</td><td class="'+item.status+'">'+getStatus(item.status)+'</td></tr>';
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
		$(".re_money_null").html(htm);
		$(".re_money").html("0.00");
	}else{
		$(".return_noData").remove();
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
};
window.time_day = function(ht_html,zero,mid,thisy,thism,thisd){
	// $.ajax({
	// 	url: 'time.json',
	// 	dataType: "json",
	// 	type: 'get',
	// 	success:function(data){
	$.each(dataTxt,function(i,item){
		if(item.time >=  zero && item.time <= mid){
			var tr ='<tr><td class="padd_left">'+ getMoth(parseInt(item.time)) +'</td><td class="return_td_name"><a href="">'+item.name+'</a><div class="tips left-tips">'+item.name+'</div></td><td class="return_td_periods">'+item.periods+'</td><td class="return_td_type">'+item.type+'</td><td class="return_td_money">'+item.money+'元</td><td class="'+item.status+'">'+getStatus(item.status)+'</td></tr>';
			$(".re_money_tbody").append(tr);
			$(".re_money").html(this.await);
		};
	});
	if(!$('.re_money_tbody tr').html()){
		var dates = thisy+'年'+thism+'月'+thisd+'日';
		var htm = '<div class="return_noData"><div class="return_noData_bg"></div><p>'+dates+'没有回款信息</p></div>';
		// var tr = "<tr><td colspan='4'>当前没有回款信息666</td></tr>";
		$(".re_money_null").html(htm);
		$(".re_money").html("0.00");
	}else{
		$(".return_noData").remove();
	}
	// }
	// });
};
function getMoth(str){
	var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
	return oTime;
};
function getStatus(str){
	if(str == "return_money"){
		var status = "已回款";
		return status;
	}else if(str = "underway_money"){
		var status = "待回款";
		return status;
	}
}
var dataTxt = [
	{"name":"梅德赛斯奔驰s601","await":"1,000.00","yet":"1,111.00","time":"1507601410000","type":"收益","status":"return_money","periods":"1/6","money":"500.00"},
	{"name":"梅德赛斯奔驰s602","await":"1,000.00","yet":"1,111.00","time":"1510366210000","type":"本息","status":"underway_money","periods":"1/1","money":"100.00"},
	{"name":"梅德赛斯奔驰s603","await":"1,000.00","yet":"1,111.00","time":"1506823810000","type":"本息","status":"return_money","periods":"1/5","money":"200.00"},
	{"name":"梅德赛斯奔驰s604","await":"5555.00","yet":"2,222.00","time":"1513051930000","type":"收益","status":"underway_money","periods":"-","money":"300.00"},
];