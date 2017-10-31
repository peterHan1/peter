var _td = require('util/td.js');

var _validateSmsCode={
	validateSmsCode :  function(value,code,type,resolve){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/common/validateSmsCode'),
			data    : {
				mobile: value,
				smsCode: code,
				smsType: type
			},
			success : resolve
		});
	}
};
module.exports=_validateSmsCode;