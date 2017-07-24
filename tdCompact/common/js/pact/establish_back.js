$(function(){
	FastClick.attach(document.body);
		$(".footer_btn").on("click",function(){
			$(".back_title").html("修改合同-编辑");
			$(".back_cancel").hide();
			$("#back_sub").show();
			$(".footer").addClass("dis_no");
			$(".back_cont input").removeAttr('disabled ');
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

		inp('back_cont');
		function inp(inp){
			var inps = $("."+inp).find("li input");
			var inpArr1 = [];

			for(var i=0;i<inps.length;i++){
				var arr = inps[i].value;
				inpArr1.push(arr);	
			}
			$('.back_cont li').bind('input propertychange', function() {
				var count = 0;
				var inpArr2 = [];
				for(var i=0;i<inps.length;i++){
					var arr2 = inps[i].value;
					inpArr2.push(arr2);	
				}
			   for(var k in inpArr1){
			        if(inpArr1[k] != inpArr2[k]){
						count++;
			    	}
				}
			   if(count != 0){
			   		$("#back_sub").addClass("back_sub");
			   }else{
			   		$("#back_sub").removeClass("back_sub");
			   }
			})
		}

		$(document).on("click touchstart",".back_sub",function(){
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
