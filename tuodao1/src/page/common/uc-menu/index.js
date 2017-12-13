require('./index.scss');
var _tips 		= require('util/tips/index.js');
var _td			= require('util/td.js');
var _apigetuc 	= require('api/user-api.js');
var accountPho	= require('./uc_menu.string');

var _operate = require('api/operate-api.js');
var menuList = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		this.eachA();
		this.eventFn();
		this.liHover();
		this.elHeight();
		this.addHmtl(headerData);
	},
	eventFn : function(){
		$(".menu_list").on("click",function(){
			if($(this).siblings('div').css('display')=='block'){
				$(this).siblings('div').slideUp();
				$(this).find('span').html('&#xe83d;');
			}else{
				$(this).siblings('div').slideDown();
				$(this).parent().siblings('li').find(".menu_fund").slideUp();
				$(this).parent().siblings('li').find(".menu_list").find('span').html('&#xe83d;');
				$(this).find('span').html('&#xe6a4;');
				var url=$(this).siblings("div").find("a").eq(0).attr("href");
				var flag = false;
				var menu_a = $(this).parent("li").find('.menu_fund a');
				$.each(menu_a,function(){
					var locat = location.href;
					var thisa = $(this).attr('href');
					var symbol = locat.indexOf("?");
					var symbols = thisa.indexOf("?");
					var href1 = locat.substring(0,symbol);
					var href2 = thisa.substring(0,symbols);
					if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href')!="" || location.href.indexOf($(this).attr('details')) > -1 || href1.indexOf(href2)>0) {
						flag = true;
						return false;
					}
				});
				if(flag != true){
					window.location.href=url;
				}
			}
		});
	},
	eachA : function(){
		$('.menu_bot li a').each(function(){
			var locat = location.href;
			var thisa = $(this).attr('href');
			var symbol = locat.indexOf("?");
			var symbols = thisa.indexOf("?");
			var href1 = locat.substring(0,symbol);
			var href2 = thisa.substring(0,symbols);
			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href')!="" || location.href.indexOf($(this).attr('details')) > -1 || href1.indexOf(href2)>0) {
				$(this).addClass('menu_on');
				$(this).parent(".menu_fund").show();
				$(this).parent(".menu_fund").siblings(".menu_list").find("span").html("&#xe6a4;");
			} else {
				$(this).removeClass('menu_on');
			}
		});
	},
	liHover : function(){
		$('.icon li').mouseover(function(){
			_tips.getTipsRight($(this),3);
		});
		$('.icon li').mouseout(function(){
			$(this).find('.tips').hide();
		});
	},
	elHeight : function(){
		// 左右内容的高度
		var hL = $('.uc_menu').height();
		var hR = $('.uc_menu').siblings('div').height();
		if(hR>=hL){
			$(".uc_menu").height(hR);
			$('.uc_menu').siblings('div').height(hR);
		}else{
			$('.uc_menu').siblings('div').height(hL);
			$(".uc_menu").height(hL);
		}
	},
	addHmtl : function(headerData){
		_apigetuc.getUserCon(headerData,function(res){
			if(res.content.isOpenDeposit == 0){
				res.content.isOpenDeposit = 'none';
			}else if(res.content.isOpenDeposit == 1){
				res.content.isOpenDeposit = 'high';
			}
			var cunguan = res.content.vipLevel;
			accountHtml = _td.renderHtml(accountPho,{
				content:res.content,
			});
			$('.menu_top').html(accountHtml);
			$("#none").html("点击立即开通存管");
			$("#high").html("存管已开通");
			menuList.liHover();
		},function(err){
			console.log(err);
		});
		_operate.getMailLogsCountNoRead(headerData,function(res){
			$('.menu_bot .messages-center em').html(res.content);
		});
	}
};
$(function(){
	menuList.init();
});