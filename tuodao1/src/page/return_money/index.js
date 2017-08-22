var a = require('./js/date_time.js');
require('./return_money.scss');
require('./js/laydate/laydate.scss');
require('./js/laydate/laydate.js');
var config = require('./js/time.json');

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
	$.each(config,function(i,item){
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
	$.each(config,function(i,item){
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

