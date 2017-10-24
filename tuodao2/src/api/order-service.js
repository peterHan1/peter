var _mm = require('util/td.js');
var _order = {
	// 获取商品列表
	getProductList : function(resolve, reject){
		_mm.request({
			url     : _mm.getServerUrl('/mock-index.js'),
			success : resolve,
			error   : reject
		});
	},
	// 提交订单
	createOrder : function(orderInfo, resolve, reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/create.do'),
			data    : orderInfo,
			success : resolve,
			error   : reject
		});
	},
	// 获取订单列表
	getOrderList : function(listParam, resolve, reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/list.do'),
			data    : listParam,
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _order;