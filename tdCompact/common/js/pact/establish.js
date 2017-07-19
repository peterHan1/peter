$(function(){
	
		
		
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
			title:"",
			content:$('#can_show'),
			scrollbar: false,
			closeBtn: 0,
			area: ['5.8rem', 'auto']
		}); 
    })
		var txts=$("#inp_txt").val().trim();
			var length=txts.length;
			$("#inp_txt").keyup(function(){//输入字判断字数
		  		fontNum('inp_txt','lengthnums');
		});
		
		function fontNum(idval,idnum){//判断字数
			var a = $('#'+idval);
			var b = $('#'+idnum);
			var lennum = a.val().length;
			b.html(lennum);	
			if(lennum >= 1 && lennum <= 20){
				$(".sub_btn").addClass("obs");
				$("#inp_txt").removeClass("orange");
				$("#lengthnums").removeClass("orange");
			}else if(lennum > 20){
				$("#inp_txt").addClass("orange");
				$("#lengthnums").addClass("orange");
				$(".sub_btn").removeClass("obs")
			}else if(lennum == 0){
				$(".sub_btn").removeClass("obs");
				$("#inp_txt").removeClass("orange");
				$("#lengthnums").removeClass("orange");
			}
		}
		$(".sub_btn").on("click",function(){
			if($("#lengthnums").text() > 20){
				alert("注意字数限制")
				return false;
			}else if($("#lengthnums").text() == 0){
				alert("备注不能为空")
				return false;
			}else{
				console.log(666)
			}
		});
	
	
	
	$(".cancel").on("click",function(){
		layer.closeAll();
	})
})
