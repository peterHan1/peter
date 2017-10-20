var _td = require('util/td.js');

var _product = {
	// 获取banner
	getProductList : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-list.json'),
			data    : 0,
			success : resolve,
			error   : reject
		});
	},

};
module.exports = _product;