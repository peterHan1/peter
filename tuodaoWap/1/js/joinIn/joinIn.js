$(function(){
		$(".joinIn li .empty").on("mousedown",function(){
			$(this).siblings("input").val("");
			inp_val();
		});
		$(".joinIn li input").focus(function(){
			var clas = $(this).attr("class");
			$(this).parent(".div_bot").addClass("inp_bot");
			$(this).parents("li").find(".p_top").show();
			$(this).parents("li").find(".p_top").css("color","#ff7400");
			$(this).siblings("div").show();
			if(clas == 'name_inp'){
				$(this).attr("placeholder","请输入您的姓名");
			}else if(clas == 'phone_inp'){
				$(this).attr("placeholder","请输入联系电话");
			}else if(clas == 'site_inp'){
				$(this).attr("placeholder","请输入联系地址");
			}else if(clas == 'money_inp'){
				$(this).attr("placeholder","请输入计划投资总额");
			}
		});
		$(".joinIn li input").blur(function(){
			var clas = $(this).attr("class");
			$(this).siblings(".empty").hide();
			if($(this).val() == ""){
				if(clas == 'name_inp'){
					$(this).attr("placeholder","您的姓名");
				}else if(clas == 'phone_inp'){
					$(this).attr("placeholder","联系电话");
				}else if(clas == 'site_inp'){
					$(this).attr("placeholder","联系地址");
				}else if(clas == 'money_inp'){
					$(this).attr("placeholder","计划投资总额");
				}
				$(this).parent(".div_bot").removeClass("inp_bot");
				$(this).parents("li").find(".p_top").hide();
			}else{
				$(this).parents("li").find(".p_top").css("color","#b6b5b6");
				
			}
		});
		$(".phone_inp").blur(function(){
			if($(this).val() != ""){
				var phone = $(this).val();
				if(!(/^1[34578]\d{9}$/.test(phone))){
					layer.open({
						style:'background-color:#393b41;color:#fff;',
						time: 2,
						shade: false,
						content:'请输入正确的手机号'
					})
					return false; 
				}
			}
		});
		$(".site_inp").focus(function(){
			var th = $(this);
			inp_focus(th,'请输入联系地址');
		});
		$(".site_inp").blur(function(){
			var th = $(this);
			inp_blur(th,'联系地址')
		});
		
		$(".sites_inp").focus(function(){
			var th = $(this);
			inp_focus(th,'请输入意向区域详细地址');
		});
		$(".sites_inp").blur(function(){
			var th = $(this);
			inp_blur(th,'意向区域详细地址');
		});
		function inp_focus(ths,txt){
			ths.parent(".tex_bot").addClass("inp_bot");
			ths.parents("li").find(".p_top").show();
			ths.attr("placeholder",txt);
			ths.parents("li").find(".p_top").css("color","#ff7400");
		}
		function inp_blur(ths,txt){
			if(ths.val() == ""){
				ths.parents("li").find(".p_top").hide();
				ths.attr("placeholder",txt);
				ths.parent(".tex_bot").removeClass("inp_bot");
			}else{
				ths.parents("li").find(".p_top").css("color","#b6b5b6");
				ths.scrollTop("0");
			}
		}
		
		var city_picker = new mui.PopPicker({layer:3});
		city_picker.setData(init_city_picker);
		$("#city").on("click", function(){
			setTimeout(function(){
				city_picker.show(function(items){
					$(".city .p_city").html((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
					$(".city .p_top").show();
					$(".inp_city").val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
					$(".city .p_city").css("color","#212a36");
					inp_val();
				});
			},200);
		});
		
		$("#time").on("click",function(){
			var now=new Date();
			var picker = new mui.DtPicker({'type':'date','endYear':'2027','beginYear':now.getFullYear(),'beginMonth':now.getMonth()+1,'beginDay':now.getDate()});
			picker.show(function(rs) {
				$("#p_time").html(rs.text);
				$(".inp_time").val(rs.text);
				$("#p_time").css("color","#212a36");
				$(".p_time").show();
				inp_val();
				picker.dispose();
			})
		})

		$(".source_li .div_bot").on("click",function(){
			if($(".source_li .bot_tab").is(':hidden')){
				$(".source_li .bot_tab").show();
				$(".source_li .iconfont").addClass("deg");
				
			}else{
				$(".source_li .bot_tab").hide();
				$(".source_li .iconfont").removeClass("deg");
				
			}
			
		});
		$(".source_li .bot_tab span").on("click",function(){
			var htm = $(this).html();
			$(".source_li .bot_tab span").removeClass("on");
			$(this).addClass("on");
			$(".source_li .p_top").show();
			$(".source_li .p_city").html(htm);
			$(".source_li .p_city").css("color","#212a36");
			$(".inp_source").val(htm);
			$(".source_li .bot_tab").fadeOut();
			$(".source_li .iconfont").removeClass("deg");
			inp_val();
		});
		$(".nature_li .div_bot").on("click",function(){
			if($(".nature_li .bot_tab").is(':hidden')){
				$(".nature_li .bot_tab").show();
				$(".nature_li .iconfont").addClass("deg");
			}else{
				$(".nature_li .bot_tab").hide();
				$(".nature_li .iconfont").removeClass("deg");
			}
			
			
		})
		$(".nature_li .bot_tab span").on("click",function(){
			var htm = $(this).html();
			$(".nature_li .bot_tab span").removeClass("on");
			$(this).addClass("on");
			$(".nature_li .p_top").show();
			$(".nature_li .p_city").html(htm);
			$(".nature_li .p_city").css("color","#212a36");
			$(".inp_nature").val(htm);
			$(".nature_li .bot_tab").fadeOut();
			$(".nature_li .iconfont").removeClass("deg");
			
			inp_val();
		});
		$(".reason_inp").focus(function(){
			$(this).parent(".tex_bot").addClass("inp_bot");
			$(this).parents("li").find(".p_top").show();
			$(this).attr("placeholder","请输入加盟理由");
			$(this).parents("li").find(".p_top").css("color","#ff7400");
			
		});
		$(".reason_inp").blur(function(){
			if($(this).val() == ""){
				$(this).parents("li").find(".p_top").hide();
				$(this).attr("placeholder","加盟理由");
				$(this).parent(".tex_bot").removeClass("inp_bot");
			}else{
				$(this).parents("li").find(".p_top").css("color","#b6b5b6");
				$(this).scrollTop("0");
			}
		});
		
		
		$(".phone").on("click",function(){
			layer.open({
				type:0,
				skin:"phone_show",
				area: "1.1rem",
				content:$(".phone_show").html(),

			})
		});
		$(document).on("click",".close",function(){
			layer.closeAll();
		});
		$(".money_inp").keyup(function(){
			var $amountInput = $(this);
			$amountInput.val($amountInput.val().replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
		});
		$(".money_inp").blur(function(){
			var th = $(this);
			overFormat(th);
		})
		$('.joinIn input').keyup(function() {  
		    inp_val();
		});  
		$(".joinIn textarea").keyup(function(){
		    inp_val();
		});
		$(document).on("click",".sub_btn",function(){
			//申请成功
			window.location.href="joinIn_ok.html";
		})
		
		
		
		
		function inp_val(){
			var name = $(".name_inp").val();
			var phone = $(".phone_inp").val();
			var site = $(".site_inp").val();
			var city = $(".inp_city").val();
			var sites = $(".sites_inp").val();
			var source = $(".inp_source").val();
			var nature = $(".inp_nature").val();
			var time = $(".inp_time").val();
			var money = $(".money_inp").val();
			var reason = $(".reason_inp").val();
			if(name != "" && (/^1[34578]\d{9}$/.test(phone)) && phone != "" && site != "" && city != "" && sites != "" && source != "" && nature != "" && time != "" && money != "" && reason != ""){
				$(".btn").addClass("sub_btn");
			}else{
				$(".btn").removeClass("sub_btn");
			}
		}
		
		function overFormat(th){
		    var v = th.val();  
		   	if(v === '0'){ 
		        v = '0.00';  
		    }else if(v === '0.'){  
		        v = '0.00';  
		    }else if(/^0+\d+\.?\d*.*$/.test(v)){  
		        v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');  
		        v = inp.getRightPriceFormat(v).val;  
		    }else if(/^0\.\d$/.test(v)){  
		        v = v + '0';  
		    }else if(!/^\d+\.\d{2}$/.test(v)){  
		        if(/^\d+\.\d{2}.+/.test(v)){  
		            v = v.replace(/^(\d+\.\d{2}).*$/, '$1');  
		        }else if(/^\d+$/.test(v)){  
		            v = v + '.00';  
		        }else if(/^\d+\.$/.test(v)){  
		            v = v + '00';  
		        }else if(/^\d+\.\d$/.test(v)){  
		            v = v + '0';  
		        }else if(/^[^\d]+\d+\.?\d*$/.test(v)){  
		            v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');  
		        }else if(/\d+/.test(v)){  
		            v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');  
		            ty = false;  
		        }else if(/^0+\d+\.?\d*$/.test(v)){  
		            v = v.replace(/^0+(\d+\.?\d*)$/, '$1');  
		            ty = false;  
		        }
		    }  
		    th.val(v);   
		} 
});