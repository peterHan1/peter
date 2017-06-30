$(function(){
	$(".establish_ul li").on('click',function(){
		var index = $(this).index();
		$(".establish_ul li").removeClass("li_on");
		$(this).addClass("li_on");
		$('.est_conts').eq(index).show().siblings('.est_conts').hide();
	})
	
	$(".est_contTop li").on('click',function(){
		var index = $(this).index();
		$(".est_contTop li").removeClass("on");
		$(this).addClass("on");
		$('.est_audit').eq(index).show().siblings('.est_audit').hide();		
	});
	$(".est_contR").on("click",function(){
 		layer.open({
			type: 1, 
			title:"",
			content: $('#can_show'),
			closeBtn: 0,
			area: ['50%', '20%']
		}); 
    })
	$("#remark_reset").on("click",function(){
		layer.closeAll();
	})
})
