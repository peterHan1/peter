var _td = require('util/td.js');
// 提现
var _checkBank={
	checkBank :  function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/tc/tender/check_bank'),
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_checkBank;