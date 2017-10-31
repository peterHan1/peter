var _td = require('util/td.js');
// 确认提现
var _cash={
	cash :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/tc/account/cash_apply'),
			data    : data,
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_cash;