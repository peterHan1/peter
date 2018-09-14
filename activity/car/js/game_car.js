$(function(){
	//未登录显示弹窗
//	$(".layer_login").show();
//	$(".layer_login .game_login").animate({
//       top : "8%"
//  },500);
	// 规则点击
	$("#btn_rule").on("click",function(){
		$(this).addClass("btn_rule");
		$(".layer_Canon").show();
		$(".layer_Canon .layer_rule").animate({
            top : "8%"
        },500);
	});
	//剩余次数点击
	$(".game_num").on("click",function(){
		
	});
	//增加游戏次数
	$(".game_add").on("click",function(){
		
	});
	//开奖
	$(".get_award").on("click",function(){
		$(".award_bg img").attr("src","image/money56.png");
		$(".game_resets").addClass("game_reset")
		$(".get_award").hide();
		$(".award_user").hide();
		$(".award_txt").html("抵用券66元").show();
	});
	// 重玩
	$(".game_resets").on("click",function(){
		window.location.reload();
	});
	$(".game_reset").on("click",function(){
		window.location.reload();
	});
	function openLayer() {
		//奖品弹窗
		$(".layer_award").show();
		$(".layer_award .layer_cont").animate({
            top : "8%"
        },300);
		//次数用完弹窗
//		$(".layer_over").show();
//		$(".layer_over .game_over").animate({
//			top : "8%"
//		},300);
	}
	var arr = [];
	var x = document.getElementById("car_list");
	var y = document.getElementById("car_1");
	var z = document.getElementById("car_2");
	z.innerHTML = y.innerHTML;
	function marquee() {
		if(x.scrollLeft >= z.offsetWidth) {
			x.scrollLeft -= y.offsetWidth;
		} else {
			x.scrollLeft++;
		}
		for(var i = 0; i < $('#car li').length; i++) {
			arr[i] = ($('#car li').eq(i).offset().left);
		}
	}
	setInterval(
    function autoScroll(){
        $('.game_list').find("ul").animate({
            marginTop : "0.45rem"
        },500,function(){
            $(this).css({marginTop : "0px"}).find("li:last").prependTo(this);
        })
    },
    3000);
	var car_run = setInterval(marquee, 15);
	var zhuaLeft = $(".claws").offset().left;
	var zhuaR = $(".claws").offset().left - $(".claws").width();
	var ff = false;
	//点击抓车
	$("#btn_go").on("click",function(){
		var _this = $(this);
		if(_this.hasClass("btn_go")){
			return false;
		}else{
			_this.addClass("btn_go");
   			var top = $('#car').offset().top - 22;
			$('.game_line').animate({
				height: top + 'px'
			}, 1700, function() {
				$('.claws').attr("src","image/claws_close.png");
				$('.claw').hide();
				for(var i = arr.length - 1; i >= 0; i--) {
					if(arr[i] >= zhuaR && arr[i] <= zhuaLeft) {
						ff = true
						le = i % 8 + 1;
						var bgc = $('.d' + le).html().replace('gif', 'png');
						$('.d' + le).html('');
						$('#result').addClass('car' + le);
						$('#result').css('top', $('#car_list li').eq(i).offset().top + 'px');
						$('#result').css('left', $('#car_list li').eq(i).offset().left + 'px');
						$('#result').html(bgc);
						setTimeout(function() {
							$('#result').animate({
								top: "1rem"
							}, 2000)
						}, 1000)
					}
				};
				if(!ff) {
					$('.claws').attr("src","image/claws_close.png");
					$('.claw').show();
				}
			setTimeout(function() {
				$('.game_line').animate({
					height: 0.7 + 'rem'
				}, 2000, function() {
					_this.removeClass("btn_go");
					if(ff) {
						$('.claws').attr("src","image/claws_bg1.png");
						$('.claw').show();
						openLayer();
					} else {
						$('.claws').attr("src","image/claws_bg1.png");
						$('.claw').show();
					}
				});
			}, 1000)
			});
		}
	});
	$("#btn_music").on("click",function(){
		var _this = $(this);
		autoPlay();
		if(_this.hasClass("btn_music")){
			_this.removeClass("btn_music");
		}else{
			$(this).addClass("btn_music");
		}
	});
	$(".play_car").on("click",function(){
		$(".layer_Canon .layer_rule").animate({
            top : "-100%"
        },500);
        setTimeout(function() {
        	$(".layer_Canon").hide();
       		$("#btn_rule").removeClass("btn_rule");
        }, 500);
	});
	function autoPlay() {
        var myAuto = document.getElementById('car_music');
        if(myAuto.paused){                 
		    myAuto.play();
		}else{
			myAuto.pause();
		}
		

    };1
	var audioStatus = "paused";
	var audio = document.getElementById("car_music");
	audio.addEventListener("playing", function(){
		audioStatus = "playing";
	});
	setTimeout(function() {
    	if(audioStatus != "playing"){
			$("#btn_music").addClass("btn_music");
		}else{
			$("#btn_music").removeClass("btn_music");
		}
    },100)

	
})