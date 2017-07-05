$(function(){
	$(".establish_ul li a").on('click',function(){
		var index = $(this).parent().index();
		console.log(index)
		$(".establish_ul li a").removeClass("li_on");
		$(this).addClass("li_on");
		$('.tabcontent').eq(index).show().siblings('.tabcontent').hide();
	})
	
	$(".list_tab li a").on('click',function(){
		var index = $(this).parent().index();
		$(".list_tab li a").removeClass("li_on");
		$(this).addClass("li_on");
		$('.list_ul').eq(index).show().siblings('.list_ul').hide();		
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
