var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
var _td = {
	request : function(param){
		var _this = this;
		$.ajax({
			type 		: param.method 	|| 'get',
			url 		: param.url 	|| '',
			dataType 	: param.type 	|| 'json',
			data 		: param.data 	|| '',
			beforeSend: function(xhr) {
				typeof param.beforeSend === 'function' && param.beforeSend(xhr);
			},
			success 	: function(res){
				if(100000 === res.code){
				 	typeof param.success === 'function' && param.success(res);

				}else{
					typeof param.success === 'function' && param.success(res);
				}
				// else if(10 === res.status){
				// 	 _this.doLogin();
				// }
				// 请求数据错误
				// else if(1 === res.status){
				// 	typeof param.error === 'function' && param.error(res.msg);
				// }

			},
			error 		: function(err){
				// typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取URL参数
	getUrlParam : function(name){
		var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result  = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模板
	renderHtml : function(htmlTemplate, data){
		var template    = Hogan.compile(htmlTemplate),
			result      = template.render(data);
		return result;
	},
	// 统一登录
	doLogin : function(){
		window.location.href = './login.html?redirect' + encodeURIComponent(window.location.href);
	}
};

module.exports = _td;