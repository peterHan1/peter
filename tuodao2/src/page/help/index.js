require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./help.scss');
require('./index.js');

var help = {
	init : function(){
		this.leftMouseover();
		this.rightMouseover();
		$('#top ul li').eq(3).find('a').css('color','#ff7400');
	},
	leftMouseover:function(){
		$('.content li .mouseover').on({
			mouseover:function(){
				$(this).css('color','#ff7400');
				$(this).find('.iconfont').css('color','#ff7400');
			},
			mouseout:function(){
				$(this).css('color','#333333');
				$(this).find('.iconfont').css('color','#9e9e9e');
			}
		})
	},
	rightMouseover : function(){
		$('.content li .mouseover').on('click',function(){
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
		})
	}
}
$(function(){
	help.init();
})