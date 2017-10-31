var _td = require('util/td.js');

var _product = {
	getBondTop : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/bondDelTop.json'),
			data    : {
				transferId : id
			},
			success : resolve,
			error   : reject
		});
	},
	getBondRet : function(id,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/bondDelRet.json'),
			data    : {
				tenderId : id,
				pageSize  	: pagesize 	|| 10,
				currentPage	: current 	|| 1
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