var _td = require('util/td.js');

var _product = {
	// 邀请记录
	getRecord : function(pagenum,pagesize,resolve,reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/getInviteRecord'),
			url     : _td.getServerUrl('/invite_record.json'),
			success : resolve,
			error   : reject
		});
	},
	// 存管信息
	getUserDepository	: function(resolve,reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/tc/tender/check_bank'),
			success : resolve,
			error   : reject
		});
	},
	// 用户理财师等级信息
	getLev : function(resolve,reject){
		_td.request({
			// method	: 'POST',
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/account/getFinancialPlanner'),
			/*headers	:{
				accessId		: "accessId",
				accessKey		: "accessKey"
			},*/
			success : resolve,
			error   : reject
		});
	},
	// 邀请链接地址
	getLink	: function(resolve,reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/getInviteRecord'),
			url     : _td.getServerUrl('/invite_link.json'),
			success : resolve,
			error   : reject
		});
	},
	// 邀请码
	getCode	: function(resolve,reject){
		_td.request({
			// method	: 'post',
			url     : _td.getServerUrl('/user.json'),
			/*headers	:{
				accessId		: "accessId",
				accessKey		: "accessKey"
			},*/
			success : resolve,
			error   : reject
		});
	},
	paging : function(pages,pageNum,pageSize,backFuntion){
		$(".zxf_pagediv").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	}
};
module.exports = _product;