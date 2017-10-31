var _td = require('util/td.js');
	// 资金管理-分页查询资金记录列表
var _moneyRecord={
	moneyRecord :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/tc/account/account_log_list'),
			data    : data,
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_moneyRecord;