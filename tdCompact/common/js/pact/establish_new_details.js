$(function(){
	FastClick.attach(document.body);
		$(".back_ul li").bind('input propertychange', function() { 
			if($(this).find('input').val() != ""){
		    	$(this).find('.search_x ').show();
		    }else{
		    	$(this).find('.search_x ').hide();
		    };
		    $(this).find('.search_x ').on('click',function(){
		    	$(this).siblings('input').val('');
		    	$(this).hide();
		    	inlen();
		    })
		})
		$(".back_ul li input").focus(function(){
		    if($(this).val() != ""){
				console.log(666)
				$(this).siblings(".search_x").show();
			}
		});
		$(".back_ul li input").blur(function(){
			$(".search_x").hide();
		})

		$(".back_ul li input").keyup(function(){
			inlen();
		})
		function inlen(){
			var len = $(".back_ul li input");
			for(var i=0;i<len.length;i++){
				if(len[i].value == ""){
					$("#accomplish").removeClass("accomplish");
					return false;
				}else{
					$("#accomplish").addClass("accomplish");
				}
				
			}
		}
		

		$(document).on("click",".accomplish",function(){
			var txt = '<div class="footer" id="footer" ><input type="button" value="提交" class="footer_btn"/></div>';
			
			$(".back_txt").html("预览填写信息")
			$("#accomplish").hide();
			$(".back_amend,.back_cancel").show();
			$(".back_ul input").attr("disabled","true");
			$(".back_box").append(txt);

		})
		$(".back_amend").on("click",function(){
			$(".footer").remove();
			$("#accomplish").show();
			$(".back_amend,.back_cancel,.footer").hide();
			$(".back_ul input").removeAttr("disabled");
			
		})
		$(document).on("click",".sub_btn",function(){
			alert(666)
		})
		
		
		
		
		
		$(".back_cancel").on("click",function(){
			layer.open({
				type: 1, 
				title:"",
				content:$('#can_show'),
				scrollbar: false,
				closeBtn: 0,
				area: ['5.8rem', 'auto']
			}); 
		})

	

		$(document).on("click",".back_sub",function(){
			//有值发生改变的话 提交执行
			alert(666)
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
