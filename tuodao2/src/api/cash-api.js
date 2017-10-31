var _td = require('util/td.js');
// 提现
var _cash={
	cash :  function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/tc/account/to_cash'),
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_cash;