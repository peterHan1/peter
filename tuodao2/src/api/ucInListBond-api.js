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
	// 以受让
	getBondyet : function(sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBondYet.json'),
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
	// 申请转让
	getApply : function(id,resolve,reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBondApply.json'),
			data    : {
				tenderId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 提交申请转让
	subApply : function(id,pasw,resolve,reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBondApplySub.json'),
			data    : {
				tenderId 	: id,
				payPassword : pasw
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