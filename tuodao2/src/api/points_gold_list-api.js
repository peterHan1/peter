var _td = require('util/td.js');

var _product = {
	// 积分数值（可用，累计）
	getPoints : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/points.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取Points_exchange 积分兑换专区分页查询
	getPoints_exchange : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/points_exchange.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取points_detail 积分明细
	getPoints_detail : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/points_detail_table.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 积分获取
	getPoints_get : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/points_get_table.json'),
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