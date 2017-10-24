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

};
module.exports = _product;