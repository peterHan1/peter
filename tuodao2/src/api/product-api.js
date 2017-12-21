var _td = require('util/td.js');
// 产品中心
var _product = {
	// 获取investList 精选计划、散标项目
	getInvestList : function(params,resolve, reject){
		_td.request({
			url     : '/api/router/getFrontBorrowListByPage',
			data    : params,
			success : resolve,
			error   : reject
		});
	},
	// 获取investList 精选计划、散标项目详情页
	getInvestListDetails : function(id,resolve, reject){
		_td.request({
			url     	: '/api/router/getFrontProduct',
			data    	: {
				id	: id
			},
			asyncType	: false,
			success : resolve,
			error   : reject
		});
	},
	// 获取散标tab项目详情
	getFrontBorrowExpand : function(code,resolve, reject){
		_td.request({
			url     : '/api/router/getFrontBorrowExpand',
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
			url     : '/api/router/getPicListByPcode',
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
			url     	: '/api/router/getPCRecommendProductList',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success		: resolve,
			error   	: reject
		});
	},
	// 老账户信息
	// 我的投资
	oldInvest : function(headerData,pageNum,type,resolve,reject){
		_td.request({
			// url     	: _td.getServerUrl('api/router/tc/tender/oldTender_list'),
			method		: "get",
			url     	: _td.getServerUrl('/oldInvest.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				currentPage 	: pageNum,
				pageSize 		: 10,
				status 			: type
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 我的投资--标详情
	oldInvestDetail : function(headerData,ids,resolve,reject){
		_td.request({
			// url     	: _td.getServerUrl('api/router/tc/tender/oldApp_tender_detail'),
			method		: "get",
			url     	: _td.getServerUrl('/oldInvestDetail.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				transferId 	: ids
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 原项目目标详情
	oldTarget : function(headerData,resolve,reject){
		_td.request({
			url     	: '/api/router/user/logout',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 资金记录
	oldCapital : function(headerData,pageNum,type,resolve,reject){
		_td.request({
			// url     	: _td.getServerUrl('api/router/tc/account/oldAccount_log_list'),
			method		: "get",
			url     	: _td.getServerUrl('/oldCapital.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				currentPage 	: pageNum,
				pageSize 		: 10,
				type 			: type
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 转让记录列表
	oldTransfer : function(headerData,pageNum,resolve,reject){
		_td.request({
			// url     	: _td.getServerUrl('api/router/creditAssignment/oldAppTransferLog'),
			method		: "get",
			url     	: _td.getServerUrl('/oldTransfer.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				currentPage 	: pageNum,
				pageSize 		: 10
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 转让记录详情
	oldTransferDetail : function(headerData,ids,resolve,reject){
		_td.request({
			url     	: '/api/router/creditAssignment/query/oldAppInfo',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				transferId 	: ids
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 受让记录列表
	oldFarmIn : function(headerData,pageNum,resolve,reject){
		_td.request({
			// url     	: _td.getServerUrl('api/router/creditAssignment/oldAppCompromisedList'),
			method		: "get",
			url     	: _td.getServerUrl('/oldfarmIn.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				currentPage 	: pageNum,
				pageSize 		: 10
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 受让记录列表详情
	oldFarmInDetail : function(headerData,ids,resolve,reject){
		_td.request({
			url     	: '/api/router/creditAssignment/oldApp/productInfo',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				transferId 	: ids
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 回款计划列表
	huikuanList : function(headerData,ids,pageNum,resolve,reject){
		_td.request({
			url     	: '/api/router/tc/tender/borrow_collection_list',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				transferId 	: ids,
				currentPage 	: pageNum,
				pageSize 		: 10
			},
			success 	: resolve,
			error   	: reject
		});
	}
};
module.exports = _product;
