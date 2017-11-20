require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./help.scss');
require('./index.js');

var _paging = require('util/paging/index.js');
_paging.paging('pageList',100,1);
var help = {
	init : function(){
		this.rightMouseover();
		this.rightClick();
		this.leftMouseover();
		this.leftClick();
		this.tabCut();
		$('#top ul li').eq(3).find('a').css('color','#ff7400');
	},
	leftMouseover:function(){
		$('.menu_left li').on({
			mouseover:function(){
				$(this).css('color','#ff7400');
			},
			mouseout:function(){
				$(this).css('color','#9e9e9e');
			}
		})
	},
	leftClick : function(){
		$('.menu_left li').on('click',function(){
			var index=$(this).index();
			$(this).css('color','#ff7400');
			$(this).siblings().css('color','#9e9e9e');
			$(this).off('mouseover mouseout');
			$('.content').children().eq(index).show().siblings().hide();
			$(this).siblings().on({
				mouseover:function(){
					$(this).css('color','#ff7400');
				},
				mouseout:function(){
					$(this).css('color','#9e9e9e');
				}
			})
			if(index==13){
				$('.main').hide();
				$('.encyclopedia').show();
			}
		})
	},
	rightMouseover:function(){
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
	rightClick : function(){
		$('.content li .mouseover').on('click',function(){
			if($(this).parent().find('dl').css('display')=='block'){
				$(this).parent().find('dl').hide();
				help.HeightAuto();
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
				$(this).parent().find('dl').show();
				help.HeightAuto();
				$(this).css('color','#ff7400');
				$(this).find('.iconfont').css('color','#ff7400').html('&#xe69c;');
				$(this).off('mouseover mouseout');
			}
		})
	},
	// 控制菜单栏与右侧内容实时等高
	HeightAuto : function(){
		$('.content').height('auto');
		var hR = $('.content').height();
		if(hR>=980){
			$(".menu_left").height(hR);
		}else{
			$(".menu_left").height(980);
			$(".content").height(980);
		}
	},
	tabCut : function(){
		$('.cztx_menu a').on('click',function(){
			var index=$(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.cztx_con').children().eq(index).show().siblings().hide();
		})
	}
}
$(function(){
	help.init();
})