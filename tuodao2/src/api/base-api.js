var _td = require('util/td.js');
// 基础服务
var _base = {
	sendSms: function(value, type, resolve, reject) {
		_td.request({
			method: 'post',
			url: '/api/router/common/sendSms',
			data: {
				mobile: value,
				smsType: type
			},
			success: resolve,
			error: reject
		});
	},
	validateSmsCode :  function(yzmData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/common/validateSmsCode',
			data    :yzmData,
			success : resolve,
			error: reject
		});
	}
};
module.exports = _base;