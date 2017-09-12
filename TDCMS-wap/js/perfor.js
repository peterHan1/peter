	$(function(){
	//确认修改密码
	$(document).on('keyup',".old_psw,.new_psw,.new_psws",function(){
		var old = $(".old_psw").val();
		var psw = $(".new_psw").val();
		var psws = $(".new_psws").val();
		if(old != "" && (psw != "" && psw.length>=6 && psw.length<=16) && (psws != "" && psws.length>=6 && psws.length<=16)){
			$(".aff").addClass("affirm");
		}else{
			$(".aff").removeClass("affirm");
		}
	});
	
	//确认修改密码
	$(document).on("click",".affirm",function(){
		var old = $(".old_psw").val();
		var newpwd = $(".new_psw").val();
		var newpwds = $(".new_psws").val();
		if(newpwd != newpwds){
			$(".hint").html("密码不一致，请重新输入").show();
		}else if(old != 123){//暂时写一个条件旧密码错误
			$(".hint").html("旧密码输入错误，请重新输入").show();
		}else{
			//密码不一致显示提示
			$(".hint").show();
			$(".amend_psw").hide();
			$(".suc").show();
			setTimeout(function(){
				layer.closeAll();
			},2000)
		}
		
	});
	$(document).on("click",".cancel",function(){
		layer.closeAll();
	});
	//编辑
	mui(document).on("tap",".compile",function(){
		layer.open({
			skin:"psw_show",
			content:'<div id="psw_show"><div class="psw_show "><div class="amend_psw"><p class="title">修改密码</p><div class="txt"><p class="hint dis_none"></p></div><ul><li><span>旧密码</span><input type="password" class="old_psw" placeholder="请输入旧的登录密码 "/></li><li><span>新密码</span><input type="password" class="new_psw" placeholder="请输入6-16位新密码 "/></li><li><span>确认密码</span><input type="password" class="new_psws" placeholder="请再次确认6-16位新密码 "/></li></ul><div class="psw_bot"><span class="cancel">取消</span><span class="aff">确认修改</span></div></div><div class="suc dis_none"><span class="iconfont">&#xe68f;</span><p>修改成功</p></div></div></div>'
		});
	});
	//退出按钮"
	mui(".top_r").on("tap",".out",function(){
		layer.open({
			skin:'out_show',
			content:'确认退出',
			btn:['退出','取消'],
			yes: function(){
//					退出操作
			}
		});
	});
	//日历选择
	mui(".con_date").on("tap","#select_date",function(){
		var picker = new mui.DtPicker({'type':'month','endYear':'2030','beginYear':'2013'});
		picker.show(function(rs) {
			var arr = rs.text.split('-');
			$(".select_date").html(arr[0]+'年'+arr[1]+'月');
			picker.dispose();
		})
	});
	//点击左右切换
	var pic=0;
	if(pic==0){
		$("#left").addClass("close");//这个是按钮置灰，可以改成隐藏
	}
	var width=$(".bot_mess_view").width();//视口宽度
	mui(".bot_mess").on("tap","#right",function(){
		$("#left").removeClass("close");
		if(pic<$(".bot_mess_view ul").children().length-1){
			pic++;
			$(".bot_mess_view ul").animate({"left":pic*-width});
			
			if(pic==$(".bot_mess_view ul").children().length-1){
				$("#right").addClass("close");
			} 
		}
	});
	$(".bot_mess").on("tap","#left",function(){
		$("#right").removeClass("close");
		if(pic>0){
			pic--;
			$(".bot_mess_view ul").animate({"left":-pic*width});
			if(pic==0){
				$("#left").addClass("close");
			}
		}
	});
//tab切换
	mui(".tab_ul").on("tap","li",function(){
		var ins = $(this).index();
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		$(".perfor_table_com>div").eq(ins).show().siblings().hide();
		
	});
	//上拉加载
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});	
	// 下拉刷新具体业务实现
	function pulldownRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(
				//刷新执行
			);
		}, 1500);
	}
	// 上拉加载具体业务实现
	function pullupRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(
				
			); //参数为true代表没有更多数据了。
			var table_o = document.body.querySelector('.tbody_o');
			var table_t = document.body.querySelector('.tbody_t');
			var table_f = document.body.querySelector('.tbody_f');
			if($(".iscroll_o").is(':visible')){//业务员加载
				for (var i = 10, len = i + 10; i < len; i++) {
					var tr = document.createElement('tr');
					tr.innerHTML = '<td>'+ (i+1) +'</td><td>'+ "薛之谦" +'</td><td>'+ "100,000.00" +'</td><td>'+"自己的队"+'</td>';
					table_o.appendChild(tr);
				};
			}else if($(".iscroll_t").is(':visible')){//团队加载
				for (var i = 10, len = i + 10; i < len; i++) {
					var tr = document.createElement('tr');
					tr.innerHTML = '<td>'+ (i+1) +'</td><td>'+ "自己的队" +'</td><td>'+ "100,000.00" +'</td>';
					table_t.appendChild(tr);
				};
			}else if($(".iscroll_f").is(':visible')){//门店加载
				for (var i = 10, len = i + 10; i < len; i++) {
					var tr = document.createElement('tr');
					tr.innerHTML = '<td>'+ (i+1) +'</td><td>'+ "自己的店" +'</td><td>'+ "100,000.00" +'</td>';
					table_f.appendChild(tr);
				};
			}
		}, 1500);
	}
})
			