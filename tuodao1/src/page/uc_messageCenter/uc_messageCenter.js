$(function(){
	$(".message_main ul li").on("click",function(){
		var height=$(this).height();
		if(height==50){
			$(this).find("i").html("&#xe69c;");
			$(this).css({"height":"83px","line-height":"41.5px"});
		}else{
			$(this).find("i").html("&#xe69a;");
			$(this).css({"height":"50px","line-height":"50px"});
		}
		$(this).find("dd").toggle();
		$(this).find("dt").removeClass("color");
		if($(".message_main ul li dt").hasClass('color')){
			return false;
		}else{
			$(".message_top .btn").addClass("jy");
		}
	});
	// 全部标为已读按钮
	$(".message_top .btn").on("click",function(){
		$(".message_main li dt").removeClass("color");
		$(this).removeClass("color");
		$(this).addClass("jy");
	});
});