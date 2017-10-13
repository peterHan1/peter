$(function(){
	// tab栏切换
	$(".record_top ul li").on("click", function() {
		var _index = $(this).index();
		$(".record_top ul li").removeClass("ones");
		$(this).addClass('ones');
		$(".record_box").eq(_index).show();
		$(".record_box").eq(_index).siblings(".record_box").hide();
	});
	$(".record_box tbody tr .last").on("mouseover",function(){
		$(".bz_tips").remove();
		var str="<div class='bz_tips'>备注信息备注信息备注信息</div>";
		$(this).append(str);
	});
	$(".record_box tbody tr .last").on("mouseleave",function(){
		$(".bz_tips").remove();
	});
});