var _td = require('util/td.js');
var _uc = {
	// 获取商品列表
	getUser : function(userData,resolve, reject){
		_td.request({
			method 	: "POST",
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/user/getUserAccountInfo'),
			data 	: userData,
			beforeSend: function(xhr){
				xhr.setRequestHeader("accessId", "b034ffe885cc86fd9c55a965fec73ba8");
				xhr.setRequestHeader("accessKey", "/v8aoaa3agiaywawagmanabkaguazaaxaguaoqbkadgaygblagyazga4adqaoabiadiaywbmadqamabhadeanqa1");
				xhr.setRequestHeader("sign", "NO");
			},
			success : resolve,
			error   : reject
		});
	},
	// 提交订单
	createOrder : function(orderInfo, resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/order/create.do'),
			data    : orderInfo,
			success : resolve,
			error   : reject
		});
	},
	// 获取订单列表
	getOrderList : function(listParam, resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/order/list.do'),
			data    : listParam,
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _uc;