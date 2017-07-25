$(function(){
	
			$(".empty_x").bind('input propertychange', function() { 
				if($(this).find('input').val() != ""){
			    	$(this).find('.search_x ').show();
			    }else{
			    	$(this).find('.search_x ').hide();
			    };
			    $(this).find('.search_x ').on('click',function(){
			    	$(this).siblings('input').val('');
			    	$(this).hide();
			    })
			})
		$(".empty_x input").focus(function(){
		    $(".search_x").hide();
		})
	
		$("#click_add").on("click",function(){
			$("#add_borrow").animate({
				top:'0'
			},800);

		})
		$(".add_cancel").on("click",function(){

			$("#add_borrow").animate({
				top:'100%'
			},800);

		})
		$("#select_bank").on("click",function(){
			$('.select_bank').load('../../src/bank/select_bank.html');
			$("#add_borrow").animate({
				left:'-100%'
			},800);

		})
		$(document).on("click","#bank_ul li",function(){
			$("#add_borrow").animate({
				left:'0'
			},800);
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