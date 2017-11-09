var _td = require('util/td.js');
var _user = {
	login : function(param,resolve,reject){
		_td.request({
			url 	: _td.getServerUrl('api/router/user/login'),
			data 	: param,
			success : resolve,
			error 	: reject,
		});
	},
	// 检查登录状态
	checkLogin : function(headerData,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/user/getUserAccountInfo'),
			accessId :headerData.accessId,
			accessKey : headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 用户注册
	register :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/user/register'),
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 忘记登录密码
	forgetLoginPw :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/user/forgetLoginPw'),
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 忘记支付密码
	forgetPayPw :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/user/forgetPayPw'),
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 新增/修改收件地址
	updateConsigneeInfo: function(data, resolve, reject) {
		_td.request({
			method: 'post',
			url: _td.getServerUrl('api/router/ua/updateConsigneeInfo'),
			data: data,
			success: resolve,
			error: reject
		});
	},
	// 获取用户账户设置信息
	getAccountSetting :  function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/account/getAccountSetting'),
			success : resolve,
			error   : reject
		});
	},
	// 手机号码是否注册
	checkPhone :  function(value,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/user/validateMobileRegistered'),
			data    : {
				mobile: value
			},
			async	: false,
			success : resolve,
			error   : reject
		});
	},
	// 用户开通存管
	openDeposit :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/ua/openDeposit'),
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 账户投资信息
	getUserCon : function(userData,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/user.json'),
			data 	: userData,
			success : resolve,
			error   : reject
		});
	},

};
module.exports = _user;

