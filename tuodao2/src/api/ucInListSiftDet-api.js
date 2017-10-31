var _td = require('util/td.js');

var _product = {
	// 精选计划投资详情
	getSiftDel : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSiftDel1.json'),
			data    : {
				justId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 理财计划投资详情债权明细
	getSiftCred : function(id,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSiftDel2.json'),
			data    : {
				justId 		: id,
				pageSize  	: pagesize 	|| 5,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 理财计划 回款计划
	getSiftReturn: function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSiftDel3.json'),
			data    : {
				justId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	paging : function(el,pages,pageNum,pageSize,backFuntion){
		$("." + el).createPage({
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