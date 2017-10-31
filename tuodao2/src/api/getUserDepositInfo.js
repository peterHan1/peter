var _td = require('util/td.js');

var _getUserDepositInfo={
	getUserDepositInfo :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/ua/getUserDepositInfo'),
			data    : data,
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_getUserDepositInfo;