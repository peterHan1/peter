require('./index.scss');
var _tips 		= require('util/tips/index.js');
var _td			= require('util/td.js');
var _apigetuc 	= require('api/user-api.js');
var accountPho	= require('./uc_menu.string');
var _operate 	= require('api/operate-api.js');
var menuList = {
	init : function(){
		var headerData = {
			'accessId' 	: unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		this.eachA();
		this.eventFn();
		this.liHover();
		this.elHeight();
		this.addHmtl(headerData);
	},
	addHmtl : function(headerData){
		_apigetuc.getUserCon(headerData,function(res){
			var com = res.content;
			var deposit = menuList.setOpenDeposit(com.isOpenDeposit);
			com.depositTxt = deposit.txt;
			com.depositUrl = deposit.url;
			com.depositClas = deposit.clas;
			$('.menu_top').html(_td.renderHtml(accountPho,{content:com}));
			menuList.liHover();
		},function(err){
			console.log(err);
		});
		_operate.getMailLogsCountNoRead(headerData,function(res){
			$('.menu_bot .messages-center em').html(res.content);
		});
	},
	eventFn : function(){
		$(".menu_list").on("click",function(){
			if ($(this).siblings('div').css('display') == 'block') {
				$(this).siblings('div').slideUp();
				$(this).find('span').html('&#xe83d;');
			} else {
				$(this).siblings('div').slideDown();
				$(this).find('span').html('&#xe6a4;');
				var url = $(this).siblings("div").find("a").eq(0).attr("href");
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
				if ( flag != true ){
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
				$(this).parent(".menu_fund").siblings(".menu_list").find("span").html("&#xe6a4;");
			}
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
	setOpenDeposit : function(type){
		if(type == 1){
			return {"txt":"存管已开通","url":"javascript:;","clas":"high"};
		}else{
			return {"txt":"点击立即开通存管","url":"active_newuser.html","clas":"none"};
		}
	},
	liHover : function(){
		$('.icon li').mouseover(function(){
			_tips.getTipsRight($(this),3);
		});
		$('.icon li').mouseout(function(){
			$(this).find('.tips').hide();
		});
	}
};
$(function(){
	menuList.init();
});