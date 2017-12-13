require('./index.scss');
$(function(){
	$('.info_tab a').each(function () {
		if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
			$(this).addClass('on');
		} else {
			$(this).removeClass('on');
		}
	});

});