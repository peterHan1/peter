var _td = require('util/td.js');
// 基础服务
var _base = {
	sendSms: function(value, type, resolve, reject) {
		_td.request({
			method: 'post',
			url: _td.getServerUrl('api/router/common/sendSms'),
			data: {
				mobile: value,
				smsType: type
			},
			success: resolve,
			error: reject
		});
	},
	validateSmsCode :  function(value,code,type,resolve){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/common/validateSmsCode'),
			data    : {
				mobile: value,
				smsCode: code,
				smsType: type
			},
			success : resolve
		});
	}
};
module.exports = _base;