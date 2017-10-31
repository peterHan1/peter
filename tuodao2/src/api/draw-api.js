var _td = require('util/td.js');

var _product = {
	// 抽礼品
	getDraw_present : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/draw_present.json'),
			success : resolve,
			error   : reject
		});
	},
	// 抽积分
	getDraw_points : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/draw_points.json'),
			success : resolve,
			error   : reject
		});
	},
	getDraw_result : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/draw_result.json'),
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