var _td = require('util/td.js');

var _product = {
	// 优惠券分页查询
	getCoupon : function(type,status,lock,pagenum,pagesize,resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/getUserDiscountPagedList'),
			url     : _td.getServerUrl('/coupon.json'),
			data    : {
				/*accessId		: userId,
				accessKey		: userKey,*/
				discountType	: type,
				discountStatus	: status,
				discountLock	: lock,
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	pagingDyq : function(pages,pageNum,pageSize,backFuntion){
		$(".dyq_page").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	},
	pagingJxq : function(pages,pageNum,pageSize,backFuntion){
		$(".jxq_page").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	}

};
module.exports = _product;