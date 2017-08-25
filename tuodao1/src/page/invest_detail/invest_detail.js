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
	$(".sub_btn").on("click",function(){
		var money = $(".sub_money").val();
		var psw = $(".sub_psw").val();
		if(money == "" && psw == ""){
			show_mess("请填写加入金额! 和 请填写加入金额和支付密码!");
		}else if(money == ""){
			show_mess("请填写加入金额!");
		}else if(psw == ""){
			show_mess("请填写加入金额和支付密码!");
		}
	});
	function show_mess(str){
		console.log(str);
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