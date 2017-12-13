var _td = require('util/td.js');

var _product = {
	// 获取banner
	getProductList : function(resolve, reject){
		_td.request({
			url     : 'http://192.168.0.151:3000/mock-index.json',
			method 	: 'get',
			success : resolve,
			error   : reject
		});
	},

};
module.exports = _product;