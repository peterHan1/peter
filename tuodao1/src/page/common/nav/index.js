require('./index.scss');
$(function(){
	$('#navigate li, .uc').mouseover(function(){
		if($(this).children().length>1){
			$(this).find('dl').show();
			$(this).addClass('on');
			// alert($(this).html());
		}
	});
	$('#navigate li, .uc').mouseout(function(){

		$(this).find('dl').hide();
		$(this).removeClass('on');
	});

	$(window).scroll(function(){
		var h = $(window).scrollTop();
		var topH = $('.top').height();
		var srcNavH = $('#src-nav').height();
		var fs = true;
		if(h>(topH+srcNavH-10)){
			$(".scrool-nav").stop();
			$('.scrool-nav').animate({
				top:"0"
			});
		}else{
			$(".scrool-nav").stop();
			$('.scrool-nav').animate({
				top:"-80px"
			},10);

			fs = true;
			// $('.scrool-nav').hide();
		}
	});
});