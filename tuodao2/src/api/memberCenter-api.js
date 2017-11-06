var _td = require('util/td.js');

var _product = {
	//会员账户信息
	memberInfo : function(phone,password,source,resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/user/getUserAccountInfo'),
			url     : _td.getServerUrl('/user.json'),
			data    : {
				/*accessId		: userId,
				accessKey		: userKey,*/
				/*mobile			: phone,
				loginPassword	: password,
				loginSource		: 1 || source*/
			},
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _product;