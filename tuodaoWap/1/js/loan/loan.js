$(function(){
	//	清空
	$(".loan li .empty").on("mousedown",function(){
		$(this).siblings("input").val("");
	});
	$(".loan li input").focus(function(){
		var clas = $(this).attr("class");
		$(this).parent(".div_bot").addClass("inp_bot");
		$(this).parents("li").find(".p_top").show();
		$(this).parents("li").find(".p_top").css("color","#ff7400");
		$(this).siblings("div").show();
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
	$(".loan li input").blur(function(){
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
			$(this).parents("li").find(".p_top").hide();
		}else{
			$(this).parents("li").find(".p_top").css("color","#b6b5b6");
			
		}
	});

//	手机号验证
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
//	验证码获取
	$(".code_btn").on("click",function(){
		if($(".phone_inp").val() == ""){
			layer.open({
				style:'background-color:#393b41;color:#fff;',
				time: 2,
				shade: false,
				content:'请输入正确的手机号'
			})
		}else{
			layer.open({
				style:'background-color:#393b41;color:#fff;',
				time: 2,
				shade: false,
				content:'验证码已发送，请注意查收'
			})
	  		invokeSettime($(this));
		}
		
	});
	//	验证码错误
	/*layer.open({
		style:'background-color:#393b41;color:#fff;',
		time: 2,
		shade: false,
		content:'验证码错误，请重新输入'
	})*/
//	验证码发送失败
	/*layer.open({
		style:'background-color:#393b41;color:#fff;',
		time: 2,
		shade: false,
		content:'验证码发送失败，请重新获取'
	})*/
//	申请加盟按钮
	$(".btn").on("click",function(){
		layer.open({
			time: 2,
			skin:'mess_show',
			shade: false,
			content:'您今天已提交过借款申请，我们会尽快联系您',
			btn:'知道了',
			yes: function(){
				 layer.closeAll();
			}
		});
		/*layer.open({
			time: 2,
			skin:'mess_show',
			shade: false,
			content:'您今天的借款申请次数已达上限，我们会尽快联系您',
			btn:'知道了',
			yes: function(){
				 layer.closeAll();
			}
		})*/
	})
	function invokeSettime(obj){
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
	
	//	汽车品牌选择
	$("#car").on("click",function(){
		$(".loan_box").css("left","-100%");
		$(".car_list_box").show();
		$(".city_list_box").hide();
		var car_name = $(".inp_car").attr("car-name");
		if(car_name != ""){
			$(".cities_hook li").removeClass("onli");
		}
	})
//	城市选择
	var flag = true;
	$("#city").on("click", function(e){
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
			$(".city_right").scrollTop("0");
		});
		
		function fn_city(citys,cityn){
			$("#city_ul").scrollTop("0");
			$.each(citys_list,function(i,item){
				var txts = item.citys;
				var ul = '<ul class="city_ul">';							
				if(citys == item.provinceName){
					for(var i=0;i<txts.length;i++){
						if(txts[i].citysName == cityn){
							var li = "<li city-name='"+txts[i].citysName+"' class='onli'>";
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
			$("#city_ul li").on("click",function(){
				console.log(666);
				var txt = $(this).html();
				$(".city_ul li").removeClass("onli");
				$(this).addClass("onli");
				$(".loan_box").css("left","0");
				var city = citys+'-'+txt;
				$(".city_inp").val(city);
				$(".city_inp").attr("province",citys);
				$(".city_inp").attr("city",txt);
				$("#city_p").html(city);
				$(".city .p_top").show().css("color","#b6b5b6");
			});
		}

//	汽车品牌列表
	
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
    					lists += '<li class="item itemli" data-name="'+ items.name +'" data-id="'+ items.carid +'">' + items.name +'</li>';
    					$(document).on("click",".itemli",function(e){
							var txt = e.target.getAttribute('data-name');
							if(txt == items.name){
    							for(var i=0;i<txts.length;i++){
    								var lis = "<li>" + txts[i] + "</li>"
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
	$(".cancel").on("click",function(){
		$(".loan_box").css("left","0");
		setTimeout(function(){
			$(".list_one").show();
			$(".list_two").hide();
			$(".car_list_botul li").remove();
			$(".province_ul li").removeClass("onli");
		},500)
		
	})
	$(".get_car").on("click",function(){
		$(".list_one").show();
		$(".list_two").hide();
	})
	$(document).on("click",".cities_hook li",function(){
		$(".cities_hook li").removeClass("onli");
		$(this).addClass("onli");
		$(".list_one").hide();
		$(".list_two").show();
	});
	$(document).on("click",".car_list_botul li",function(){
		var car = $(this).html();
		$(".car_list_botul li").removeClass("onli");
		$(this).addClass("onli");
		$(".loan_box").css("left","0");
		$(".inp_car").attr('car-name',car);
		$(".inp_car").val(car);
		$("#car_p").html(car);
		$(".car .p_top").show().css("color","#b6b5b6");
		setTimeout(function(){
			$(".list_one").show();
			$(".list_two").hide();
			$(".car_list_botul li").remove();
		},500)
	});
//	拨打电话
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
})