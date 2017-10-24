require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./help.scss');
require('./index.js');

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
	if($(this).find('.iconfont').html()=='&#xe69c;'){
		$(this).parent().find('dl').slideUp();
		$(this).css('color','#333333');
		$(this).find('.iconfont').css('color','#9e9e9e').html('&#xe69a;');
	}else{
		$(this).parent().find('dl').slideDown();
		$(this).css('color','#ff7400');
		$(this).find('.iconfont').css('color','#ff7400').html('&#xe69c;');
	}
	$(this).css('color','#ff7400').off('mouseover mouseout');
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
	});
})
