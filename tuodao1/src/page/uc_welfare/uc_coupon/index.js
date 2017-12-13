require('./uc_coupon.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');

var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiCoupon = require('api/operate-api.js');
var couponDyq = require('./coupon_dyq.string');
var couponJxq = require('./coupon_jxq.string');

var coupon = {
	init : function(){
		this.getJxqCoupon(2,1,1);
		this.getDyqCoupon(1,1,1);
		this.tabCut();
	},
	headerData : {
		'accessId' :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	pages : function(res){
		return parseInt(res.content.total/9)+1;
	},
	numberAdd : function(str){
		return String(str).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
	},
	// 抵用券查询
	getDyqCoupon : function(type,status,lock){
		var data = {
			discountType 	: type,
			discountStatus 	: status,
			discountLock 	: lock,
			currentPage		: 1,
			pageSize		: 9
		}
		var j='';
		_apiCoupon.getCoupon(coupon.headerData,data,function(res){
			var listData=res.content.list;
			var total=res.content.total;
			var pageSize=res.content.pageSize;
			$.each(listData,function(i){
				listData[i].moneyLimit=coupon.numberAdd(listData[i].moneyLimit);
			})
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list
			});
			$('.dyq_tickets').html(bannerHtml);
			/*$.each(listData,function(i){
				$('.dyq_tickets li').eq(j).children().eq(1).find('span').html('投资满'+coupon.numberAdd(listData[i].moneyLimit)+'元，'+listData[i].dateLimit+'个月及以上标的使用');
			})*/
			if(status==1){
				$('.dyq_tickets ul').addClass('dyq_ticket_yes');
			}else if(status==2){
				$('.dyq_tickets ul').addClass('dyq_ticket_no');
			}else{
				$('.dyq_tickets ul').addClass('dyq_ticket_guoqi');
			}
			coupon.HeightAuto();
			_paging.paging('dyq_page',total,pageSize,function(e){
				data = {
					discountType 	: type,
					discountStatus 	: status,
					discountLock 	: lock,
					currentPage 	: e.current,
					pageSize		: 9
				};
				_apiCoupon.getCoupon(coupon.headerData,data,function(res){
					var listData=res.content.list;
					$.each(listData,function(i){
						listData[i].moneyLimit=coupon.numberAdd(listData[i].moneyLimit);
					})
					var bannerHtml = _td.renderHtml(couponDyq,{
						list:res.content.list
					});
					$('.dyq_tickets').html(bannerHtml);
					if(status==1){
						$('.dyq_tickets ul').addClass('dyq_ticket_yes');
					}else if(status==2){
						$('.dyq_tickets ul').addClass('dyq_ticket_no');
					}else{
						$('.dyq_tickets ul').addClass('dyq_ticket_guoqi');
					}
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
	getJxq : function(){
		$('.jxq_ticket .ticket_top span').each(function(){
			var numbers=$(this).html();
			$(this).html(numbers.split('%').join(''));
		})
	},
	// 加息券查询
	getJxqCoupon : function(type,status,lock){
		var data = {
			discountType : type,
			discountStatus : status,
			discountLock : lock,
			currentPage		: 1,
			pageSize		: 9
		}
		_apiCoupon.getCoupon(coupon.headerData,data,function(res){
			var total=res.content.total;
			var pageSize=res.content.pageSize;
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list
			});
			$('.jxq_tickets').html(bannerHtml);
			if(status==1){
				$('.jxq_tickets ul').addClass('jxq_ticket_yes');
			}else if(status==2){
				$('.jxq_tickets ul').addClass('jxq_ticket_no');
			}else{
				$('.jxq_tickets ul').addClass('jxq_ticket_guoqi');
			}
			coupon.getJxq();
			coupon.HeightAuto();
			_paging.paging('jxq_page',total,pageSize,function(e){
				data = {
					discountType 	: type,
					discountStatus 	: status,
					discountLock 	: lock,
					currentPage 	: e.current,
					pageSize		: 9
				};
				_apiCoupon.getCoupon(coupon.headerData,data,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list
					});
					$('.jxq_tickets').html(bannerHtml);
					if(status==1){
						$('.jxq_tickets ul').addClass('jxq_ticket_yes');
					}else if(status==2){
						$('.jxq_tickets ul').addClass('jxq_ticket_no');
					}else{
						$('.jxq_tickets ul').addClass('jxq_ticket_guoqi');
					}
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
	HeightAuto : function(){
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
	tabCut : function(){
		// 优惠券类型切换
		$('.coupon_menu a').on("click",function(){
			var index=$(this).index();
			$('.ticket_all').children().eq(index).show().siblings().hide();
			$('.state_menues').children().eq(index).show().siblings().hide();
			$('.coupon_link a').eq(index).show().siblings().hide();
			coupon.HeightAuto();
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			if(index==0){
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
				coupon.getDyqCoupon(1,1,1);
			}else if(index==1){
				coupon.getDyqCoupon(1,2,1);
			}else{
				coupon.getDyqCoupon(1,3,1);
			}
		})
		// 加息券状态切换
		$('.jxq_state_menu a').on("click",function(){
			$(this).addClass('menu_on').siblings().removeClass('menu_on');
			var index=$(this).index();
			$('.jxq_tickets').children().eq(index).show().siblings().hide();
			if(index==0){
				coupon.getJxqCoupon(2,1,1);
			}else if(index==1){
				coupon.getJxqCoupon(2,2,1);
			}else{
				coupon.getJxqCoupon(2,3,1);
			}
		})
	}
}
$(function(){
	coupon.init();
})