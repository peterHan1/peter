$(function(){
	$(".list_tab a").on("click",function(){
		var index = $(this).parent().index();
		console.log(index)
		$(".list_tab a").removeClass("li_on")
		$(this).addClass("li_on").siblings('li').attr('class','taba');
		$('.tabcon').eq(index).removeClass("dis_no").siblings('.tabcon').addClass("dis_no");
		
		var myScroll2,myScroll3;
		myScroll2 = new IScroll("#tabcon_o",{
			scrollX:false,
			scrollY:true,
			click:true
		});
		myScroll3 = new IScroll("#tabcon_n",{
			scrollX:false,
			scrollY:true,
			click:true
		});

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
		
		$(".keyword").on('keydown',function(e) {  
            var keycode = e.keyCode;  
            var searchName = $(this).val();  
            if(keycode=='13') {  
            	alert("你按下了搜索键" + keycode)
                e.preventDefault();    
                //请求搜索接口    
                 // 搜索为空
                $(".opa_d,section").hide();
               	$(".search_no").show();
               	
				// 搜素成功
                $(".opa_d,section").hide();
                $(".search_show").show();
                var data_li = '<li><div class="cont_top"><p><span>张三</span></p><p class="p_cont"><span class="fl">13659845263</span><span>330105198904510062</span><span class="fr font_ok">可签署</span></p></div><div class="cont_bot"><p>2017-04-01  11:45:30</p></div></li>';
				$(".search_data").append(data_li);
            }  
     	}); 
     	
     	$(".tabcontent ul li").on("click",function(){
			 window.location.href="../../src/borrower/borrower_details.html";
     	});
})