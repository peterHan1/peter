$(function(){
	$(".car_btn").on("click",function(){
		$(".box").css("left","-100%");
		$(".car_list_box").show();
		$(".city_list_box").hide();
		
		$(".car_btn b").removeClass("bcolor");
		$(".car_conf").attr("car","");
		$(".car_conf").attr("car-data","");
	})
	var flag = true;
	$("#city_text").on("click", function(e){
		$(".box").css("left","-100%");
		$(".city_list_box").show();
		$(".car_list_box").hide();
		if(flag == true){
			var scroll1 = new BScroll(city_left, {
		   		probeType: 3,
		   		click:true
		 	});
		}
		flag = false;
	});

	

	$(".province_ul li").on("click",function(){
		$(".province_ul li").removeClass("onli");
		$(this).addClass("onli");
		var citys = $(this).attr("province-name");
		console.log(citys)
		
		$.ajax({
			url: 'js/loan/city.json',
			type: 'get',
			success:function(data){
				$.each(data,function(i,item){
					var txts = item.citys;
					var ul = '<ul class="city_ul">';							
					if(citys == item.provinceName){
						for(var i=0;i<txts.length;i++){
							var li = "<li>"+ txts[i].citysName +"</li>";
							ul += li;
						}
						$("#city_ul").html(ul);
					};
				});
				var scroll2 = new BScroll(city_ul, {
			   		probeType: 3,
			   		click:true
				});	
				
				$("#city_ul li").on("click",function(){
					console.log(666);
					var txt = $(this).html();
					$(".city_ul li").removeClass("onli");
					$(this).addClass("onli");
					$(".box").css("left","0");
					var city = citys+'-'+txt;
					$("#city_text").val(city);
				});
			}
			
		})
	});
	
	
		var carWrapper = document.querySelector('.car_list_hook'),carScroller = document.querySelector('.scroller_hook'),cities = document.querySelector('.cities_hook'),shortcut = document.querySelector('.shortcut_hook'),car_list_bot = document.querySelector('.car_list_bot');
		var scroll;
		var shortcutList = [];
		var anchorMap = {};
		function initCities() {
			var y = 0,titleHeight = 28,itemHeight = 45,lists = '';
			var lists = '';
			var ul = '<ul class="shortcut_ul">';
		   $.ajax({
				 url: 'js/loan/car.json',
				 type: 'get',
				 success:function(data){
					$.each(data,function(i,item){
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
				 }
			});	 
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
			$(".box").css("left","0");
			setTimeout(function(){
				$(".list_one").show();
				$(".list_two").hide();
//				$(".car_list_botul li").remove();
			},500)
			
		})
		$(".get_car").on("click",function(){
			$(".list_one").show();
			$(".list_two").hide();
//			$(".car_list_botul li").remove();
		})
		$(document).on("click",".cities_hook li",function(){
			$(".cities_hook li").removeClass("onli");
			$(this).addClass("onli");
			$(".list_one").hide();
			$(".list_two").show();
//			$(".car_list_botul li").remove();	
		});
		$(document).on("click",".car_list_botul li",function(){
			var car = $(this).html();
			$(".car_list_botul li").removeClass("onli");
			$(this).addClass("onli");
			$(".box").css("left","0");
			$("#car_text").val(car);
			setTimeout(function(){
				$(".list_one").show();
				$(".list_two").hide();
//				$(".car_list_botul li").remove();
			},500)
		});
		

})
