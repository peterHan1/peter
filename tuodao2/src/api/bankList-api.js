var _td = require('util/td.js');

var _bankList={
	bankList :  function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/recharge/bankList'),
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_bankList;