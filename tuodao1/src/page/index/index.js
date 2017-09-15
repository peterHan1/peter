require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./index.scss');
require('util/flexslider/index.js');

var templateBanner  	= require('./banner.string');
var templateProduct  	= require('./product.string');
var templateActivity  	= require('./activity.string');
var  _td 				= require('util/td.js');
$(function(){
	var bannerHtml 		= _td.renderHtml(templateBanner);
	var productHtml 	= _td.renderHtml(templateProduct);
	var activityHtml 	= _td.renderHtml(templateActivity);
	$('.flexslider').html(bannerHtml);
	$('.index-product').html(productHtml);
	$('.activity').html(activityHtml);
	$('.flexslider').flexslider({
		directionNav 	: true,
		pauseOnAction 	: false,
		pauseOnHover 	: true,
		slideshowSpeed 	: 3000
	});
	$('.swap').html($('.news-li').html());
	x = $('.news-li');
	y = $('.swap');
	h = $('.news-li li').length * 20;
	var hh=$('.news-li li').length;
	if(hh>1)
		b();

	function b(){
		t = parseInt(x.css('top'));
		y.css('top','20px');
		x.animate({top: t - 20 + 'px'},'slow');
		if(Math.abs(t) == h-20){
			y.animate({top:'0px'},'slow');
			z=x;
			x=y;
			y=z;
		}
		setTimeout(b,3000);
	}
	$('.index-main li').hover(function(){
		// console.log();
		$(this).find('.now-invest').show();
	},function(){
		$(this).find('.now-invest').hide();
	});
	// $('.banner img').load(function(){	
	// });
});
console.log('this is index~~~~~');

