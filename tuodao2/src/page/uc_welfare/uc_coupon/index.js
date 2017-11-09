require('./uc_coupon.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

var _td = require('util/td.js');
var _apiCoupon = require('api/operationCenter-api.js');
var couponDyq = require('./coupon_dyq.string');
var couponJxq = require('./coupon_jxq.string');
var coupon = {
	init:function(){
		var userId='';
		var userKey='';
		this.getDyqYes(1,1,1);
		this.getJxqYes(2,1,1);
		this.tabCut();
		this.lockStatus();
	},
	getDyqYes : function(type,status,lock){
		// 优惠券查询
		_apiCoupon.getCoupon(type,status,lock,1,10,function(res){
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list,
			});
			$('.dyq_tickets').html(bannerHtml);
			$('.dyq_tickets ul').addClass('dyq_ticket_yes');
			coupon.HeightAuto();
			console.log(res.content.pages+' '+res.content.pageNum+' '+res.content.pageSize+' '+$('.welfare_content').height());
			_apiCoupon.pagingDyq(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,status,lock,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponDyq,{
						list:res.content.list,
					});
					$('.dyq_tickets').html(bannerHtml);
					$('.dyq_tickets ul').addClass('dyq_ticket_yes');
					coupon.HeightAuto();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getDyqNo : function(type,status,lock){
		// 优惠券查询
		_apiCoupon.getCoupon(type,status,lock,1,10,function(res){
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list,
			});
			$('.dyq_tickets').html(bannerHtml);
			$('.dyq_tickets ul').addClass('dyq_ticket_no');
			coupon.HeightAuto();
			_apiCoupon.pagingDyq(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,status,lock,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponDyq,{
						list:res.content.list,
					});
					$('.dyq_tickets').html(bannerHtml);
					$('.dyq_tickets ul').addClass('dyq_ticket_no');
					coupon.HeightAuto();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getDyqOverdue : function(type,status,lock){
		// 优惠券查询
		_apiCoupon.getCoupon(type,status,lock,1,10,function(res){
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list,
			});
			$('.dyq_tickets').html(bannerHtml);
			$('.dyq_tickets ul').addClass('dyq_ticket_guoqi');
			coupon.HeightAuto();
			_apiCoupon.pagingDyq(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,status,lock,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponDyq,{
					list:res.content.list,
					});
					$('.dyq_tickets').html(bannerHtml);
					$('.dyq_tickets ul').addClass('dyq_ticket_guoqi');
					coupon.HeightAuto();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	// 去掉加息券的%
	getJxq:function(){
		$('.jxq_ticket .ticket_top span').each(function(){
			var numbers=$(this).html();
			$(this).html(numbers.split('%').join(''));
		})
	},
	getJxqYes : function(type,status,lock){
		// 优惠券查询
		_apiCoupon.getCoupon(type,status,lock,1,10,function(res){
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list,
			});
			$('.jxq_tickets').html(bannerHtml);
			$('.jxq_tickets ul').addClass('jxq_ticket_yes');
			coupon.getJxq();
			coupon.HeightAuto();
			_apiCoupon.pagingJxq(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,status,lock,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list,
					});
					$('.jxq_tickets').html(bannerHtml);
					$('.jxq_tickets ul').addClass('jxq_ticket_yes');
					coupon.getJxq();
					coupon.HeightAuto();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getJxqNo : function(type,status,lock){
		// 优惠券查询
		_apiCoupon.getCoupon(type,status,lock,1,10,function(res){
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list,
			});
			$('.jxq_tickets').html(bannerHtml);
			coupon.getJxq();
			$('.jxq_tickets ul').addClass('jxq_ticket_no');
			coupon.HeightAuto();
			_apiCoupon.pagingJxq(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,status,lock,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list,
					});
					$('.jxq_tickets').html(bannerHtml);
					$('.jxq_tickets ul').addClass('jxq_ticket_no');
					coupon.HeightAuto();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getJxqOverdue : function(type,status,lock){
		// 优惠券查询
		_apiCoupon.getCoupon(type,status,lock,1,10,function(res){
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list,
			});
			$('.jxq_tickets').html(bannerHtml);
			$('.jxq_tickets ul').addClass('jxq_ticket_guoqi');
			coupon.getJxq();
			coupon.HeightAuto();
			_apiCoupon.pagingJxq(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,status,lock,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list,
					});
					$('.jxq_tickets').html(bannerHtml);
					$('.jxq_tickets ul').addClass('jxq_ticket_guoqi');
					coupon.getJxq();
					coupon.HeightAuto();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	// 控制welfare_content的高与左侧菜单栏高度相同
	HeightAuto:function(){
		$('.uc_menu').height('auto');
		$('.uc_menu').siblings('div').height('auto');
		var hL = $('.uc_menu')[0].clientHeight;
		var hR = $('.uc_menu').siblings('div')[0].clientHeight;
		if(hR>=905){
			$(".uc_menu").height(hR);
			$('.uc_menu').siblings('div').height(hR);
		}else{
			$('.uc_menu').siblings('div').height(hL);
			$(".uc_menu").height(hL);
		}
	},
	// tab切换
	tabCut:function(){
		// 优惠券类型切换
		$('.coupon_menu a').on("click",function(){
			var index=$(this).index();
			$('.ticket_all').children().eq(index).show().siblings().hide();
			$('.state_menues').children().eq(index).show().siblings().hide();
			$('.coupon_link a').eq(index).show().siblings().hide();
			coupon.HeightAuto();
			console.log($('.uc_menu').siblings('div')[0].clientHeight);
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			if(index==0){
				console.log($('.uc_menu').siblings('div')[0].clientHeight);
				$('.dyq_page').show();
				$('.jxq_page').hide();
			}else{
				$('.jxq_page').show();
				$('.dyq_page').hide();
			}
		})
		// 抵用券状态切换
		$('.dyq_state_menu a').on("click",function(){
			$(this).addClass('menu_on').siblings().removeClass('menu_on');
			var index=$(this).index();
			$('.dyq_tickets').children().eq(index).show().siblings().hide();
			if(index==0){
				coupon.getDyqYes(1,1,1);
			}else if(index==1){
				coupon.getDyqNo(1,2,1);
			}else{
				coupon.getDyqOverdue(1,3,1);
			}
		})
		// 加息券状态切换
		$('.jxq_state_menu a').on("click",function(){
			$(this).addClass('menu_on').siblings().removeClass('menu_on');
			var index=$(this).index();
			$('.jxq_tickets').children().eq(index).show().siblings().hide();
			if(index==0){
				coupon.getJxqYes(2,1,1);
			}else if(index==1){
				coupon.getJxqNo(2,2,1);
			}else{
				coupon.getJxqOverdue(2,3,1);
			}
		})
	},
	// 优惠券锁定状态
	lockStatus:function(){
		$(document).on("click",'.dyq_ticket_yes li',function(){
			if($(this)[0].dataset.select==1){
				$(this).find('img').show();
				$(this)[0].dataset.select=2;
			}else{
				$(this).find('img').hide();
				$(this)[0].dataset.select=1;
			}
		})
		$(document).on("click",'.jxq_ticket_yes li',function(){
			if($(this)[0].dataset.select==1){
				$(this).find('img').show();
				$(this)[0].dataset.select=2;
			}else{
				$(this).find('img').hide();
				$(this)[0].dataset.select=1;
			}
		})
	}
}
$(function(){
	coupon.init();
})