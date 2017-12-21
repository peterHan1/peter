var _td = require('util/td.js');
// 用户中心
var _user = {
	login : function(param,resolve,reject){
		_td.request({
			url 	: '/api/router/user/login',
			data 	: param,
			success : resolve,
			error 	: reject,
		});
	},
	// 检查登录状态
	checkLogin : function(headerData,resolve, reject){
		_td.request({
			url     : '/api/router/user/getUserAccountInfo',
			accessId :headerData.accessId,
			accessKey : headerData.accessKey,
			// asyncType	: false,
			success : resolve,
			error   : reject
		});
	},
	// 用户注册
	register :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/user/register',
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 忘记登录密码
	forgetLoginPw :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/user/forgetLoginPw',
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 忘记支付密码
	forgetPayPw :  function(data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/user/forgetPayPw',
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 新增/修改收件地址
	updateConsigneeInfo: function(headerData, data, resolve, reject) {
		_td.request({
			method: 'post',
			url: '/api/router/ua/updateConsigneeInfo',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data: data,
			success: resolve,
			error: reject
		});
	},
	// 获取用户账户设置信息
	getAccountSetting :  function(headerData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/account/getAccountSetting',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 手机号码是否注册
	checkPhone :  function(mobile,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/user/validateMobileRegistered',
			data    : {mobile: mobile},
			asyncType	: false,
			success : resolve,
			error   : reject
		});
	},
	// 用户开通存管
	openDeposit :  function(headerData,data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/ua/openDeposit',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 存量用户开通存管
	openDepositStock :  function(headerData,data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/ua/userBindBank',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 获取用户存管信息
	getUserDepositInfo :  function(headerData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/ua/getUserDepositInfo',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 账户投资信息
	getUserCon : function(headerData,resolve, reject){
		_td.request({
			url     	: '/api/router/user/getUserAccountInfo',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			asyncType	: false,
			success 	: resolve,
			error   	: reject
		});
	},
	// 存量用户判断
	getStockUserDeposit : function(headerData,resolve, reject){
		_td.request({
			method	: "post",
			url     : '/api/router/ua/getStockUserDeposit',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 登出
	logout : function(headerData,resolve,reject){
		_td.request({
			url     	: '/api/router/user/logout',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	}
};
module.exports = _user;

