require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./help.scss');
require('./index.js');

var help = {
	init : function(){
		this.rightMouseover();
		this.rightClick();
		this.leftMouseover();
		this.leftClick();
		this.tabCut();
		this.openPage();
	},
	openPage : function(){
		var url = window.location.search;
        url = url.toString();// 转换成字符串
        var array = new Array();// 用来存放分分割后的字符串
        array = url.split("?");
        if (array[1] == 'newcomer') {
			$('.menu_left li').eq(1).off('mouseover mouseout');
			$('.menu_left li').eq(1).addClass('color').siblings().removeClass('color');
			$('.content').children().eq(1).show().siblings().hide();
        }else{
        	$('.menu_left li').eq(0).off('mouseover mouseout');
        }
	},
	leftMouseover:function(){
		$('.menu_left li').on({
			mouseover : function(){
				$(this).addClass('color');
			},
			mouseout : function(){
				$(this).removeClass('color');
			}
		})
	},
	leftClick : function(){
		$('.menu_left li').on('click',function(){
			var index = $(this).index();
			$(this).addClass('color').siblings().removeClass('color');
			$(this).off('mouseover mouseout');
			$('.content').children().eq(index).show().siblings().hide();
			help.HeightAuto();
			$(this).siblings().on({
				mouseover : function(){
					$(this).addClass('color');
				},
				mouseout : function(){
					$(this).removeClass('color');
				}
			})
		})
	},
	rightMouseover:function(){
		$('.content li .mouseover').on({
			mouseover : function(){
				$(this).css('color','#ff7400');
				$(this).find('.iconfont').css('color','#ff7400');
			},
			mouseout : function(){
				$(this).css('color','#333333');
				$(this).find('.iconfont').css('color','#9e9e9e');
			}
		})
	},
	rightClick : function(){
		$('.content li .mouseover').on('click',function(){
			if ($(this).parent().find('dl').css('display') == 'block') {
				$(this).parent().find('dl').hide();
				help.HeightAuto();
				$(this).css('color','#333333');
				$(this).find('.iconfont').css('color','#9e9e9e').html('&#xe69a;');
				$(this).on({
					mouseover : function(){
						$(this).css('color','#ff7400');
						$(this).find('.iconfont').css('color','#ff7400');
					},
					mouseout : function(){
						$(this).css('color','#333333');
						$(this).find('.iconfont').css('color','#9e9e9e');
					}
				});
			} else {
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
		if (hR >= 980) {
			$(".menu_left").height(hR);
		} else {
			$(".menu_left").height(980);
			$(".content").height(980);
		}
	},
	tabCut : function(){
		$('.cztx_menu a').on('click',function(){
			var index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.cztx_con').children().eq(index).show().siblings().hide();
		})
	}
}
$(function(){
	help.init();
})