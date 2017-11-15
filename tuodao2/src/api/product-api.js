var _td = require('util/td.js');
// 产品中心
var _product = {
	// 获取investList 精选计划、散标项目
	getInvestList : function(dataList,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/invest-list.json'),
			data    : dataList,
			success : resolve,
			error   : reject
		});
	},
	// 获取investList 精选计划、散标项目详情页
	getInvestListDetails : function(id,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/invest-listDetails.json'),
			data    : {
				id	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取散标tab项目详情
	getFrontBorrowExpand : function(resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/getFrontBorrowExpand.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取散标tab审核资料
	getPicListByPcode : function(resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/getPicListByPcode.json'),
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _product;
