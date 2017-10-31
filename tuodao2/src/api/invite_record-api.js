var _td = require('util/td.js');

var _product = {
	// 获取investList 精选计划、散标项目
	getRecord : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invite_record.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 10 	|| pagesize
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