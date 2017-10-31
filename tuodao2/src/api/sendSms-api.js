var _td = require('util/td.js');

var _sendSms={
	sendSms :  function(value,type,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/common/sendSms'),
			data    : {
				mobile: value,
				smsType: type
			},
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_sendSms;