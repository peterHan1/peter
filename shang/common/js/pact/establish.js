$(function(){
	
		$(".list_tab li a").on('click',function(){
				var index = $(this).parent().index();
				$(".list_tab li a").removeClass("li_on");
				$(this).addClass("li_on");
				$('.list_ul').eq(index).removeClass("dis_no").siblings('.list_ul').addClass("dis_no");	
				var myScroll3 = new IScroll("#list_ul_o",{
					scrollX:false,
					scrollY:true,
					click:true
				});
				
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
                var data_li = '<li><div class="cont_top"><p><span>张三</span></p><p class="p_cont"><span class="fl">13659845263</span><span>330105198904510062</span><span class="fr font_ok">可签署</span></p></div><div class="cont_bot"><p>2017-04-01  11:45:30</p></div></li>';
				$(".search_data").append(data_li);
            }  
     	}); 
     	
     	
	$(".est_contR").on("click",function(){
 		layer.open({
			type: 1, 
			title:"6666",
			content:$('#can_show'),
			closeBtn: 0,
			area: ['50%', '20%']
		}); 
    })
	$("#remark_reset").on("click",function(){
		layer.closeAll();
	})
})
