var _td = require('util/td.js');
// 产品中心
var _product = {
	// 获取investList 精选计划、散标项目
	getInvestList : function(params,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/getFrontBorrowListByPage'),
			data    : params,
			success : resolve,
			error   : reject
		});
	},
	// 获取investList 精选计划、散标项目详情页
	getInvestListDetails : function(id,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/getFrontProduct'),
			data    	: {
				id	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取散标tab项目详情
	getFrontBorrowExpand : function(code,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/getFrontBorrowExpand'),
			data 	: {
				productCode : code
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取散标tab审核资料
	getPicListByPcode : function(code,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/getPicListByPcode'),
			data 	: {
				productCode : code
			},
			success : resolve,
			error   : reject
		});
	},
	// 账户总览 推荐标的
	getProductUcList : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/getPCRecommendProductList'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success		: resolve,
			error   	: reject
		});
	},
};
module.exports = _product;
