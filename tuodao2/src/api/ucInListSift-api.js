var _td = require('util/td.js');

var _product = {
	// 精选计划
	getSift : function(id,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSift.json'),
			data    : {
				userId 		: id,
				status 		: sta 		|| "0",
				startTime 	: startime 	|| "",
				endTime 	: endtime 	|| "",
				pageSize  	: pagesize 	|| "10",
				currentPage	: current 	|| "1"
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取investList 债权转让
	getInvestListBond : function(type,pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-listbond.json'),
			data    : {
				type			: type,
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