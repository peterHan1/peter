var _td = require('util/td.js');

var _forgetPayPw={
	forgetPayPw :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/user/forgetPayPw'),
			data    : data,
			success : resolve,
			error   : reject
		});
	}
};
module.exports=_forgetPayPw;