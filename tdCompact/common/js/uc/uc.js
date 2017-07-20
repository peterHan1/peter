$(function(){
	$(".phone_inp").keyup(function(){
	  	this.value=this.value.replace(/[^\d]/g,'');
	  	var v = $(this).val();
	  	if(v.length == 11){
	  		$("#btn_phone").addClass("btn_phone");
	  	}else{
	  		$("#btn_phone").removeClass("btn_phone");
	  		
	  	}
	});
	$(document).on("click",".btn_phone",function(){
		var phone = $("#phone_inp").val();
		if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
	        layer.open({
				type: 1, 
				title:"",
				skin:'uc_error',
				content:'<div class="error_top"><p>无效手机号码</p><p>请重新输入</p></div>',
				scrollbar: false,
				closeBtn: 0,
				area: ['5.4rem', 'auto'],
				btn:'确定',
				yes:function(index,layero){
					layer.closeAll();
				}
			}); 
	        return false; 
	    }else{
	    	//修改手机号格式正确执行请求
	    	console.log(phone);
	    }
		
	})
	$(".phone_error_close").on("click",function(){
		layer.closeAll();
	})
	$(".phone_clk").on("click",function(){
		$(".uc_list").hide();
		$(".phone,.uc_return").show();
		$(".top_tit").html('修改手机号');
	})
	
	$(".passw_clk").on("click",function(){
		$(".uc_list").hide();
		$(".passw,.uc_return").show();
	});
		
		$(".passw").bind('input propertychange', function() { 
			var oldPsw = $("#old_psw").val();
			var newPsw = $("#new_psw").val();
			var affPsw = $("#aff_psw").val();
			if((oldPsw != "" && oldPsw.length == 6)&&(newPsw != "" && newPsw.length == 6)&&(affPsw != "" && affPsw.length == 6)){
				$("#psw_sub").addClass("psw_sub");
			}else{
				$("#psw_sub").removeClass("psw_sub");
			}
		})
		$(document).on("click",".psw_sub",function(){
			var oldPsw = $("#old_psw").val();
			var newPsw = $("#new_psw").val();
			var affPsw = $("#aff_psw").val();
			if(newPsw != affPsw){
				layer.open({//旧密码错误
					type: 1, 
					title:"",
					content:'<div class="error_top"><p>新密码不一致</p><p>请重新输入</p></div>',
					skin:'uc_error',
					scrollbar: false,
					closeBtn: 0,
					area: ['5.4rem', 'auto'],
					btn:'确定',
					yes:function(index,layero){
						layer.closeAll();
					}
				}); 
			}else{
				//新密码相同,匹配旧密码
				
				layer.open({//旧密码错误
					type: 1, 
					title:"",
					skin:'uc_error',
					content:'<div class="error_top"><p>旧密码错误</p><p>请重新输入</p></div>',
					scrollbar: false,
					closeBtn: 0,
					area: ['5.4rem', 'auto'],
					btn:'确定',
					yes:function(index,layero){
						layer.closeAll();
					}
				}); 
			}
		})
	
	
	$(".uc_return").on("click",function(){
	  	$("#btn_phone").removeClass("btn_phone");
	  	$("#psw_sub").removeClass("psw_sub");
		$(".passw li input").val("");
		$(".uc_list").show();
		$(".phone,.passw,.uc_return").hide();
		$(".phone_inp").val("");
		$(".top_tit").html('我的信息');
	})
})