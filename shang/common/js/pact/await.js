$(function(){
	$("#keyword").on('keypress',function(e) {  
            var keycode = e.keyCode;  
            var searchName = $(this).val();  
            if(keycode=='13') {  
            alert("你按下了搜索键" + keycode)

                e.preventDefault();    
                //请求搜索接口  
                  
            }  
     }); 
     
    $(".est_li").on("click",function(){
		 window.location.href="await_details.html";
 	}); 
 	
})
