require('./index.scss');
$(function(){
	$('#navigate li, .uc').mouseover(function(){
		if($(this).children().length>1){
			$(this).find('dl').show();
			$(this).addClass('on');
		}
	});
	$('#navigate li, .uc').mouseout(function(){
		$(this).find('dl').hide();
		$(this).removeClass('on');
	});


	$('#navigate a').each(function () {
		if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
			$(this).addClass('cur');
		} else {
			$(this).removeClass('cur');
		}
	});

	$(window).scroll(function(){
		var h = $(window).scrollTop();
		var topH = $('.top').height();
		(h>topH) ?	$(".scroll-nav").addClass('active') : $(".scroll-nav").removeClass('active');
	});
});