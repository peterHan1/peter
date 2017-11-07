var _td = require('util/td.js');

var _product = {
	// 获取investList 精选计划、散标项目详情页
	getInvestListDetails : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-listDetails.json'),
			data    : {
				id	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情
	getInvestBondDetails : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-bondDetails.json'),
			data    : {
				transferId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情
	getInvestPhone : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-bondPhone.json'),
			data    : {
				transferId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情 账户中心
	getInvestUc : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/get_account.json'),
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