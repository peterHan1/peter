var _retuenMon = {
	clickMontn: function(data){
		this.callback = {
			callback: function() {}
		};
		// 日历上一月
		$("."+data.left).click(function(){
			var mm = parseInt($(".f_month").html());
			var yy = parseInt($(".f_year").html());
			if( mm == 1){
				$(".f_year,.re_money_y").html(yy-1);
				$(".f_month,.re_money_m").html(12);
				$(".re_money_d").html(" ");
				_retuenMon.showDate(yy-1,12);
				data.callback(yy-1,12);
			}else{
				$(".f_month,.re_money_m").html(mm-1);
				$(".re_money_d").html(" ");
				_retuenMon.showDate(yy,mm-1);
				data.callback(yy,mm-1);
			}
		});
		// 日历下一月
		$("."+data.right).click(function(){
			var mm = parseInt($(".f_month").html());
			var yy = parseInt($(".f_year").html());
			if( mm == 12){
				$(".f_year,.re_money_y").html(yy+1);
				$(".f_month,.re_money_m").html(1);
				$(".re_money_d").html(" ");
				_retuenMon.showDate(yy+1,1);
				data.callback(yy+1,1);
			}else{
				$(".f_month,.re_money_m").html(mm+1);
				$(".re_money_d").html(" ");
				_retuenMon.showDate(yy,mm+1);
				data.callback(yy,mm+1);
			}
		});
	},
	clickDay: function(data){
		this.callback = {
			callback: function() {}
		};
		// 绑定选择方法
		$("."+data.elm).off("click");
		$("."+data.elm).on("click",function(){
			$("."+data.elm).removeClass("datas_on");
			$(this).addClass("datas_on");
			var thisy = $(".f_year").html();
			var thism = $(".f_month").html();
			var thisday = $(this).find('.data_day').html();
			var datas = thisy+"-"+thism+"-"+thisday;
			// $(".re_money_d").html(thisday+'日');
			data.callback(datas,thisday);
		});
	},
	returnMoney: function(){
		var yyyy,mm,ht_html,zero,mid,thisy,thism,thisd;
		// 日历算法
		var date = '<div><div class="account_title"><div class="data_top"><div class="fl data_top_datas"><span class="f_year"></span>年<span class="f_month"></span>月</div><div class="data_top_btn fr"><a href="javascript:;" class="data_top_btn_l iconfont">&#xe6bb;</a><a href="javascript:;" class="data_top_btn_r iconfont">&#xe6ba;</a></div></div></div><div class="data_table"><div class="clearfix"><div class="data_table_th">日</div><div class="data_table_th">一</div><div class="data_table_th">二</div><div class="data_table_th">三</div><div class="data_table_th">四</div><div class="data_table_th">五</div><div class="data_table_th">六</div><div class="clear"></div></div><div class="data_tbody clearfix"></div></div><div class="datas_title"><div><b class="await_b"></b><span>有待回款项目</span></div><div><b class="yet_b"></b><span>有已回款项目</span></div></div></div>';
		$(".account_box").append(date);
		var mydate = new Date();
		$(".f_year,.re_money_y").html( mydate.getFullYear() );
		$(".f_month,.re_money_m").html( mydate.getMonth()+1 );
		_retuenMon.showDate(mydate.getFullYear(),mydate.getMonth()+1);
		// 读取年月写入日历
	},
	showDate: function(yyyy,mm){
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
		for(var j=monthstart;j>0;j--){
			mystr += "<div class='data_table_td data_null data_lastMonth' style='color:#ccc;'>"+(lastMonth-j+1)+"</div>";
		}

		// 本月单元格
		for(var i=0;i<daysCount;i++){
			mystr += "<div class='data_table_td data_number'><span class='data_day'>"+(i+1)+"</span></div>";
		}

		// 计算下月空格数
		for(var k=0; k<35-(daysCount+monthstart);k++ ){
			mystr += "<div class='data_table_td data_null data_nextMounth' style='color:#ccc;'>"+(k+1)+"</div>";
		}

		// 写入日历
		$(".data_table .data_tbody").html(mystr);
		// 给今日加class
		if( mydate.getFullYear() == yyyy){
			if( (mydate.getMonth()+1 ) == mm){
				var today = mydate.getDate();
				var lastNum = $(".data_lastMonth").length;
				$(".data_table .data_table_td").eq(today+lastNum-1).addClass("today_datas datas_on");
			}
		}
	},
};


module.exports = _retuenMon;