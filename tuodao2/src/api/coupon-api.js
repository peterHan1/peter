var _td = require('util/td.js');

var _product = {
	// 优惠券分页查询
	getCoupon : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/coupon.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	paging : function(pages,pageNum,pageSize,backFuntion){
		$(".zxf_pagediv").createPage({
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