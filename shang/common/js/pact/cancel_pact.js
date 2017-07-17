$(window).load(function(){
			$(".list_tab a").on("click",function(){
			var index = $(this).parent().index();
			$(".list_tab a").removeClass("li_on")
			$(this).addClass("li_on").siblings('li').attr('class','taba');
			$('.tabcon').eq(index).show().siblings('.tabcon').hide();
			
//			myScroll.scrollTo(0, 0);
//			myScroll.refresh();


		});
		
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
                var data_li = '<li><div class="cont_top"><p><span>20160606001</span> <span class="font_ora fr">存在法律隐患，条款变更</span></p><p class="p_cont"><span class="fl">张三</span><span>18866668888</span><span class="fr">浙A521N0</span></p></div><div class="cont_bot"><p>2017-04-01  11:45:30</p></div></li>';
				$(".search_data").append(data_li);
            }  
     	});  
     	
	})
	