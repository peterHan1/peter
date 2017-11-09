require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./help.scss');
require('./index.js');
$('#top ul li').eq(3).find('a').css('color','#ff7400');
$('.content li a').on({
	mouseover:function(){
		$(this).css('color','#ff7400');
		$(this).find('.iconfont').css('color','#ff7400');
	},
	mouseout:function(){
		$(this).css('color','#333333');
		$(this).find('.iconfont').css('color','#9e9e9e');
	}
})

$('.content li a').on('click',function(){
	if($(this).parent().find('dl').css('display')=='block'){
		$(this).parent().find('dl').slideUp();
		$(this).css('color','#333333');
		$(this).find('.iconfont').css('color','#9e9e9e').html('&#xe69a;');
		$(this).on({
			mouseover:function(){
				$(this).css('color','#ff7400');
				$(this).find('.iconfont').css('color','#ff7400');
			},
			mouseout:function(){
				$(this).css('color','#333333');
				$(this).find('.iconfont').css('color','#9e9e9e');
			}
		});
	}else{
		$(this).parent().find('dl').slideDown();
		$(this).css('color','#ff7400');
		$(this).find('.iconfont').css('color','#ff7400').html('&#xe69c;');
		$(this).off('mouseover mouseout');
	}
	/*$(this).css('color','#ff7400').off('mouseover mouseout');
	$(this).parent().siblings().find('a').css('color','#333333');
	$(this).parent().siblings().find('.iconfont').css('color','#9e9e9e').html('&#xe69a;');
	$(this).parent().siblings().find('dl').slideUp();
	$(this).parent().siblings().find('a').on({
		mouseover:function(){
			$(this).css('color','#ff7400');
			$(this).find('.iconfont').css('color','#ff7400');
		},
		mouseout:function(){
			$(this).css('color','#333333');
			$(this).find('.iconfont').css('color','#9e9e9e');
		}
	});*/
})
