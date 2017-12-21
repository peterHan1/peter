var Hogan = require('hogan.js');
var conf = {
	serverHost: 'http://72.127.2.140:8080/'
};

var _td = {
	request : function(param){
		var _this = this;
		$.ajax({
			type: param.method || 'post',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			async: (param.asyncType) ? true : param.asyncType,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("accessId", param.accessId || 'accessId');
				xhr.setRequestHeader("accessKey", param.accessKey || 'accessKey');
				xhr.setRequestHeader("requestType", "PC");
				xhr.setRequestHeader("sign", "NO");
			},
			success 	: function(res){
				// 请求成功
				if (100000 === res.code) {
					typeof param.success === 'function' && param.success(res);

				}
				// 请求数据错误
				else {
					typeof param.error === 'function' && param.error(res);
				}
				// else if(10 === res.status){
				// 	 _this.doLogin();
				// }
			},
			error: function(err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	// 获取服务器地址
	getServerUrl: function(path) {
		return conf.serverHost + path;
	},
	// 获取URL参数
	getUrlParam: function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模板
	renderHtml: function(htmlTemplate, data) {
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
		return result;
	},
	// 统一登录
	doLogin: function() {
		window.location.href = './userlogin.html?redirect' + encodeURIComponent(window.location.href);
	},
	// 获取授权账号
	getAccess : function(name){
		var strCookie = document.cookie;
		var arrCookie = strCookie.split('; ');
		var name;
		for(var i=0;i<arrCookie.length;i++){
			var arr=arrCookie[i].split('=');
			if(name==arr[0]){
				name=arr[1];
				return name;
			}
		}
	},
	// 可能用到的验证
	validate: function(value, type) {
		var value = $.trim(value);
		// 非空验证
		if ('require' === type) {
			return !!value;
		}
		// 手机号验证
		if ('mobile' === type) {
			return /^1[34578]\d{9}$/.test(value);
		}
		if ('only' === type) {
			return false;
		}
		// 银行卡号验证
		if ('bankCard' === type) {
			return /^([1-9]{1})(\d{14}|\d{18})$/.test(value);
		}
		// min长度
		if ('minLength' === type) {
			return value.length >= 6;
		}
	},
	// 各行变色兼容写法
	trColor : function(id){
		// 各行变色
		var trs=document.getElementById(id).getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	}
};

module.exports = _td;