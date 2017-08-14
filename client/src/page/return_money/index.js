require('./return_money.css');
var config = require('./time.json');

function time_list(yyyy,mm){
// $.ajax({
// url: './time.json',
// dataType: "json",
// type: 'get',
// success:function(data){
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
function time_day(ht_html,zero,mid){
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


var date = '<div><div class="account_title"><div class="data_top"><div class="data_top_btn data_top_btn_l fl">&lt;</div><div class="fl data_top_datas"><span class="f_year"></span>年<span class="f_month"></span>月</div><div class="data_top_btn data_top_btn_r fr">&gt;</div></div></div><div class="data_table"><div class="celarfix"><div class="data_table_th">日</div><div class="data_table_th">一</div><div class="data_table_th">二</div><div class="data_table_th">三</div><div class="data_table_th">四</div><div class="data_table_th">五</div><div class="data_table_th">六</div><div class="clear"></div></div><div class="data_tbody clearfix"></div></div><div class="datas_title"><span><i class="red_dot"></i>有待回款项目</span><span><i class="gray_dot"></i>有已回款项目</span></div></div>';
$(".account_box").append(date);
console.log(666);
// 页面加载初始化年月
var mydate = new Date();
$(".f_year,.re_money_y").html( mydate.getFullYear() );
$(".f_month,.re_money_m").html( mydate.getMonth()+1 );
showDate(mydate.getFullYear(),mydate.getMonth()+1);

// 日历上一月
$(".data_top_btn_l ").click(function(){
	var mm = parseInt($(".f_month").html());
	var yy = parseInt($(".f_year").html());
	if( mm == 1){
		// 返回12月
		$(".f_year,.re_money_y").html(yy-1);
		$(".f_month,.re_money_m").html(12);
		$(".re_money_d").html(" ");
		showDate(yy-1,12);
	}else{
		// 上一月
		$(".f_month,.re_money_m").html(mm-1);
		$(".re_money_d").html(" ");
		showDate(yy,mm-1);
	}
});
// 日历下一月
$(".data_top_btn_r").click(function(){
	var mm = parseInt($(".f_month").html());
	var yy = parseInt($(".f_year").html());
	if( mm == 12){
		//	返回12月
		$(".f_year,.re_money_y").html(yy+1);
		$(".f_month,.re_money_m").html(1);
		$(".re_money_d").html(" ");
		showDate(yy+1,1);
	}else{
		// 上一月
		$(".f_month,.re_money_m").html(mm+1);
		$(".re_money_d").html(" ");
		showDate(yy,mm+1);
	}
});
// 读取年月写入日历
function showDate(yyyy,mm){
	var mydate = new Date();
	var y = mydate.getFullYear();
	var m = mydate.getMonth()+1;
	var dd = new Date(parseInt(yyyy),parseInt(mm), 0);
	var daysCount = dd.getDate();
	var mystr ="";
	var today = new Date().getDate();
	var monthstart = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/1").getDay();
	var lastMonth;
	var nextMounth;
	if(  parseInt(mm) ==1 ){
		lastMonth = new Date(parseInt(yyyy)-1,parseInt(12), 0).getDate();
	}else{
		lastMonth = new Date(parseInt(yyyy),parseInt(mm)-1, 0).getDate();
	}
	if( parseInt(mm) ==12 ){
		nextMounth = new Date(parseInt(yyyy)+1,parseInt(1), 0).getDate();
	}else{
		nextMounth = new Date(parseInt(yyyy),parseInt(mm)+1, 0).getDate();
	}
	// 计算上月空格数
	for(j=monthstart;j>0;j--){
		mystr += "<div class='data_table_td data_null data_lastMonth' style='color:#ccc;'>"+(lastMonth-j+1)+"</div>";
	}

	// 本月单元格
	for(i=0;i<daysCount;i++){
		mystr += "<div class='data_table_td data_number'><span class='data_day'>"+(i+1)+"</span></div>";
	}

	// 计算下月空格数
	for(k=0; k<42-(daysCount+monthstart);k++ ){
		mystr += "<div class='data_table_td data_null data_nextMounth' style='color:#ccc;'>"+(k+1)+"</div>";
	}

	// 写入日历
	$(".data_table .data_tbody").html(mystr);
	// 给今日加class
	if( mydate.getFullYear() == yyyy){
		if( (mydate.getMonth()+1 ) == mm){
			var today = mydate.getDate();
			var lastNum = $(".data_lastMonth").length;
			$(".data_table .data_table_td").eq(today+lastNum-1).addClass("datas_on");
		}
	}
	// 有回款的日期添加list
	time_list(yyyy,mm);

	// 绑定选择方法
	$(".data_table .data_number").off("click");
	$(".data_table .data_number").on("click",function(){
		$(".data_table .data_number").removeClass("datas_on");
		$(this).addClass("datas_on");
		var thisy = $(".f_year").html();
		var thism = $(".f_month").html();
		var thisd = $(this).find('span').html();
		$(".re_money_d").html(thisd+'日');
		var ht_html = thisy +'/'+ thism +'/'+ thisd;
		var zero = new Date(ht_html+' 00:00:00').getTime();
		var mid = new Date(ht_html+' 23:59:59').getTime();
		//	        	console.log(thisy +'年'+ thism +'月'+ thisd +'日')
		var oldTime = new Date(thisy+'-'+thism+'-'+thisd ).getTime();
		var newTime = new Date(oldTime);
		$(".re_money_tbody").empty();

		// 选择当日请求接口显示回款内容
		time_day(ht_html,zero,mid);
	});
};

