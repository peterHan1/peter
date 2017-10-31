var _td = require('util/td.js');
var _uc = {
	// 获取商品列表
	getUser : function(userData,resolve, reject){
		_td.request({
			// method 	: "POST",
			url     : _td.getServerUrl('/user.json'),
			data 	: userData,
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "c5dc28317edb57b2ad7c7ad5813c3fb1");
			// 	xhr.setRequestHeader("accessKey", "/v8aygbmadgamaa3aguazgayadmazaa5agmamwa0adaazaa4adiaoqa3agyaoabhadaazqaxagmazqa0admaoaa2");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _uc;