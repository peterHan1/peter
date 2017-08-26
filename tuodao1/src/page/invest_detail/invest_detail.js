require('util/paging/zxf_page.scss');
require('util/paging/zxf_page.js');

console.log("理财详情页");

$(function(){
	$(".detail_tab li a").on("click",function(){
		$(this).addClass("on");
		$(this).parent().siblings().find('a').removeClass('on');
	});
	var list = $(".chage_tr tr");
	for (var i = 0; i < list.length; i++) {
		if(i%2!=1){
			list[i].className = 'li_color';
		}
	};
	// input输入状态
	$(".investting input").focus(function(){
		$(this).parent().addClass("com_sty");

	});
	$(".investting input").blur(function(){
		$(this).parent().removeClass("com_sty");
	});
	// 支付按钮点击的状态
	$(".sub_btn").on("click",function(){
		var money = $(".sub_money").val();
		var psw = $(".sub_psw").val();
		if(money == "" && psw == ""){
			show_mess("请填写加入金额! 和 请填写加入金额和支付密码!");
		}else if(money == ""){
			show_mess("请填写加入金额!");
		}else if(psw == ""){
			show_mess("请填写支付密码!");
		}else if(psw != "123"){
			show_mess("密码错误，请重新输入!");
		}else{
			if($(".mess").length > 0){
				$(".current_money").removeClass("cur_money");
				$(".mess").remove();
			}
		}
	});
	// 输入金额input输入状态
	$(".sub_money").keyup(function(){
		var a=$(this);
		if(/[^\d]/.test(a.val())){
			var temp_amount=a.val().replace(/[^\d.]/g,'');
			$(this).val(temp_amount);
		};
		// 最后根据算法优化
		var b = $(this).val();
		// 有奖励
		var flag = false;
		var c = 6;
		// 使用加息券
		var quan = false;
		var d = 10;
		if(flag == true && quan == true){
			$(".predict_money").html(b +"+"+ c +"+"+ d);
		}else if(quan == true){
			$(".predict_money").html(b +"+"+d);
		}else if(flag == true ){
			$(".predict_money").html(b +"+"+c);
		}else{
			$(".predict_money").html(b);
		}
		var m = $(this).val();
		if(m == ""){
			$(".sub_btn").val("实付0.00元，立即投资");
		}else{
			$(".sub_btn").val("实付"+m+"元，立即投资");
		}

	});

	// 输入金额input失去焦点状态
	$(".sub_money").blur(function(){
		var money = $(this).val();
		var a = $(this).parent(".invest_money");
		console.log(money);
		if(money == 666){
			input_mess("余额不足",a);
		}else if(money == 500){
			input_mess("不得低于起投金额500元！",a);
		}else if(money > 50000){
			input_mess("单笔限额为500,000元！",a);
		}else if(money == 123){
			input_mess("您输入的金额大于当前剩余可投金额！",a);
		}else{
			a.removeClass("bor_col");
			$(".in_span").remove();
		}
	});
	// 优惠券点击
	$(".ticket").on("click",function(){
		if($(".sub_money").val() == ""){
			var a = $(".sub_money").parent(".invest_money");
			input_mess("选择优惠券前需要填写加入金额！",a);
		};
	});
	// input状态提示
	function input_mess(str,par){
		if ($(".in_span").length>0) {
			$(".in_span").remove();
		}
			var txts = "<span class='in_span'><i class='iconfont'>&#xe671;</i>"+ str +"</span>";
			par.addClass("bor_col");
			par.append(txts);
	}
	// top提示错误
	function show_mess(str){
		var txt = "<span class='mess'><i class='iconfont'>&#xe671;</i>"+ str +"</span>";
		$(".current_money").addClass("cur_money");
		if($(".mess").length > 0){
			$(".mess").remove();
		}
		$(".current_money").append(txt);
	};

	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 10,
		// 当前页
		current: 1,
		// 显示条数
		shownum: 10,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
	// 图片延时加载
	// $("img.lazy").lazyload({effect: "fadeIn"});

	$('.fancybox').fancybox({
		fitToView   : false,
		// centerOnScroll:true,
		helpers:  {
			title: {
				type: 'inside',
				position: 'top'
			}
		}
	});
});