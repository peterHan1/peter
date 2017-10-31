require('./uc_coupon.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

$('.coupon_menu a').on("click",function(){
	$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
	var index=$(this).index();
	states=index;
	$('.ticket_all').children().eq(index).show().siblings().hide();
	$('.state_menues').children().eq(index).show().siblings().hide();
})

$('.dyq_state_menu a').on("click",function(){
	$(this).addClass('menu_on').siblings().removeClass('menu_on');
	var index=$(this).index();
	$('.dyq_tickets').children().eq(index).show().siblings().hide();
})

$('.jxq_state_menu a').on("click",function(){
	$(this).addClass('menu_on').siblings().removeClass('menu_on');
	var index=$(this).index();
	$('.jxq_tickets').children().eq(index).show().siblings().hide();
})

$(function(){
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
})

var _td = require('util/td.js');
var _apiCoupon = require('api/coupon-api.js');
var couponDyq = require('./coupon_dyq.string');
var couponJxq = require('./coupon_jxq.string');
var coupon = {
	init:function(){
		// this.couponStatus(1,1);
		this.getDyqYes();
		this.getJxqYes();
		this.dqyClick();
		this.jxyClick();
	},
	getDyqYes : function(){
		// 优惠券查询
		_apiCoupon.getCoupon(1,10,function(res){
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list,
			});
			$('.dyq_tickets').html(bannerHtml);
			$('.dyq_tickets ul').addClass('dyq_ticket_yes');
			_apiCoupon.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponDyq,{
						list:res.content.list,
					});
					$('.dyq_tickets').html(bannerHtml);
					$('.dyq_tickets ul').addClass('dyq_ticket_yes');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getDyqNo : function(){
		// 优惠券查询
		_apiCoupon.getCoupon(1,10,function(res){
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list,
			});
			$('.dyq_tickets').html(bannerHtml);
			$('.dyq_tickets ul').addClass('dyq_ticket_no');
			$('.dyq_ticket_no li img').attr('src','');
			_apiCoupon.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponDyq,{
						list:res.content.list,
					});
					$('.dyq_tickets').html(bannerHtml);
					$('.dyq_tickets ul').addClass('dyq_ticket_no');
					$('.dyq_ticket_no li img').attr('src','');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getDyqOverdue : function(){
		// 优惠券查询
		_apiCoupon.getCoupon(1,10,function(res){
			var bannerHtml = _td.renderHtml(couponDyq,{
				list:res.content.list,
			});
			$('.dyq_tickets').html(bannerHtml);
			$('.dyq_tickets ul').addClass('dyq_ticket_guoqi');

			_apiCoupon.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponDyq,{
					list:res.content.list,
					});
					$('.dyq_tickets').html(bannerHtml);
					$('.dyq_tickets ul').addClass('dyq_ticket_guoqi');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getJxqYes : function(){
		// 优惠券查询
		_apiCoupon.getCoupon(1,10,function(res){
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list,
			});
			$('.jxq_tickets').html(bannerHtml);
			$('.jxq_tickets ul').addClass('jxq_ticket_yes');

			_apiCoupon.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list,
					});
					$('.jxq_tickets').html(bannerHtml);
					$('.jxq_tickets ul').addClass('jxq_ticket_yes');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getJxqNo : function(){
		// 优惠券查询
		_apiCoupon.getCoupon(1,10,function(res){
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list,
			});
			$('.jxq_tickets').html(bannerHtml);
			$('.jxq_tickets ul').addClass('jxq_ticket_no');
			$('.jxq_ticket_no li img').attr('src','');
			_apiCoupon.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list,
					});
					$('.jxq_tickets').html(bannerHtml);
					$('.jxq_tickets ul').addClass('jxq_ticket_no');
					$('.jxq_ticket_no li img').attr('src','');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	getJxqOverdue : function(){
		// 优惠券查询
		_apiCoupon.getCoupon(1,10,function(res){
			var bannerHtml = _td.renderHtml(couponJxq,{
				list:res.content.list,
			});
			$('.jxq_tickets').html(bannerHtml);
			$('.jxq_tickets ul').addClass('jxq_ticket_guoqi');

			_apiCoupon.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiCoupon.getCoupon(type,e.current,10,function(res){
					var bannerHtml = _td.renderHtml(couponJxq,{
						list:res.content.list,
					});
					$('.jxq_tickets').html(bannerHtml);
					$('.jxq_tickets ul').addClass('jxq_ticket_guoqi');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log("请求失败");
		});
	},
	// 判断抵用券状态
	dqyClick:function(){
		$('.dyq_state_menu a').on('click',function(){
			$(this).addClass('menu_on').siblings().removeClass('menu_on');
			var index=$(this).index();
			console.log(index);
			if(index==0){
				coupon.couponStatus(1,1);
				coupon.getDyqYes();
			}else if(index==1){
				coupon.couponStatus(1,2);
				coupon.getDyqNo();
			}else{
				coupon.couponStatus(1,3);
				coupon.getDyqOverdue();
			}
		})
	},
	// 判断加息券状态
	jxyClick:function(){
		$('.jxq_state_menu a').on('click',function(){
			$(this).addClass('menu_on').siblings().removeClass('menu_on');
			var index=$(this).index();
			if(index==0){
				coupon.couponStatus(2,1);
				coupon.getJxqYes();
			}else if(index==1){
				coupon.couponStatus(2,2);
				coupon.getJxqNo();
			}else{
				coupon.couponStatus(2,3);
				coupon.getJxqOverdue();
			}
		})
	},
	// 优惠券类型状态，ajax传输
	couponStatus:function(type,status,discountLock){
		/*$.ajax({
			type: "POST",
			url: "http://72.127.2.37/api/router/op/scoreExchange.json",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("accessId", "accessId");
				xhr.setRequestHeader("accessKey", "accessKey");
				xhr.setRequestHeader("sign", "NO");
			},
			data: {
				// pageSize		:9,// 每页显示几条数据
				// currentPage		:currentPage,// 当前第几页
				discountType 	: type,// 类型(1:抵用券,2:加息券)
				discountStatus 	: status,// 优惠券状态（1：可使用，2：已使用，3：已过期）
				discountLock 	: discountLock// 是否锁定(1:正常，2：锁定)
			},
			success: function(data) {
				console.log(data.msg);
				if (data.code == 100000) {
					coupon.getDyq();
				}
			},
			error: function(res) {
				console.log(res.msg);
			}
		});*/
	}
}
$(function(){
	coupon.init();
})