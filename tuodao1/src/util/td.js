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
			success 	:function(res){
				console.log('请求成功');
				// 请求成功
				// if(100000 === res.code){
				//  	typeof param.success === 'function' && param.success(res.data);
				// }
			},
			error 		: function(err){}
		});
	},
	// 获取后端请求地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam : function(name){
		var reg 	= new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result 	= window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}

};

module.exports = _td;