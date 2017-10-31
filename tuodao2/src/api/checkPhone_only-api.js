var _td = require('util/td.js');

var _checkPhoneOnly={
	checkPhone :  function(value,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/user/validateMobileRegistered'),
			data    : {
				mobile: value
			},
			async	: false,
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_checkPhoneOnly;