var _tips = require('util/tips/index.js');

$(function(){
	$(".hint").mouseover(function(){
		_tips.getTipsRight($(this),0);
	});

	$(".hint").mouseout(function(){
		$(this).find('.tips').hide();
	});
	$(".sigin_btn").on("click",function(){
		console.log(666);
	});
});