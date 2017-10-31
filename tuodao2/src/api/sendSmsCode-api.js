var _td = require('util/td.js');
// 快捷充值发送验证码
var _sendSmsCode={
	sendSmsCode :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/recharge/sendSmsCode'),
			data    : data,
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_sendSmsCode;