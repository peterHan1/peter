function time_list(yyyy,mm){
	$.ajax({
		url: 'js/time.json',
		dataType: "json",
		type: 'get',
		success:function(data){
		    $(".re_money_tbody").empty();
		    	$.each(data,function(i,item){
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
		}
	});
};
function time_day(ht_html,zero,mid){
	$.ajax({
		url: 'js/time.json',
		dataType: "json",
		type: 'get',
		success:function(data){
			$.each(data,function(i,item){
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
		}
	});
};
function getMoth(str){
	var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
	return oTime;
};
console.log(555);
