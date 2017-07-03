$(function(){
	$(".list_tab a").on("click",function(){
		var index = $(this).parent().index();
		console.log(index)
		$(".list_tab a").removeClass("li_on")
		$(this).addClass("li_on").siblings('li').attr('class','taba');
		$('.tabcon').eq(index).show(200).siblings('.tabcon').hide();
	});
		$("#click_add").on("click",function(){
			$("#add_borrow").animate({
				top:'0'
			},500);

		})
		$(".add_cancel").on("click",function(){

			$("#add_borrow").animate({
				top:'100%'
			},500);

		})
		$("#select_bank").on("click",function(){
			$('.select_bank').load('../../src/bank/select_bank.html');
			$("#add_borrow").animate({
				left:'-100%'
			},500);

		})
		$(document).on("click","#bank_ul li",function(){
			$("#add_borrow").animate({
				left:'0'
			},500);
		})
		
		$("#keyword").on('keydown',function(e) {  
            var keycode = e.keyCode;  
            var searchName = $(this).val();  
            if(keycode=='13') {  
            	alert("你按下了搜索键" + keycode)
                e.preventDefault();    
                //请求搜索接口    
            }  
     	}); 
     	$(".keyword").on("click",function(){
     		var h = $("#left_ment").height();
     		var ish = $(".keyword").height();
     		console.log(h)
			$(".top_hid").hide();
			$(".search_show,.sea_can").show();
			$('section').hide();
			$(".search_show").height(h-ish);
     	});
     	$(".sea_can").on("click",function(){
     		$(".top_hid").show();
			$(".search input").val("");
			$(".search_show,.sea_can").hide();
			$('section').show();
     	});
     	$(".tabcontent ul li").on("click",function(){
			 window.location.href="../../src/borrower/borrower_details.html";
     	});
})