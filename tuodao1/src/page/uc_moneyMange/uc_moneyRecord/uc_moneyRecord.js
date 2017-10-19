$(function(){
	// tab栏切换
	$(".record_top ul li").on("click", function() {
		var _index = $(this).index();
		$(".record_top ul li").removeClass("ones");
		$(this).addClass('ones');
		$(".record_box").eq(_index).show();
		$(".record_box").eq(_index).siblings(".record_box").hide();
	});
	$(".record_box tbody tr .last i").on("mouseover",function(){
		$(".bz_tips").remove();
		var str="<div class='bz_tips top-tips'>备注备备注备<span class=b></span><span class=t></span></div>";
		$(this).parent().append(str);
		var width=$(".bz_tips").outerWidth()/2;
		console.log(width);
		$(".bz_tips").css({"left":"50%","margin-left":-width});
	});
	$(".record_box tbody tr .last i").on("mouseleave",function(){
		$(".bz_tips").remove();
	});
	$(".record_box").on("mouseleave",function(){
		$(".bz_tips").remove();
	});
});