$(function(){
	//	清空
	$(".loan li .empty").on("mousedown",function(){
		$(this).siblings("input").val("");
		$(this).siblings("input").focus();
		return false;
	});

	//	input得到焦点
	$(".loan li input[type='text'],input[type='number']").focus(function(){
		var clas = $(this).attr("class");
		$(this).parent(".div_bot").addClass("inp_bot");
		$(this).parents("li").find(".p_top").animate({marginTop:"0"});
		$(this).parents("li").find(".p_top").css("color","#ff7400");
		if($(this).val() != ""){
			$(this).siblings(".empty").show();
		}
		if(clas == 'money_inp'){
			$(this).attr("placeholder","您需要多少资金");
		}else if(clas == 'car_code'){
			$(this).attr("placeholder","请输入车牌号码，如浙A88888");
		}else if(clas == 'name_inp'){
			$(this).attr("placeholder","请填写您的姓名");
		}else if(clas == 'phone_inp'){
			$(this).attr("placeholder","请输入您的手机号");
		}
	});
	
	$(".loan li input[type='text'],input[type='number']").blur(function(){
		var clas = $(this).attr("class");
		$(this).siblings(".empty").hide();
		if($(this).val() == ""){
			if(clas == 'money_inp'){
				$(this).attr("placeholder","借款金额");
			}else if(clas == 'car_code'){
				$(this).attr("placeholder","车牌号码");
			}else if(clas == 'name_inp'){
				$(this).attr("placeholder","您的姓名");
			}else if(clas == 'phone_inp'){
				$(this).attr("placeholder","手机号");
			}
			$(this).parent(".div_bot").removeClass("inp_bot");
			$(this).parents("li").find(".p_top").animate({marginTop:"0.3rem"});
		}else{
			$(this).parents("li").find(".p_top").css("color","#b6b5b6");
		}
	});

	$(".loan li input[type='text'],input[type='number']").keyup(function(){
		if($(this).val() != ""){
			$(this).siblings(".empty").show();
		}else{
			$(this).siblings(".empty").hide();
		}
		inp_val()
	});
//输入金额添加小数
	$(".money_inp").keyup(function(){
			var $amountInput = $(this);
			$amountInput.val($amountInput.val().replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
		});
	$(".money_inp").blur(function(){
			var th = $(this);
			overFormat(th);
		})	
//	手机号验证
	$(".phone_inp").blur(function(){
		if($(this).val() != ""){
			var phone = $(this).val();
			if(!(/^1[34578]\d{9}$/.test(phone))){
				layer.open({
					style:'background-color:#393b41;color:#fff;',
					skin:'code_show',
					time: 2,
					shade: false,
					content:'<span class="iconfont">&#xe68d;</span><p>请输入正确的手机号</p>'
				})
				return false; 
			}
		}
	});
	// 车牌号验证
	$(".car_code").blur(function(){
		var carcode = isVehicleNumber($(this).val());
		if(carcode == false){
			layer.open({
				style:'background-color:#393b41;color:#fff;',
				time: 2,
				skin:'code_show',
				shade: false,
				content:'<span class="iconfont">&#xe68d;</span><p>请输入正确的车牌号码</p>'
			});
			return false;
		}
	})
//	点击验证码获取 
	$(".code_btn").on("click",function(){
		if($(".phone_inp").val() == "" || !(/^1[34578]\d{9}$/.test($(".phone_inp").val()))){ // 手机号为空报错
			layer.open({
				style:'background-color:#393b41;color:#fff;',
				time: 2,
				skin:'code_show',
				shade: false,
				content:'<span class="iconfont">&#xe68d;</span><p>请输入正确的手机号</p>'
			});
			return false;
		}else{
			var flag = false;//暂时写的条件判断验证码发送失败
			if(flag == false){
				//	验证码发送失败
				layer.open({
					style:'background-color:#393b41;color:#fff;',
					time: 2,
					skin:'code_show',
					shade: false,
					content:'<span class="iconfont">&#xe68d;</span><p>验证码发送失败，请重新获取</p>'
				})
				return false;
			}else{
				// 验证码发送成功
				layer.open({
					style:'background-color:#393b41;color:#fff;',
					time: 2,
					skin:'code_show',
					shade: false,
					content:'<span class="iconfont">&#xe618;</span><p>验证码已发送到您手机</p>'
				})
		  		invokeSettime($(this));
			}
			
		}
		
	});
	//	验证码输入错误提示
	/*layer.open({
		style:'background-color:#393b41;color:#fff;',
		time: 2,
		skin:'code_show',
		shade: false,
		content:'<span class="iconfont">&#xe68d;</span><p>验证码错误，请重新输入</p>'
	})*/

//	申请加盟按钮
	$(document).on("click",".loadn_btn",function(){
		// 已经申请过提示弹窗
		/*layer.open({
			skin:'mess_show',
			content:'<p class="lay_txtp">您今天已提交过借款申请，我们会尽快联系您</p>',
			btn:'知道了',
			yes: function(){
				 layer.closeAll();
			}
		});*/
		// 已经申请次数上限弹窗
		layer.open({
			skin:'mess_show',
			content:'<p class="lay_txtp">您今天的借款申请次数已达上限，我们会尽快联系您</p>',
			btn:'知道了',
			yes: function(){
				 layer.closeAll();
			}
		})
	})
	function invokeSettime(obj){//倒计时
	    var countdown=60;
	    settime(obj);
	    function settime(obj) {
	        if (countdown == 0) {
	            $(obj).html("获取验证码");
	            countdown = 60;
	            return;
	        } else {
	            $(obj).html(countdown + " s");
	            countdown--;
	        }
	        setTimeout(function() {
                settime(obj) }
            ,1000)
	    }
	};
	
//	城市选择
//	点击请求数据时,页面显示加载中动画 $(".spinner_box").show();
	var flag = true;
	$("#city").on("click", function(e){
		$('body').scrollTop(0);
		$(".loan_box").css("left","-100%");
		$(".city_list_box").show();
		$(".car_list_box").hide();
		var prov = $(".city_inp").attr('province');
		var citys = $(".city_inp").attr('city');
		if(prov != ""){
			$(".province_ul li").removeClass("onli");
			$(".province_ul li").each(function(){
				var pro = $(this).attr("province-name");
				if(prov == pro){
					$(this).addClass("onli");
				}
			});
			fn_city(prov,citys);
		}else{
			$(".province_ul li").each(function(){
				var pro = $(this).attr("province-name");
				if(pro == "北京"){
					$(this).addClass("onli");
				}
			});
			fn_city('北京','北京');
		} 

		if(flag == true){
			var scroll1 = new BScroll(city_left, {
		   		click:true
		 	});
		}
		flag = false;
	});
		$(".province_ul li").on("click",function(){
			$(".province_ul li").removeClass("onli");
			$(this).addClass("onli");
			var citys = $(this).attr("province-name");
			fn_city(citys);
			$(".city_right").scrollTop(0);
		});
		
		function fn_city(citys,cityn){
			$("#city_ul").scrollTop(0);
			$.each(citys_list,function(i,item){
				var txts = item.citys;
				var ul = '<ul class="city_ul">';							
				if(citys == item.provinceName){
					for(var i=0;i<txts.length;i++){
						if(txts[i].citysName == cityn){
							var li = "<li city-name='"+txts[i].citysName+"' class='li_ok'>";
						}else{
							var li = "<li city-name='"+txts[i].citysName+"'>";							
						}
						li += txts[i].citysName ;
						li += "</li>"
						ul += li;
					}
					$("#city_ul").html(ul);
				};
			});
			// 城市点击
			$("#city_ul li").on("click",function(){
				var txt = $(this).html();
				$(".loan_box").css("left","0");
				var city = citys+'-'+txt;
				$(".city_inp").val(city);
				$(".city_inp").attr("province",citys);
				$(".city_inp").attr("city",txt);
				$(".city_inp").addClass("inp_font");
				$(".city .p_top").animate({marginTop:"0"}).css("color","#b6b5b6");
				inp_val()
			});
		}
//	汽车品牌选择
	$("#car").on("click",function(){
		$('body').scrollTop(0);
		$(".loan_box").css("left","-100%");
		$(".car_list_box").show();
		$(".city_list_box").hide();
		var car_name = $(".inp_car").attr("bran-name");
		if(car_name != ""){
			$(".cities_hook li").each(function(){
				var cars = $(this).attr("data-name");
				if(car_name == cars){
					$(".cities_hook li").removeClass("onli");
					$(this).addClass("li_ok");
				}
			});
		}else{
			$(".cities_hook li").removeClass("onli");
			
		}
	})
//	渲染汽车品牌列表
//	点击请求数据时,页面显示加载中动画 $(".spinner_box").show();
	var carWrapper = document.querySelector('.car_list_hook'),carScroller = document.querySelector('.scroller_hook'),cities = document.querySelector('.cities_hook'),shortcut = document.querySelector('.shortcut_hook'),car_list_bot = document.querySelector('.car_list_bot');
		var scroll;
		var shortcutList = [];
		var anchorMap = {};
		function initCities() {
			var y = 0,titleHeight = 28,itemHeight = 44,lists = '';
			var lists = '';
			var ul = '<ul class="shortcut_ul">';
			$.each(cars_list,function(i,item){
				var name = item.name;
				lists += '<div class="title">'+name+'</div>'; 
    				lists += '<ul>';
    				$.each(item.carlist,function(k,items){
						var txts = items.series;
    					lists += '<li class="item itemli" data-name="'+ items.name +'"><p data-name="'+ items.name +'" data-id="'+ items.carid +'">' + items.name +'</p></li>';
    					$(document).on("click",".itemli",function(e){
							var txt = e.target.getAttribute('data-name');
							$(".itemli").removeClass("li_ok")
							if(txt == items.name){
								var tp = "<p class='p_title'>"+items.name+"</p>"
								$(".car_list_botul").append(tp);
    							for(var i=0;i<txts.length;i++){
    								var lis = "<li brand='"+items.name+"' car='"+txts[i]+"'><p>" + txts[i] + "</p></li>"
    								$(".car_list_botul").append(lis);
    							}
							};
							$(".car_conf").attr("car",txt);
						})

    				});
    				lists += '</ul>';
			    var name = item.name.substr(0, 1);
			    shortcutList.push(name);
			    ul += '<li data-anchor="'+name+'" class="item">'+name+'</li>';
			    var len = item.carlist.length;
			    anchorMap[name] = y;
			    y -= titleHeight + len * itemHeight;
			 
			});
			ul += '</ul><div class="jump_tips"></div>';

			cities.innerHTML = lists;
			shortcut.innerHTML = ul;
			shortcut.style.top = (carWrapper.clientHeight - shortcut.clientHeight) / 2 -30 + 'px';
			
		  	scroll = new window.BScroll(carWrapper, {
		   		probeType: 3,
		   		click:true
		 	 });
			  scroll.scrollTo(0, 0);
		};
		function bindEvent() {
			var touch = {};
		  	var firstTouch;
		  	shortcut.addEventListener('touchstart', function (e) {
		    	var anchor = e.target.getAttribute('data-anchor');
		    	firstTouch = e.touches[0];
		    	touch.y1 = firstTouch.pageY;
		    	touch.anchor = anchor;
		    	$(".jump_tips").show();
		    	$(".jump_tips").html(anchor);
		    	scrollTo(anchor);
				e.preventDefault();
		   		e.stopPropagation();
		  	});
		   	shortcut.addEventListener('touchend', function (e) {
		    	$(".jump_tips").hide();
		  	});
		  	shortcut.addEventListener('touchmove', function (e) {
			    firstTouch = e.touches[0];
			    touch.y2 = firstTouch.pageY;
			    var anchorHeight = 16;
			    var delta = (touch.y2 - touch.y1) / anchorHeight | 0;
			    var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];
			    $(".jump_tips").html(anchor);
			    scrollTo(anchor);
			    e.preventDefault();
			    e.stopPropagation();
		  });
		  	function scrollTo(anchor) {
			    var maxScrollY = carWrapper.clientHeight - carScroller.clientHeight;
			    var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));
			    if (typeof y !== 'undefined') {
			      scroll.scrollTo(0, y);
			    }
		  	}
		};
		
	initCities();
	bindEvent();
	// 取消按钮
	$(".cancel").on("click",function(){
		$(".loan_box").css("left","0");
		inp_val();
		setTimeout(function(){
			$(".list_one").show();
			$(".list_two").hide();
			$(".car_list_botul li").remove();
			$(".car_list_botul p").remove();
			
			$(".province_ul li").removeClass("onli");
		},500)
		
	})
	// 点击返回车辆品牌
	$(".get_car").on("click",function(){
		$(".list_one").show();
		$(".list_two").hide();
		$(".car_list_botul li").remove();
		$(".car_list_botul p").remove();
	})
	// 汽车品牌选择
	$(document).on("click",".cities_hook li",function(){
		$(".cities_hook li").removeClass("onli");
		$(this).addClass("onli");
		$(".list_one").hide();
		$(".list_two").show();
	});
	// 点击选择车系
	$(document).on("click",".car_list_botul li",function(){
		var car = $(this).find('p').html();
		var bran = $(this).attr('brand');
		$(".loan_box").css("left","0");
		$(".inp_car").attr('car-name',car);
		$(".inp_car").attr('bran-name',bran);
		$(".inp_car").val(bran+'-'+car);
		$(".inp_car").addClass("inp_font");
		$(".car .p_top").animate({marginTop:"0"}).css("color","#b6b5b6");
		setTimeout(function(){
			$(".list_one").show();
			$(".list_two").hide();
			$(".car_list_botul li").remove();
			$(".car_list_botul p").remove();
		},500);
		inp_val()
	});
//	拨打电话
	$(".phone").on("click",function(){
		layer.open({
			type:0,
			skin:"phone_show",
			content:$(".phone_show").html(),
	
		})
	});
	$(document).on("click",".close",function(){
		layer.closeAll();
	});
	// 提交按钮手机号错误点击提示
	$(".btn").on("click",function(){
		var money_inp = $(".money_inp").val();
		var inp_car = $(".inp_car").val();
		var car_code = $(".car_code").val();
		var name_inp = $(".name_inp").val();
		var phone_inp = $(".phone_inp").val();
		var code_inp = $(".code_inp").val();
		var city_inp = $(".city_inp").val();
		var carcode = isVehicleNumber($(".car_code").val());
		if(money_inp == "" || inp_car == "车辆型号" || city_inp == "所在地区" || name_inp == "" || code_inp == ""){
			return false;
		}else if(carcode == false){
			$(".car_code").focus();
			layer.open({
				style:'background-color:#393b41;color:#fff;',
				time: 2,
				skin:'code_show',
				shade: false,
				content:'<span class="iconfont">&#xe68d;</span><p>请输入正确的车牌号码</p>'
			});
			return false;
		}else if(!(/^1[34578]\d{9}$/.test($(".phone_inp").val()))){
				$(".phone_inp").focus();
				layer.open({
					style:'background-color:#393b41;color:#fff;',
					time: 2,
					skin:'code_show',
					shade: false,
					content:'<span class="iconfont">&#xe68d;</span><p>请输入正确的手机号</p>'
				});
				return false;
		}
	});
	function inp_val(){
		var money_inp = $(".money_inp").val();
		var inp_car = $(".inp_car").val();
		var car_code = $(".car_code").val();
		var name_inp = $(".name_inp").val();
		var phone_inp = $(".phone_inp").val();
		var code_inp = $(".code_inp").val();
		var city_inp = $(".city_inp").val();
		var carcode = isVehicleNumber($(".car_code").val());
		$("#loan_list input").each(function(){
			if($(this).val() != "" && inp_car != "车辆型号" && city_inp != "所在地区" && carcode == true && (/^1[34578]\d{9}$/.test($(".phone_inp").val()))){
				$(".btn").addClass("loadn_btn");
			}else{
				$(".btn").removeClass("loadn_btn");
			}
		})
	}
	function isVehicleNumber(vehicleNumber) {
      var res = false;
      if (vehicleNumber.length == 7){
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        res = express.test(vehicleNumber);
      }
      return res;
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
})
