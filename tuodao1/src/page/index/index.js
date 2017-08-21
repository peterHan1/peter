require('./index.scss');
var _td = require('util/td.js');

// 测试网络请求
// _td.request({
// 	url:'/product/list.do?keyword=1',
// 	success:function(res){
// 		console.log(res);
// 	},
// 	error:function(errMsg){
// 		console.log(errMsg);
// 	}
// });

// 测试url参数
console.log(_td.getUrlParam('test'));


