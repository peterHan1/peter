var _td = require('util/td.js');

var _product = {
	// 债权转让
	getBond : function(sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBond.json'),
			data    : {
				status 		: sta 		|| " ",
				startTime 	: startime 	|| " ",
				endTime 	: endtime 	|| " ",
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