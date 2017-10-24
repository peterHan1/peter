var _td = require('util/mm.js');
var _product = {
	// 获取产品列表
	getProductList : function(listParam, resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/product/list.do'),
			data    : listParam,
			success : resolve,
			error   : reject
		});
	},
	// 获取商品详细信息
	getProductDetail : function(productId, resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/product/detail.do'),
			data    : {
				productId : productId
			},
			success : resolve,
			error   : reject
		});
	}

};
module.exports = _product;