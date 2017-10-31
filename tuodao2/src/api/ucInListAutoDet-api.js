var _td = require('util/td.js');

var _product = {
	getAutoTop : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoDel.json'),
			data    : {
				autoTenderId: id
			},
			success : resolve,
			error   : reject
		});
	},
	getAutoList : function(id,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoDelist.json'),
			data    : {
				autoTenderId : id,
				currentPage	 : 1  || current,
				pageSize	 : 10 || pagesize
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