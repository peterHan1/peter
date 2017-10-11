require('./index.scss');
var _tips = require('util/tips/index.js');

$(function(){
	$('.icon li').mouseover(function(){
		_tips.getTipsRight($(this),3);
	});

	$('.icon li').mouseout(function(){
		$(this).find('.tips').hide();
	});
	$(".menu_list").on("click",function(){
		if($(this).siblings('div').css('display')=='block'){
			$(this).siblings('div').slideUp();
			$(this).find('span').html('&#xe83d;');
		}else{
			$(this).siblings('div').slideDown();
			$(this).find('span').html('&#xe6a4;');
		}
	});
});