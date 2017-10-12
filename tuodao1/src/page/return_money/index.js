require('util/return_date/date_time.js');
require('./return_money.scss');
require('./js/laydate/laydate.scss');
require('./js/laydate/laydate.js');
// 选择时间调用日历
$(".layer_date").on("click",function(){
	laydate({
		format: 'YYYY-MM-DD',
		// 选择时间后回调
	 	choose: function(dates){
	 		console.log(dates);
	  	}
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
				var tr = "<tr><td>"+ getMoth(parseInt(item.time)) +"</td><td>"+item.name+"</td><td>"+item.periods+"</td><td>"+item.type+"</td><td>"+item.money+"</td><td>"+item.status+"</td></tr>";
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
		var tr = "<tr><td colspan='6'>当前没有回款信息</td></tr>";
		$(".re_money_tbody").html(tr);
		$(".re_money_await").html("0.00");
		$(".re_money_yet").html("0.00");
	}
	// }
	// });
};
window.time_day = function(ht_html,zero,mid){
	// $.ajax({
	// 	url: 'time.json',
	// 	dataType: "json",
	// 	type: 'get',
	// 	success:function(data){
	$.each(dataTxt,function(i,item){
		if(item.time >=  zero && item.time <= mid){
			var tr = "<tr><td>"+ getMoth(parseInt(this.time)) +"</td><td>"+this.name+"</td><td>"+this.periods+"</td><td>"+this.type+"</td><td>"+this.money+"</td><td>"+this.status+"</td></tr>";
			$(".re_money_tbody").append(tr);
			$(".re_money_await").html(this.await);
			$(".re_money_yet").html(this.yet);
		};
	});
	if(!$('.re_money_tbody tr').html()){
		var tr = "<tr><td colspan='6'>当前没有回款信息</td></tr>";
		$(".re_money_tbody").html(tr);
		$(".re_money_await").html("0.00");
		$(".re_money_yet").html("0.00");
	}
	// }
	// });
};
function getMoth(str){
	var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
	return oTime;
};

var dataTxt = [
	{"name":"梅德赛斯奔驰s601","await":"1,000.00","yet":"1,111.00","time":"1507824000000","type":"收益","status":"待回款","periods":"1/6","money":"500.00"},
	{"name":"梅德赛斯奔驰s602","await":"1,000.00","yet":"1,111.00","time":"1507910400000","type":"本息","status":"待回款","periods":"1/1","money":"100.00"},
	{"name":"梅德赛斯奔驰s603","await":"1,000.00","yet":"1,111.00","time":"1507914000000","type":"本息","status":"已回款","periods":"1/5","money":"200.00"},
	{"name":"梅德赛斯奔驰s604","await":"5555.00","yet":"2,222.00","time":"1507932360000","type":"收益","status":"待回款","periods":"-","money":"300.00"},
	{"name":"梅德赛斯奔驰s605","await":"6,666.00","yet":"3,333.00","time":"1508504760000","type":"收益","status":"已回款","periods":"1/7","money":"400.00"},
	{"name":"梅德赛斯奔驰s606","await":"888.00","yet":"4,444.00","time":"1508292610000","type":"本息","status":"待回款","periods":"1/8","money":"500.00"},
	{"name":"梅德赛斯奔驰s607","await":"88,888.00","yet":"5,555.00","time":"1508299810000","type":"收益","status":"已回款","periods":"1/8","money":"600.00"},
	{"name":"梅德赛斯奔驰s608","await":"6,6688.00","yet":"6,666.00","time":"1509318610000","type":"本息","status":"待回款","periods":"1/8","money":"700.00"},
	{"name":"梅德赛斯奔驰s609","await":"1000.00","yet":"7,777.00","time":"1510355410000","type":"收益","status":"已回款","periods":"1/8","money":"800.00"},
	{"name":"梅德赛斯奔驰s700","await":"2000.00","yet":"8,888.00","time":"1513033810000","type":"收益","status":"待回款","periods":"1/8","money":"900.00"},
	{"name":"梅德赛斯奔驰s701","await":"1111.00","yet":"6666.00","time":"1507590610000","type":"收益","status":"待回款","periods":"1/8","money":"900.00"},
	{"name":"梅德赛斯奔驰s800","await":"687,000.00","yet":"9,999.00","time":"1509379200000","type":"本息","status":"已回款","periods":"1/8","money":"666.00"},
	{"name":"梅德赛斯奔驰s900","await":"10,000.00","yet":"1,111.00","time":"1503158400000","type":"收益","status":"待回款","periods":"1/8","money":"111.00"},
	{"name":"梅德赛斯奔驰s666","await":"10,000.00","yet":"666.00","time":"1516377600000","type":"收益","status":"待回款","periods":"1/9","money":"222.00"}
];