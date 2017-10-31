var _td = require('util/td.js');
// 提现列表
var _cashlist = {
	cashlist: function(pagenum, pagesize, resolve, reject) {
		_td.request({
			method: 'post',
			url: _td.getServerUrl('http://72.127.2.140:8080/api/router/tc/account/cash_list'),
			data: {
				currentPage: 1 || pagenum,
				pageSize: 10 || pagesize
			},
			success: resolve,
			error: reject
		});
	},
	paging: function(pages, pageNum, pageSize, backFuntion) {
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
module.exports = _cashlist;