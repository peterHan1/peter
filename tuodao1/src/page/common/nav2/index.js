require('./index.scss');
var _tips = require('util/tips/index.js');
$(function(){
	$('.nav2 dd').mouseover(function(){
		_tips.getTips($(this));
	});

	$('.nav2 dd').mouseout(function(){
		$(this).find('.tips').hide();
	});

});