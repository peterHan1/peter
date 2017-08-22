require('./layout.scss');
$('#navigate li').mouseover(function(){
	// console.log($(this).children().length);
	// $('#navigate li').find('dl').show();
	 // $('#navigate li dl .iconfont').css('-webkit-transform','rotate(180deg)');
	// console.log($(this).parent().children().length);
	if($(this).children().length>1){
		$(this).find('dl').show();
		$(this).addClass('on');
	}
	// $('#navigate li dl .iconfont').css({'-webkit-transform':'rotate(180deg)'});
	// $('#navigate li dl .iconfont').animate({
	// 	webkitTransform:'rotate(180deg)'
	// });
	// $(this).find('a').addClass('on');
	// 
	// $('#navigate li dl .iconfont').css('-webkit-transform','rotate(180deg)');
	// }
	// $('#navigate li').removeClass('on');
});
$('#navigate li').mouseout(function(){

	// alert(1)
	// $('#navigate li').removeClass('hover');
	$('#navigate li').find('dl').hide();
	$('#navigate li').removeClass('on');
});
console.log(1);

